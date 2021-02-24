const { Router } = require('express');
const Mongo = require('../db/Mongo');
const router = Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendMail = require('./mail/sendmail');
const { secretKey } = require('./config');

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
              const action = {
                id: user.id,
                email: user.email,
                registration: registrationDate,
              };
              actions.insertOne(action, error => {
                if (error) {
                  console.log('Ошибка сохранения действия: Регистрация');
                  console.log(error.message);
                }
              });
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

router.put('/:id', (req, res) => {
  const data = req.body;

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
    .findOneAndUpdate({ id: +req.params.id }, { $set: data })
    .then(() => {
      res.send('OK');
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Ошибка сервера');
    });
});

router.delete('/:id', (req, res) => {
  Mongo.database
    .db('bibcongress')
    .collection('users')
    .deleteOne({ id: +req.params.id })
    .then(() => {
      res.send('OK');
    })
    .catch(error => res.status(500).send(error.message));
});

module.exports = router;