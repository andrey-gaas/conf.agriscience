const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoClient = require('./mongoClient');

passport.serializeUser(function(user, done) {
  console.log('Сериализация: ', user);
  done(null, user.email);
});

passport.deserializeUser(function(email, done) {
  console.log('Десериализация: ', email);

  mongoClient.connect((error, database) => {
    if (error) {
      done(null, false);
    } else {
      const db = database.db('bibcongress');
      const collection = db.collection('users');

      collection.findOne({ email }, (error, user) => {
        if (error || !user) done(null, false);
        else done(null, user);
        database.close();
      });
    }
  });
});

passport.use(
  new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    mongoClient.connect((error, database) => {
      if (error) {
        return done(error);
      } else {
        const db = database.db('bibcongress');
        const collection = db.collection('users');
  
        collection.findOne({ email }, (error, user) => {
          database.close();
          if (error) return done(error);
          else if (!user || user.password !== password) return done(null, false, { message: 'Введен неверный E-Mail или пароль.' });
          else return done(null, user);
        });
      }
    });
  })
);