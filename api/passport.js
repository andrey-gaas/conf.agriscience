const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const Mongo = require('./db/Mongo');

exports.init = function() {
  passport.use(
    new LocalStrategy(function(email, password, done) {
      Mongo.database
        .db('bibcongress')
        .collection('users')
        .findOne({ email: email })
        .then(user => {
          if (!user) return done(null, false);
          else if (!bcrypt.compareSync(password, user.password)) return done(null, false);
          return done(null, user);
        });
    })
  );
}

passport.serializeUser(function(user, done) {
  done(null, user.email);
});

passport.deserializeUser(function(email, done) {
  Mongo.database
    .db('bibcongress')
    .collection('users')
    .findOne({ email: email })
    .then(user => {
      console.log('user', user);
      if (!user) done(null, false);
      else done(null, user);
    });
});
