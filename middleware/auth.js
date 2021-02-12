const jwt = require('jsonwebtoken');
const { secretKey } = require('../api/config');

module.exports = (req, res, next) => {
  const { headers: { authorization } } = req;

  if (!authorization) {
    return res.status(401).send('Token not provided!');
  }

  try {
    const user = jwt.verify(authorization, secretKey);
    req.email = user.email;
    req.id = user.id;
    req.isAdmin = user.admin;
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).send('Invalid token!');
    }
    return res.status(500).send(error.message);
  }

  next();
};
