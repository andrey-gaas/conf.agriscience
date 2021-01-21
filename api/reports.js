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
    .collection('reports')
    .find({ email: req.user.email })
    .toArray((err, reports) => {
      res.send(reports);
    });
});

module.exports = router;
