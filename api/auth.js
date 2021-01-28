const { Router } = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const Mongo = require('./db/Mongo');
const sendMail = require('./sendmail');
const e = require('express');
const router = Router();

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

  const users = Mongo.database.db('bibcongress').collection('users');
  
  users.findOne({ email: email }, (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send('Server error');
    } else if (result !== null) res.status(400).send('E-Mail занят.');
    else {
      const salt = bcrypt.genSaltSync(10);
      const user = {
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
          const message = {
            email,
            subject: 'Регистрация - III Международный библиографический конгресс',
            text: `Для подтверждения электронной почты, перейдите по ссылке: http://localhost:3000/api/auth/email-confirm/${email}`,
          };
          sendMail(message)
            .then(() => res.send('OK'))
            .catch(error => {
              console.log(error.message);
              res.send('OK');
            });
        }
      });
    }
  });
});

router.post('/login', passport.authenticate('local', { successRedirect: '/personarea', failureRedirect: '/login' }));

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
            res.redirect('/');
          })
          .catch(error => {
            console.log(error.message);
            res.status(500).redirect('/');
          });
      }
    })
    .catch(error => {
      console.log(error.message);
      res.status(500).send('Server Error');
    });
});

module.exports = router;
