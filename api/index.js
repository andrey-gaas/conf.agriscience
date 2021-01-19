const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const Mongo = require('./db/Mongo');

const app = express();

Mongo.connect();

require('./passport');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use(session({
  secret: 'A--8grg43#f-SFfV4g-kyu$a',
  store: new FileStore(),
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 60 * 60 * 1000,
  },
  resave: false,
  saveUninitialized: false,
}));

app.use('/auth', require('./auth'));
app.use('/test', require('./test'));

if (require.main === module) {
  const port = 3001
  app.listen(port, () => {
    console.log(`API server listening on port ${port}`);
  })
}

module.exports = app;
