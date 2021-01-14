const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use('/auth', require('./auth/registration'));

if (require.main === module) {
  const port = 3001
  app.listen(port, () => {
    console.log(`API server listening on port ${port}`);
  })
}

module.exports = app;
