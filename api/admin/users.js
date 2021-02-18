const { Router } = require('express');
const Mongo = require('../db/Mongo');
const router = Router();

router.get('/', (req, res) => {
  let filter = req.query;
  
  if (filter.id) {
    filter.id = +filter.id;
  }

  for (let key in filter) {
    if(filter[key] === 'false'){
      filter[key] = false;
    }

    if(filter[key] === 'true'){
      filter[key] = true;
    }
  }

  Mongo.database
    .db('bibcongress')
    .collection('users')
    .find(filter)
    .toArray((err, users) => {
      res.send(users);
    });
});

router.put('/:id', (req, res) => {

  if(req.body.id){ res.status(500).send('Нельзя менять id')}

  Mongo.database
    .db('bibcongress')
    .collection('users')
    .findOneAndUpdate({ id: +req.params.id }, { $set: req.body })
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
    .collection('users')
    .deleteOne({ id: +req.params.id })
    .then(() => {
      res.send('OK');
    })
    .catch(error => res.status(500).send(error.message));
});

module.exports = router;