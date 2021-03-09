const express = require('express');
const cors = require('cors');
const passport = require('passport');
const Mongo = require('./db/Mongo');

const app = express();

Mongo.connect();

app.use(cors({
  origin: 'https://www.bibcongress.ru',
}));

app.use("/upload", express.static(__dirname + "/upload"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

require('./passport').init();

app.use('/auth', require('./routes/auth'));
app.use('/user', require('./routes/user'));
app.use('/reports', require('./routes/reports'));
app.use('/translate', require('./routes/translate'));
app.use('/admin', require('./routes/admin'));

app.use('/test', require('./routes/test'));

if (require.main === module) {
  const port = 3100;
  app.listen(port, () => {
    console.log(`API server listening on port ${port}`);
  })
}

module.exports = app;
