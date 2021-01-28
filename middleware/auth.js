
module.exports = (req, res, next) => {
  console.log(req, res, next);
  if (req.isAuthenticated()) {
    //console.log(req, res);
    next();
  } else {
    return res.status(401).send('Unauthenticated 1');
  }
};
