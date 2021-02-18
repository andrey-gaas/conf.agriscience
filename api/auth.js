const { Router } = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const emailValidator = require('email-validator');
const phoneToken = require('generate-sms-verification-code');
const Mongo = require('./db/Mongo');
const sendMail = require('./mail/sendmail');
const jwt = require('jsonwebtoken');
const { secretKey } = require('./config');
const router = Router();

// Регистрация
router.post('/registration', (req, res) => {
  const {
    name,
    nameEn,
    surname,
    surnameEn,
    patronymic,
    patronymicEn,
    organization,
    organizationEn,
    position,
    positionEn,
    place,
    placeEn,
    email,
    telephone,
    password,
  } = req.body;

  const users = Mongo.database.db('bibcongress').collection('users');

  users.find().limit(1).sort({ $natural: -1 }).toArray((error, lastUser) => {
    let id = 0;
    if (error) {
      console.log(error.message);
      res.status(500).send('Ошибка сервера');
    } else {
      if (lastUser && lastUser.length) id = lastUser[0].id + 1;

      users.findOne({ email: email }, (error, result) => {
        if (error) {
          console.log(error);
          res.status(500).send('Server error');
        } else if (result !== null) res.status(400).send('E-Mail занят.');
        else {
          const salt = bcrypt.genSaltSync(10);
          const user = {
            id,
            name,
            nameEn,
            surname,
            surnameEn,
            patronymic,
            patronymicEn,
            organization,
            organizationEn,
            position,
            positionEn,
            place,
            placeEn,
            email,
            telephone,
            isEmailConfirmed: false,
            password: bcrypt.hashSync(password, salt),
            avatar: '',
          };
    
          users.insertOne(user, (error) => {
            if (error) {
              console.log(error);
              res.status(500).send('Server error');
            }
            else {
              const token = jwt.sign({
                email,
                id,
                admin: false,
              }, secretKey);
        
              res.cookie('token', token, { expires: new Date(Date.now() + 31536000000) });
              //res.send({ message: 'OK', token: token });
    
              const message = {
                email,
                subject: 'Подтвердите регистрацию на III Международный библиографический конгресс.',
                text: `Для подтверждения электронной почты, перейдите по ссылке: https://api.bibcongress.ru/auth/email-confirm/${email}`,
              };
              sendMail(message, require('./mail/mail')(email))
                .then(() => res.send({ message: 'OK', token }))
                .catch(error => {
                  console.log(error.message);
                  res.send('OK');
                });
            }
          });
        }
      });
    }
  });
});

// Вход
router.post('/login', (req, res) => {
  const user = req.body;
  
  if (!user.username || !user.password) {
    return res.status(400).send('Bad Request');
  }

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if(err) {
      console.log(info);
      return res.status(500).send('Ошибка сервера. Перезагрузите страницу и попробуйте еще раз.');
    }
    if (!passportUser) {
      res.status(401).send('Введены неверные E-Mail или пароль.');
    }

    if(passportUser) {
      const token = jwt.sign({
        email: passportUser.email,
        id: passportUser.id,
        admin: passportUser.isAdmin || false,
      }, secretKey);

      res.cookie('token', token, { expires: new Date(Date.now() + 31536000000) });
      return res.send({ message: 'OK', token: token });
    }
  })(req, res);
});

// Проверка авторизации
router.get('/check', (req, res) => {
  const { headers: { authorization } } = req;
  if (!authorization) {
    return res.status(401).send('Token not provided!');
  }

  try {
    const user = jwt.verify(authorization, secretKey);

    Mongo.database
      .db('bibcongress')
      .collection('users')
      .findOne({ id: user.id })
      .then(user => {
        if (!user) {
          return res.status(404).send('Пользователь не найден');
        }

        res.send('OK');
      })
      .catch(error => {
        console.log('Ошибка запроса в базу при проверке авторизации');
        console.log(error.message);
        res.status(500).status('Ошибка сервера');
      });
  } catch(error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).send('Invalid token!');
    }
    return res.status(500).send(error.message);
  }
});

// Повторная отправка письма
router.get('/send-email/:email', (req, res) => {
  const { email } = req.params;
  const message = {
    email,
    subject: 'Подтвердите регистрацию на III Международный библиографический конгресс.',
    text: `Для подтверждения электронной почты, перейдите по ссылке: https://api.bibcongress.ru/auth/email-confirm/${email}`,
  };
  sendMail(message, require('./mail/mail')(email))
    .then(() => res.send('OK'))
    .catch(error => {
      console.log(error.message);
      res.send(500);
    });
});

// Подтверждение почты
router.get('/email-confirm/:email', (req, res) => {
  const { email } = req.params;

  const users = Mongo.database
    .db('bibcongress')
    .collection('users');

  users
    .findOne({ email })
    .then(user => {
      if (!user) {
        res.status(500).redirect('https://www.bibcongress.ru/notification?type=email-error&message=usernotfound');
      } else if (user.isEmailConfirmed) {
        res.status(500).redirect('https://www.bibcongress.ru/notification?type=email-error&message=emailisconfirmed');
      } else {
        users
          .findOneAndUpdate({ email }, { $set: { isEmailConfirmed: true } })
          .then(() => {
            res.redirect(`https://www.bibcongress.ru/notification?type=email&message=${email}`);
          })
          .catch(error => {
            console.log(error.message);
            res.status(500).redirect('https://www.bibcongress.ru/notification?type=server-error');
          });
      }
    })
    .catch(error => {
      console.log(error.message);
      res.status(500).send('Server Error');
    });
});

// ВОССТАНОВЛЕНИЕ ПАРОЛЯ
//====================================================================

// Проверка почты, оправка письма
router.post('/email-recovery', (req, res) => {
  const { email } = req.body;

  if (!email || !emailValidator.validate(email)) {
    return res.status(400).send('Введите валидный E-Mail.')
  }

  const users = Mongo.database.db('bibcongress').collection('users');

  users.findOne({ email })
    .then(user => {
      if (!user) {
        res.status(500).send('error_user_not_found');
      } else {
        const code = phoneToken(4, {type: 'number'});
        const message = {
          email,
          subject: 'Восстановление пароля. III Международный библиографический конгресс.',
          text: `Код восстановления пароля: ${code}`,
        };
        sendMail(message)
          .then(() => {
            users
              .findOneAndUpdate({ email }, { $set: { code: `${code}` } })
              .then(() => {
                res.send('OK');
              })
              .catch(error => {
                console.log(error.message);
                console.log('Ошибка сохранения кода');
                res.status(500).redirect('error_server_500');
              });
          })
          .catch(error => {
            console.log(error.message);
            console.log('Ошибка оправки почты');
            res.status(500).send('error_server_500');
          });
      }
    })
    .catch(error => {
      console.log(error.message);
      res.status(500).send('error_server_500')
    });
});

// Проверка кода и смена пароля
router.post('/email-recovery/code', (req, res) => {
  const { email, code, password } = req.body;

  if (!email || !emailValidator.validate(email)) {
    return res.status(400).send('Невалидный E-Mail.');
  }

  if (!password) {
    return res.status(400).send('Невалидный пароль.');
  }
  
  const users = Mongo.database.db('bibcongress').collection('users');

  users
    .findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(404).send('error_user_not_found');
      }

      if (user.code !== code || code === '') {
        return res.status(400).send('error_400_error_code');
      }

      const salt = bcrypt.genSaltSync(10);
      const newPasswrod = bcrypt.hashSync(password, salt);

      users
        .findOneAndUpdate({ email }, { $set: { code: '', password: newPasswrod } })
        .then(() => {
          res.send('OK');
        })
        .catch(error => {
          console.log(error.message);
          console.log('Ошибка сохранения кода');
          res.status(500).redirect('error_server_500');
        });
    })
    .catch(error => {
      console.log(error.message);
      res.status(500).send('error_server_500');
    });
});

module.exports = router;
