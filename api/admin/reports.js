const { Router } = require('express');
const bcrypt = require('bcryptjs');
const Mongo = require('../db/Mongo');
const { setLog } = require('../utils');
const router = Router();

// Список докладов (с фильтром и без)
router.get('/', (req, res) => {
  
  let filter = req.query;
  
  if (filter.id) {
    filter.id = +filter.id;
  }
  if(filter.status){
    filter.status = +filter.status
  }
  if(filter.isReportChecked){
    if(filter.isReportChecked === 'false') filter.isReportChecked = false
    if(filter.isReportChecked === 'true') filter.isReportChecked = true
  }
  Mongo.database
    .db('bibcongress')
    .collection('reports')
    .find(filter)
    .toArray((err, reports) => {
      res.send(reports);
    });
});

// Получить конкретный доклад
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

// Добавить доклад
router.post('/', (req, res) => {
  if (req.body.id) {
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
      report.url = '';

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

// Редактировать доклад
router.put('/:id', (req, res) => {
  const data = req.body;

  if (data.id !== undefined || data._id !== undefined) {
    return res.status(400).send('Нельзя менять ID');
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

// Удалить доклад
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

// Подтвердить доклад
router.get('/confirm/:id', (req, res) => {
  const { id } = req.params;

  Mongo.database
    .db('bibcongress')
    .collection('reports')
    .findOneAndUpdate({ id: +id }, { $set: { isReportChecked: true } })
    .then(() => {
      const logConfin = {
        userId: req.id,
        action: 'Подтверждение доклада',
        reportId: id,
      };
      setLog(logConfin);
      res.send('OK');
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Ошибка сервера');
    });
});

// Перенести доклад в подтвержденный
/* router.post('/move-to-confirm', (req, res) => {
  Mongo.database
    .db('bibcongress')
    .collection('confirmed-reports')
    .insertOne(report)
    .then(() => {
      res.send('OK');
    })
    .catch(error => {
      console.log(error.message);
      res.status(500).send('Ошибка сервера')
    });
}); */

module.exports = router;
