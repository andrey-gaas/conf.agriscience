const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.send('тест')
});

module.exports = router;
