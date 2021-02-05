const { Router } = require('express');
const Mongo = require('./db/Mongo');
const auth = require('../middleware/auth');
const router = Router();

router.use('*', auth, (req, res, next) => {
  next();
});

router.get('/', (req, res) => {
  Mongo.database
    .db('bibcongress')
    .collection('reports')
    .find({ email: req.email })
    .toArray((err, reports) => {
      res.send(reports);
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Mongo.database
    .db('bibcongress')
    .collection('reports')
    .findOne({ id: +id })
    .then(report => res.send(report));
});

router.post('/', (req, res) => {
  if (req.body.email || req.body.id) {
    return res.status(400).send('Bad Request');
  }

  const report = req.body;
  let id = 0;

  const reports = Mongo.database
    .db('bibcongress')
    .collection('reports');

  reports.find().limit(1).sort({ $natural: -1 }).toArray((error, lastReport) => {
    if (error) {
      console.log(error.message);
      res.status(500).send('Server Error');
    } else {
      if (lastReport && lastReport.length) id = lastReport[0].id + 1;
      report.id = id;
      report.email = req.email;

      reports.insertOne(report)
        .then(report => {
          res.send(report.ops[0]);
        })
        .catch(error => {
          console.log(error.message);
          res.status(500).send('Server error')
        });
    }
  });
});

router.put('/:id', (req, res) => {
  if (req.body.email || req.body.id) {
    return res.status(400).send('Bad Request');
  }

  const id = +req.params.id;

  Mongo.database
    .db('bibcongress')
    .collection('reports')
    .findOneAndUpdate({ id }, { $set: req.body })
    .then((result) => {
      res.send({ message: 'OK', oldReport: result });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Server Error');
    });
});

router.delete('/:id', (req, res) => {
  const id = +req.params.id;

  Mongo.database
  .db('bibcongress')
  .collection('reports')
  .deleteOne({ id })
  .then(() => {
    res.send('OK');
  })
  .catch(error => res.status(500).send(error.message));
  
});

module.exports = router;
