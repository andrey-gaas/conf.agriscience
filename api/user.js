const path = require('path');
const fs = require('fs');
const { Router } = require('express');
const formidable = require('formidable');
const auth = require('../middleware/auth');
const Mongo = require('./db/Mongo');
const router = Router();

router.use('*', auth, (req, res, next) => {
  next();
});

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

router.put('/', (req, res) => {
  if (req.body.email) {
    return res.status(400).send('Bad Request');
  }

  Mongo.database
    .db('bibcongress')
    .collection('users')
    .findOneAndUpdate(
      { email: req.email },
      { $set: req.body },
    )
    .then(() => {
      res.send('OK');
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Server Error');
    });
});

router.post('/avatar', (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.uploadDir = path.join(__dirname, '.', 'upload', 'avatars');
  form.multiples = true;

  form.parse(req, function(err, fields, file) {
    if (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
    const newFileName = `${req.email}.${file.avatar.name.split('.').pop()}`;

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
