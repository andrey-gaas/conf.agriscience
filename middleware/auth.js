const jwt = require('jsonwebtoken');
const { JWT } = require('../constants/auth');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send('Token not provided!');
  }

  const token = authHeader.replace('Bearer ', '');
  
  try {
    jwt.verify(token, JWT);
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).send('Invalid token!');
    }
  }

  next();
};
