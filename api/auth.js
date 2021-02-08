const { Router } = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const Mongo = require('./db/Mongo');
const sendMail = require('./mail/sendmail');
const jwt = require('jsonwebtoken');
const { secretKey } = require('./config');
const router = Router();

const isProduction = process.env.NODE_ENV === 'production';

let successRedirect = '/personarea';
let failureRedirect = '/login'

if (isProduction) {
  successRedirect = 'https://www.bibcongress.ru/personarea';
  failureRedirect = 'https://www.bibcongress.ru/login';
}

router.post('/registration', (req, res) => {
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
    email,
    telephone,
    password,
  } = req.body;

  console.log('surname', surname);

  const users = Mongo.database.db('bibcongress').collection('users');

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
            email,
            telephone,
            isEmailConfirmed: false,
            password: bcrypt.hashSync(password, salt),
            avatar: '',
          };
    
          users.insertOne(user, (error) => {
            if (error) {
              console.log(error);
              res.status(500).send('Server error');
            }
            else {
              const token = jwt.sign({
                email,
                id,
              }, secretKey);
        
              res.cookie('token', token, { expires: new Date(Date.now() + 31536000000) });
              //res.send({ message: 'OK', token: token });
    
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
          });
        }
      });
    }
  });
});

// router.post('/login', passport.authenticate('local', { successRedirect, failureRedirect }));

router.post('/login', (req, res, next) => {
  const user = req.body;

  if (!user.username || !user.password) {
    return res.status(400).send('Bad Request');
  }

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if(err) {
      console.log(info);
      return res.status(500).send('Ошибка сервера. Перезагрузите страницу и попробуйте еще раз.');
    }

    if (!passportUser) {
      res.status(401).send('Введены неверные E-Mail или пароль.');
    }

    if(passportUser) {
      const token = jwt.sign({
        email: passportUser.email,
        id: passportUser.id,
      }, secretKey);

      res.cookie('token', token, { expires: new Date(Date.now() + 31536000000) });
      return res.send({ message: 'OK', token: token });
    }
  })(req, res, next);
});

router.get('/email-confirm/:email', (req, res) => {
  const { email } = req.params;

  const users = Mongo.database
    .db('bibcongress')
    .collection('users');

  users
    .findOne({ email })
    .then(user => {
      if (!user) {
        res.status(404).send('User not fount');
      } else if (user.isEmailConfirmed) {
        res.status(400).send('Email confirmed');
      } else {
        users
          .findOneAndUpdate({ email }, { $set: { isEmailConfirmed: true } })
          .then(() => {
            res.redirect(`https://bibcongress.ru/notification?type=email&message=${email}`);
          })
          .catch(error => {
            console.log(error.message);
            res.status(500).redirect('https://bibcongress.ru/notification?type=email-error');
          });
      }
    })
    .catch(error => {
      console.log(error.message);
      res.status(500).send('Server Error');
    });
});

module.exports = router;
