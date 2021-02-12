const express = require('express');
const cors = require('cors');
const passport = require('passport');
const Mongo = require('./db/Mongo');

const app = express();

Mongo.connect();

app.use(cors({
  origin: 'https://www.bibcongress.ru',
}));
  
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

require('./passport').init();

app.use('/auth', require('./auth'));
app.use('/user', require('./user'));
app.use('/reports', require('./reports'));
app.use('/translate', require('./translate'));

app.use('/test', require('./test'));

if (require.main === module) {
  const port = 3100;
  app.listen(port, () => {
    console.log(`API server listening on port ${port}`);
  })
}

module.exports = app;
