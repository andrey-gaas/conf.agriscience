const { Router } = require('express');
const passport = require('passport');
const mongoClient = require('./mongoClient');
const router = Router();

router.post('/registration', (req, res) => {
  const { name, surname, patronymic, organization, position, email, telephone, password } = req.body;

  mongoClient.connect(function(err, database) {
    if (err) {
      res.status(500).send('Server Error');
    } else {
      const db = database.db('bibcongress');
      const collection = db.collection('users');

      collection.findOne({ email }, (err, result) => {
        if (err) res.status(500).send(err.message);
        if (result !== null) res.status(400).send('E-Mail занят.');
        else {
          const user = {name, surname, patronymic, organization, position, email, telephone, password};

          collection.insertOne(user, (err) => {
            if (err) res.status(500).send(err.message);
            else res.send({ name, surname, patronymic, organization, position, email, telephone  });
          });
        }
      });
    }
  });
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', function(err, user) {
    if (err) return next(err);
    if (!user) return res.status(400).send('Введен неверный E-Mail или пароль.');
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.send('OK');
    });
  })(req, res, next);
});

module.exports = router;
