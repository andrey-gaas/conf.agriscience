const { Router } = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const Mongo = require('./db/Mongo');
const sendMail = require('./sendmail');
const router = Router();

router.post('/registration', (req, res) => {
  const {
    name,
    surname,
    patronymic,
    organization,
    position,
    place,
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
        surname,
        patronymic,
        organization,
        position,
        email,
        telephone,
        place,
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
          sendMail('Message');
          res.send('OK');
        }
      });
    }
  });
});

router.post('/login', passport.authenticate('local', { successRedirect: '/personarea', failureRedirect: '/login' }));

module.exports = router;
