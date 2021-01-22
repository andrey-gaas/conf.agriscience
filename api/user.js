const { Router } = require('express');
const Mongo = require('./db/Mongo');
const router = Router();

router.use('*', (req, res, next) => {
  if (req.user) next();
  else res.status(401).send('Unauthorized');
});

router.get('/', (req, res) => {
  Mongo.database
    .db('bibcongress')
    .collection('users')
    .findOne({ email: req.user.email })
    .then(user => {
      res.send({
        surname: user.surname,
        name: user.name,
        patronymic: user.patronymic,
        organization: user.organization,
        position: user.position,
        place: user.place,
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
      { email: req.user.email },
      { $set: req.body },
    )
    .then(() => {
      res.send('OK');
    })
    .catch(err => console.log('My Error: ', err.message));
});

module.exports = router;
