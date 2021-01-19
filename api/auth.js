const { Router } = require('express');
const passport = require('passport');
const Mongo = require('./db/Mongo');
const router = Router();

router.post('/registration', (req, res) => {
  const { name, surname, patronymic, organization, position, email, telephone, password } = req.body;

  const bibcongress = Mongo.database.db('bibcongress');
  const users = bibcongress.collection('users');
  
  users.findOne({ email: email }, (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send('Server error');
    } else if (result !== null) res.status(400).send('E-Mail занят.');
    else {
      const user = {name, surname, patronymic, organization, position, email, telephone, password};

      users.insertOne(user, (error) => {
        if (error) {
          console.log(error);
          res.status(500).send('Server error');
        }
        else res.send({ name, surname, patronymic, organization, position, email, telephone  });
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
