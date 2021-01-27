const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const bcrypt = require('bcryptjs');

const Mongo = require('../external/db');
const User = require("../controllers/user.js");

passport.serializeUser((user, done) => done(null, user.data._id));

passport.deserializeUser((id, done) => {
  Mongo.database
    .db('bibcongress')
    .collection('users')
    .findOne({ email: email })
    .then(user => {
      if (!user) done(null, false);
      else done(null, user);
    });
});

/*
 * Sign in using Email and Password.
 */
passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    (email, password, done) => {
      Mongo.database
        .db('bibcongress')
        .collection('users')
        .findOne({ email: email.toLocaleLowerCase() })
        .then(user => {
          if (!user) return done({ message: `E-Mail ${email} not found.` }, false);
          
          user = new User(user);
          user.comparePassword(password, (err, isMatch) => {
            if (err) {
              return done(err);
            }
            if (isMatch) {
              return done(null, user);
            }
            return done({ message: "Invalid email or password." }, false);
          });
        })
        .catch(error => {
          console.log(error.message);
          return done(error);
        });
    }
  )
);

/*
 * Login Required middleware.
 */
exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

/*
 * Authorization Required middleware.
 */
exports.isAuthorized = (req, res, next) => {
  const provider = req.path.split("/").slice(-1)[0];
  const token = req.user.data.tokens.find(token => token.kind === provider);
  if (token) {
    return next();
  }

  res.redirect(`/auth/${provider}`);
};
