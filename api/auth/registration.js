const { Router } = require('express');
const router = Router();

router.use('/registration', (req, res) => {
  const regexp = /^[a-zA-Zа-яёА-ЯЁ]*$/;
  const {
    name,
    surname,
    patronymic,
    organization,
    position,
    place,
    email,
    telephone,
    password,
  } = req.body;

  /* if (name.match(regexp)) */

  res.send('OK');
});

module.exports = router;
