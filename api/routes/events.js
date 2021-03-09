const { Router } = require('express');
const auth = require('../../middleware/auth');
const Mongo = require('../db/Mongo');
const router = Router();

router.get('/', (req, res) => {
  Mongo.database
    .db('bibcongress')
    .collection('events')
    .find({})
    .toArray((err, events) => {
      res.send(events);
    });
});

router.get('/:id', (req, res) => {
  const id = +req.params.id;

  Mongo.database
    .db('bibcongress')
    .collection('events')
    .findOne({ id })
    .then(event => {
      if (!event) res.status(404).send('Событие не найдено');
      else res.send(event);
    })
    .catch(error => {
      console.log('Ошибка в: "/routes/events.js". Роут: "/:id"');
      console.log(error.message);
      res.status(500).send('Server Error');
    })
});

module.exports = router;