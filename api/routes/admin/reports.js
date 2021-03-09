const { Router } = require('express');
const bcrypt = require('bcryptjs');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const Mongo = require('../../db/Mongo');
const { isProduction } = require('../../config');
const { setLog } = require('../../utils');
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

  if (filter.isHide === undefined) {
    filter['$or'] = [{isHide:{'$exists': false}}, {isHide:false}];
  }
  if (filter.isHide === 'false') {
    delete filter.isHide;
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
          const logConfig = {
            email: report.ops[0].email,
            id: report.ops[0].id,
            action: 'Создание доклада (админ)',
            editorId: req.id,
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
  const data = req.body;

  if (data.id !== undefined || data._id !== undefined) {
    return res.status(400).send('Нельзя менять ID');
  }

  Mongo.database
    .db('bibcongress')
    .collection('reports')
    .findOneAndUpdate({ id: +req.params.id }, { $set: data })
    .then(({ value: oldData }) => {
      const logConfig = {
        email: oldData.email,
        id: oldData.id,
        action: 'Редактирование доклада (Админ)',
        changes: [],
        editorId: req.id,
      };

      for (let key in req.body) {
        if (!Array.isArray(req.body[key])) {
          if (req.body[key] !== oldData[key]) {
            logConfig.changes.push({ field: key, before: oldData[key], after: req.body[key] });
          }
        }
      }

      setLog(logConfig);

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

router.post('/file/:user/:id', (req, res) => {
  const { user, id } = req.params;

  const reportsDirPath = isProduction ? './upload/reports' : './api/upload/reports';
  
  // Создание папки пользователя
  if (!fs.existsSync(`${reportsDirPath}/${user}`)) {
    fs.mkdirSync(`${reportsDirPath}/${user}`, { recursive: true });
  }

  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.uploadDir = path.join(__dirname, '..', '..', 'upload', 'reports', `${user}`);
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

      const url = `https://api.bibcongress.ru/upload/reports/${user}/${newFileName}`;

      Mongo.database
        .db('bibcongress')
        .collection('reports')
        .findOneAndUpdate({ id: +id }, { $set: { url } })
        .then(result => {
          res.send('OK');
        });
    });
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
