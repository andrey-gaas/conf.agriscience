const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Mongo = require('./db/Mongo');

exports.init = function() {
  passport.use(
    new LocalStrategy(function(email, password, done) {
      console.log('2');
      Mongo.database
        .db('bibcongress')
        .collection('users')
        .findOne({ email: email })
        .then(function(user) {
          if (!user || user.password !== password) return done(null, false);
          return done(null, user);
        });
    })
  );
}

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

/* passport.use(
  new LocalStrategy((email, password, done) => {
    const bibcongress = Mongo.database.db('bibcongress');
    const users = bibcongress.collection('users');

    users.findOne({ email: email }, (error, user) => {
      if (error) return done(error);
      else if (!user || user.password !== password) return done(null, false);
      else return done(null, user);
    });
  })
); */