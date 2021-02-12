const { Router } = require('express');
const adminMiddleware = require('../middleware/admin');
const Mongo = require('./db/Mongo');
const router = Router();

router.use('*', adminMiddleware, (req, res, next) => {
  next();
});

router.get('/check', (req, res) => {
  res.send('OK');
});

module.exports = router;
