const path = require('path');
const fs = require('fs');
const { Router } = require('express');
const formidable = require('formidable');
const auth = require('../../middleware/auth');
const Mongo = require('../db/Mongo');
const { isProduction } = require('../config');
const { setLog } = require('../utils');
const router = Router();

router.use('*', auth, (req, res, next) => {
  next();
});

// Получить данные
router.get('/', (req, res) => {
  Mongo.database
    .db('bibcongress')
    .collection('users')
    .findOne({ email: req.email })
    .then(user => {
      res.send({
        surname: user.surname,
        surnameEn: user.surnameEn,
        name: user.name,
        nameEn: user.nameEn,
        patronymic: user.patronymic,
        patronymicEn: user.patronymicEn,
        organization: user.organization,
        organizationEn: user.organizationEn,
        position: user.position,
        positionEn: user.positionEn,
        place: user.place,
        placeEn: user.placeEn,
        aboutMe: user.aboutMe,
        aboutMeEn: user.aboutMeEn,
        telephone: user.telephone,
        email: user.email,
        isEmailConfirmed: user.isEmailConfirmed,
        avatar: user.avatar,
      });
    });
});

// Редактировать данные
router.put('/', (req, res) => {
  const { email, isAdmin, isEmailConfirmed, code } = req.body;
  if (email || isAdmin || isEmailConfirmed || code) {
    return res.status(400).send('Bad Request');
  }

  Mongo.database
    .db('bibcongress')
    .collection('users')
    .findOneAndUpdate(
      { email: req.email },
      { $set: req.body },
    )
    .then(({ value: oldData }) => {
      const logConfig = {
        userId: req.id,
        action: 'Изменение данных',
        changes: [],
      };

      for (let key in req.body) {
        if (req.body[key] !== oldData[key]) {
          logConfig.changes.push({ field: key, before: oldData[key], after: req.body[key] });
        }
      }

      setLog(logConfig);

      res.send('OK');
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Server Error');
    });
});

// Загрузка аватара
router.post('/avatar', (req, res) => {
  const avatarsDirPath = isProduction ? './upload/avatars' : './api/upload/avatars';

  // Создание папки аватаров
  if (!fs.existsSync(avatarsDirPath)) {
    fs.mkdirSync(avatarsDirPath, { recursive: true });
  }

  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.uploadDir = path.join(__dirname, '..', 'upload', 'avatars');
  form.multiples = true;
  form.onPart = function (part) {
    if(!part.filename || part.filename.match(/\.(jpg|jpeg|png)$/i)) {
      this.handlePart(part);
    }
  }

  form.parse(req, function(err, fields, file) {
    if (err) {
      console.log(err.message);
      return res.status(500).send('Server Error');
    }

    if (!file.avatar) {
      console.log('!file.avatar');
      return res.status(400).send('Недопустимое изображение. Картинка должна быть в формате: JPG, JPEG, PNG');
    }

    const newFileName = `${req.id}.${file.avatar.name.split('.').pop()}`;

    fs.rename(file.avatar.path, path.join(form.uploadDir, newFileName), (err, img) => {
      if (err) {
        console.log(err.message);
        return res.status(500).send('Server Error');
      }

      const url = `https://api.bibcongress.ru/upload/avatars/${newFileName}`;
      
      Mongo.database
        .db('bibcongress')
        .collection('users')
        .findOneAndUpdate(
          { email: req.email },
          { $set: { avatar: url } },
        )
        .then(() => {
          res.send(url);
        })
        .catch(err => {
          console.log(err);
          res.status(500).send('Server Error');
        });
    });
  });
});

module.exports = router;
