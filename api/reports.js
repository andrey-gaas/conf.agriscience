const { Router } = require('express');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const Mongo = require('./db/Mongo');
const { isProduction } = require('./config');
const { setLog } = require('./utils');
const auth = require('../middleware/auth');
const router = Router();

router.use('*', auth, (req, res, next) => {
  next();
});

// Получить список своих докладов
router.get('/', (req, res) => {
  Mongo.database
    .db('bibcongress')
    .collection('reports')
    .find({ email: req.email })
    .toArray((err, reports) => {
      res.send(reports);
    });
});

// Получить доклад по ID
router.get('/:id', (req, res) => {
  const { id } = req.params;

  Mongo.database
    .db('bibcongress')
    .collection('reports')
    .findOne({ id: +id })
    .then(report => res.send(report));
});

// Создать доклад
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
        report.url = '';
  
        reports.insertOne(report)
          .then(report => {
            const logConfig = {
              userId: req.id,
              action: 'Создан доклад',
              reportId: report.ops[0].id,
            };
            setLog(logConfig);
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

// Удалить доклад
router.delete('/:id', (req, res) => {
  const id = +req.params.id;

  Mongo.database
    .db('bibcongress')
    .collection('reports')
    .deleteOne({ id })
    .then(() => {
      const logConfig = {
        userId: req.id,
        action: 'Удаление доклада',
        reportId: id,
      };
      setLog(logConfig);
      res.send('OK');
    })
    .catch(error => res.status(500).send(error.message));
  
});

// Загрузить файл тезисов
router.post('/file/:id', (req, res) => {
  const { id } = req.params; // ID доклада
  
  const reportsDirPath = isProduction ? './upload/reports' : './api/upload/reports';

  // Создание папки пользователя
  if (!fs.existsSync(`${reportsDirPath}/${req.id}`)) {
    fs.mkdirSync(`${reportsDirPath}/${req.id}`, { recursive: true });
  }

  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.uploadDir = path.join(__dirname, '.', 'upload', 'reports', `${req.id}`);
  form.multiples = true;
  form.onPart = function (part) {
    if(!part.filename || part.filename.match(/\.docx$/i)) {
      this.handlePart(part);
    }
  }

  form.parse(req, (err, fields, file) => {
    if (err) {
      console.log(err.message);
      console.log('Ошибка parse');
      return res.status(500).send('Server Error');
    }
    if (!file.word) {
      console.log('Неправильный формат файла');
      return res.status(400).send('Допустим только формат: DOCX.');
    }

    const newFileName = `${id}.docx`;
    
    fs.rename(file.word.path, path.join(form.uploadDir, newFileName), (err, img) => {
      if (err) {
        console.log(err.message);
        console.log('Ошибка переименовывания файла');
        return res.status(500).send('Server Error');
      }

      const url = `https://api.bibcongress.ru/api/upload/reports/${req.id}/${newFileName}`;

      Mongo.database
        .db('bibcongress')
        .collection('reports')
        .findOneAndUpdate({ id: +id }, { $set: { url } })
        .then(result => {
          res.send('OK');
        });
    });
  });
})

module.exports = router;
