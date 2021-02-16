const { Router } = require('express');
const adminMiddleware = require('../../middleware/admin');
const Mongo = require('../db/Mongo');
const router = Router();

router.use('*', adminMiddleware, (req, res, next) => {
  next();
});

router.use('/reports', require('./reports'));
router.use('/users', require('./users'));

router.get('/check', (req, res) => {
  Mongo.database
    .db('bibcongress')
    .collection('users')
    .findOne({ id: +req.id, isAdmin: true })
    .then(user => {
      if (user) res.send('OK');
      else res.status(403).send('Ошибка доступа');
    })
});

module.exports = router;
