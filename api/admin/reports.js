const { Router } = require('express');
const bcrypt = require('bcryptjs');
const Mongo = require('../db/Mongo');
const router = Router();

router.get('/', (req, res) => {
  
  let filter = req.query;
  
  if (filter.id) {
    filter.id = +filter.id;
  }
  if(filter.status){
    filter.status = +filter.status
  }

  Mongo.database
    .db('bibcongress')
    .collection('reports')
    .find(filter)
    .toArray((err, reports) => {
      res.send(reports);
    });
});

router.get('/:id', (req, res) => {
  Mongo.database
    .db('bibcongress')
    .collection('reports')
    .findOne({ id: +req.params.id })
    .then(report => {
      if (report) res.send(report);
      else res.status(404).send('Доклад не найден');
    })
});

router.put('/:id', (req, res) => {
  const data = req.body;

  if (data.id !== undefined || data._id !== undefined) {
    return res.status(400).send('Нельзя менять ID');
  }

  if (data.password) {
    const salt = bcrypt.genSaltSync(10);
    data.password = bcrypt.hashSync(data.password, salt);
  }

  Mongo.database
    .db('bibcongress')
    .collection('reports')
    .findOneAndUpdate({ id: +req.params.id }, { $set: data })
    .then(() => {
      res.send('OK');
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Ошибка сервера');
    });
});

router.delete('/:id', (req, res) => {
  Mongo.database
    .db('bibcongress')
    .collection('reports')
    .deleteOne({ id: +req.params.id })
    .then(() => {
      res.send('OK');
    })
    .catch(error => res.status(500).send(error.message));
});

module.exports = router;
