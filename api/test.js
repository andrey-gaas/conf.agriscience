const { Router } = require('express');
const router = Router();
const Mongo = require('./db/Mongo');
// const authMiddleware = require('../middleware/auth');

router.get('/', (req, res) => {
  res.send('Тест пройден');
});

module.exports = router;
