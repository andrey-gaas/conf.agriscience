const jwt = require('jsonwebtoken');
const { secretKey } = require('../api/config');

module.exports = (req, res, next) => {
  const { headers: { authorization } } = req;

  if (!authorization) {
    return res.status(401).send('Token not provided!');
  }

  try {
    const email = jwt.verify(authorization, secretKey).email;
    req.email = email;
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).send('Invalid token!');
    }
    return res.status(500).send(error.message);
  }

  next();
};

/* module.exports = (req, res, next) => {
  console.log(req, res, next);
  if (req.isAuthenticated()) {
    //console.log(req, res);
    next();
  } else {
    return res.status(401).send('Unauthenticated 1');
  }
};
 */