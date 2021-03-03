const { Router } = require('express');
const Mongo = require('../db/Mongo');
const { setLog } = require('../utils');
const router = Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendMail = require('../mail/sendmail');
const { secretKey } = require('../config');

// Получить пользователя
router.get('/', (req, res) => {
  let filter = req.query;
  if (filter.id && filter.id !== undefined) {
    filter.id = +filter.id;
  }
  for (let key in filter) {
    if(filter[key] === 'false'){
      filter[key] = false;
    }

    if(filter[key] === 'true'){
      filter[key] = true;
    }
  }
  
  if (filter.isUserChecked !== undefined) {
    filter.isUserChecked = { '$exists': filter.isUserChecked };
  }

  if (filter.isHide === undefined) {
    filter['$or'] = [{isHide:{'$exists': false}}, {isHide:false}];
  }
  if (filter.isHide === false) {
    delete filter.isHide;
  }
  Mongo.database
    .db('bibcongress')
    .collection('users')
    .find(filter)
    .toArray((err, users) => {
      res.send(users);
    });
});

// Добавить пользователя
router.post('/', (req, res) => {
  console.log(req.body);
  const {
    name,
    nameEn,
    surname,
    surnameEn,
    patronymic,
    patronymicEn,
    organization,
    organizationEn,
    position,
    positionEn,
    place,
    placeEn,
    aboutMe,
    aboutMeEn,
    email,
    telephone,
    password,
    isSendLetter,
    isUserChecked,
  } = req.body;

  const users = Mongo.database.db('bibcongress').collection('users');
  const actions = Mongo.database.db('bibcongress').collection('actions');

  users.find().limit(1).sort({ $natural: -1 }).toArray((error, lastUser) => {
    let id = 0;
    if (error) {
      console.log(error.message);
      res.status(500).send('Ошибка сервера');
    } else {
      if (lastUser && lastUser.length) id = lastUser[0].id + 1;

      users.findOne({ email: email }, (error, result) => {
        if (error) {
          console.log(error);
          res.status(500).send('Server error');
        } else if (result !== null) res.status(400).send('E-Mail занят.');
        else {
          const registrationDate = Date.now();
          const salt = bcrypt.genSaltSync(10);
          const user = {
            id,
            name,
            nameEn,
            surname,
            surnameEn,
            patronymic,
            patronymicEn,
            organization,
            organizationEn,
            position,
            positionEn,
            place,
            placeEn,
            aboutMe,
            aboutMeEn,
            email,
            telephone,
            isEmailConfirmed: isSendLetter ? false : true,
            isUserChecked,
            password: bcrypt.hashSync(password, salt),
            avatar: '',
            registrationDate,
          };
    
          users.insertOne(user, (error) => {
            if (error) {
              console.log(error);
              res.status(500).send('Server error');
            }
            else {
              const logConfig = {
                userId: id,
                action: 'Создание пользователя (Админ)',
                editorId: id,
              };
              setLog(logConfig);

              const token = jwt.sign({
                email,
                id,
                admin: false,
              }, secretKey);
        
              res.cookie('token', token, { expires: new Date(Date.now() + 31536000000) });
              //res.send({ message: 'OK', token: token });
    
              if (isSendLetter) {
                const message = {
                  email,
                  subject: 'Подтвердите регистрацию на III Международный библиографический конгресс.',
                  text: `Для подтверждения электронной почты, перейдите по ссылке: https://api.bibcongress.ru/auth/email-confirm/${email}`,
                };
                sendMail(message, require('./mail/mail')(email))
                  .then(() => res.send({ message: 'OK', token }))
                  .catch(error => {
                    console.log(error.message);
                    res.send('OK');
                  });
              }
            }
          });
        }
      });
    }
  });
});

// Редактировать пользователя
router.put('/:id', (req, res) => {
  const data = req.body;
  const { id } = req.params;

  if(data.id !== undefined || data._id !== undefined) {
    res.status(400).send('Нельзя менять id');
  }

  if (data.password) {
    const salt = bcrypt.genSaltSync(10);
    data.password = bcrypt.hashSync(data.password, salt);
  }

  Mongo.database
    .db('bibcongress')
    .collection('users')
    .findOneAndUpdate({ id: +id }, { $set: data })
    .then(({ value: oldData }) => {
      const logConfig = {
        userId: +id,
        action: 'Изменение данных (Админ)',
        editorId: +req.id,
        changes: [],
      };

      for (let key in req.body) {
        if (req.body[key] !== oldData[key]) {
          logConfig.changes.push({ before: oldData[key], after: req.body[key] });
        }
      }

      setLog(logConfig);

      res.send('OK');
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Ошибка сервера');
    });
});

// Удалить пользователя
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Mongo.database
    .db('bibcongress')
    .collection('users')
    .deleteOne({ id: +id })
    .then(() => {
      const logConfig = {
        userId: +id,
        action: 'Удаление пользователя',
        editorId: +req.id,
      };
      res.send('OK');
    })
    .catch(error => res.status(500).send(error.message));
});

// Одобрить пользователя
router.get('/confirm/:id', (req, res) => {
  const { id } = req.params;
  Mongo.database
    .db('bibcongress')
    .collection('users')
    .findOneAndUpdate({ id: +id }, { $set: { isUserChecked: true } })
    .then(() => {
      const logConfin = {
        userId: +id,
        action: 'Одобрение пользователя',
        editorId: +req.id,
      };
      setLog(logConfin);
      res.send('OK');
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Ошибка сервера');
    });
});

module.exports = router;