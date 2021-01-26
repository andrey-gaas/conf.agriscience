const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const Mongo = require('./db/Mongo');

const app = express();

Mongo.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'A--8grg43#f-SFfV4g-kyu$a',
  store: new FileStore(),
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  },
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

require('./passport').init();

app.use('/auth', require('./auth'));
app.use('/user', require('./user'));
app.use('/reports', require('./reports'));

if (require.main === module) {
  const port = 3100;
  app.listen(port, () => {
    console.log(`API server listening on port ${port}`);
  })
}

module.exports = app;
