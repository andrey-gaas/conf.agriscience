const { Router } = require('express');
const mongoClient = require('../mongoClient');
const router = Router();

router.use('/registration', (req, res) => {
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

  const user = {
    name,
    surname,
    patronymic,
    organization,
    position,
    place,
    email,
    telephone,
    password,
  };

  mongoClient.connect(function(err, database) {
    if (err) {
      res.status(500).send('Server Error');
    } else {
      const db = database.db('bibcongress');
      const collection = db.collection('users');

      collection.findOne({ email: user.email }, (err, result) => {
        if (err) res.status(500).send(err.message);
        console.log(result);
        if (result !== null) res.status(400).send('E-Mail занят.');
        else {
          collection.insertOne(user, (err, result) => {
            if (err) res.status(500).send(err.message);
            else res.send(result.ops);
          });
        }
      });
    }
  });
});

module.exports = router;
