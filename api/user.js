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
        email: user.email,
        telephone: user.telephone,
        name: user.name,
        surname: user.surname,
        organization: user.organization,
        patronymic: user.patronymic,
        position: user.position,
        isEmailConfirmed: user.isEmailConfirmed,
        avatar: user.avatar,
      });
    });
});

router.put('/', (req, res) => {
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
