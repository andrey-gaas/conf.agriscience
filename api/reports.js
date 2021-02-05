const { Router } = require('express');
const formidable = require('formidable');
const fs = require('fs');
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

  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.uploadDir = path.join(__dirname, '.', 'upload', 'avatars');
  form.multiples = true;
  form.onPart = function (part) {
    if(!part.filename || part.filename.match(/\.(docx)$/i)) {
      this.handlePart(part);
    }
  }

  form.parse(req, (err, fields, file) => {
    if (err) {
      console.log(err.message);
      return res.status(500).send('Server Error');
    }

    if (!file.avatar) {
      console.log('!file.avatar');
      return res.status(400).send('Недопустимое изображение. Картинка должна быть в формате: JPG, JPEG, PNG');
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

router.post('/file/:id', (req, res) => {
  const { id } = req.params;
  const isProduction = process.env.NODE_ENV === 'production';
  
  const reportsDirPath = isProduction ? './upload/reports' : './api/upload/reports';

  // Создание папки докладов
  if (!fs.existsSync(`${reportsDirPath}`)) {
    fs.mkdirSync(`${reportsDirPath}`);
  }

  // Создание папки пользователя
  if (!fs.existsSync(`${reportsDirPath}/${req.id}`)) {
    fs.mkdirSync(`${reportsDirPath}/${req.id}`);
  }

  res.send('OK');

  /* const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.uploadDir = path.join(__dirname, '.', 'upload', 'reports', req.id);
  form.multiples = true;
  form.onPart = function (part) {
    if(!part.filename || part.filename.match(/\.(docx)$/i)) {
      this.handlePart(part);
    }
  } */
  /* form.parse(req, (err, fields, file) => {
    if (err) {
      console.log(err.message);
      return res.status(500).send('Server Error');
    }

    if (!file.file) {
      console.log('!file.file');
      return res.status(400).send('Допустим только формат: DOCX.');
    }

    const newFileName = `${id}.docx`;

    fs.rename(file.file.path, path.join(form.uploadDir, newFileName), (err, img) => {
      if (err) {
        console.log(err.message);
        return res.status(500).send('Server Error');
      }

      res.send('ok');
    });

  }); */
})

/* router.post('/file', (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.uploadDir = path.join(__dirname, '.', 'upload', 'avatars');
  form.multiples = true;
  form.onPart = function (part) {
    if(!part.filename || part.filename.match(/\.(docx)$/i)) {
      this.handlePart(part);
    }
  }
  form.parse(req, function(err, fields, file) {
    if (err) {
      console.log(err.message);
      return res.status(500).send('Server Error');
    }

    if (!file.file) {
      console.log('!file.file');
      return res.status(400).send('Допустим только формат: DOCX.');
    }

    // const newFileName = `${req.id}.${file.avatar.name.split('.').pop()}`;

    fs.rename(file.avatar.path, path.join(form.uploadDir, newFileName), (err, img) => {
      if (err) {
        console.log(err.message);
        return res.status(500).send('Server Error');
      }

      const url = `https://api.bibcongress.ru/upload/avatars/${newFileName}`;
      
      Mongo.database
        .db('bibcongress')
        .collection('users')
        .findOneAndUpdate(
          { email: req.email },
          { $set: { avatar: url } },
        )
        .then(() => {
          res.send(url);
        })
        .catch(err => {
          console.log(err);
          res.status(500).send('Server Error');
        });
    });
  });
}) */

module.exports = router;
