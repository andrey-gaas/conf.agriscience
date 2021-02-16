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
  res.send('OK');
});

module.exports = router;
