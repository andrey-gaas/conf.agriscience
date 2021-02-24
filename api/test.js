const { Router } = require('express');
const Mongo = require('./db/Mongo');
const router = Router();

router.get('/', (req, res) => {
  Mongo
    .database.db('bibcongress')
    .collection('users')
    .find({ isUserChecked: { '$exists': false } })
    .toArray()
    .then(users => res.send(users))
    .catch(error => console.log(error.message));
});

module.exports = router;
