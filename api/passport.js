const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Mongo = require('./db/Mongo');

passport.serializeUser(function(user, done) {
  console.log('Сериализация: ', user);
  done(null, user.email);
});

passport.deserializeUser(function(email, done) {
  console.log('Десериализация: ', email);

  const bibcongress = Mongo.database.db('bibcongress');
  const users = bibcongress.collection('users');

  users.findOne({ email: email }, (error, user) => {
    if (error || !user) done(null, false);
    else done(null, user);
  });
});

passport.use(
  new LocalStrategy((email, password, done) => {
    console.log(123123);
    const bibcongress = Mongo.database.db('bibcongress');
    const users = bibcongress.collection('users');

    users.findOne({ email: email }, (error, user) => {
      if (error) return done(error);
      else if (!user || user.password !== password) return done(null, false);
      else return done(null, user);
    });
  })
);