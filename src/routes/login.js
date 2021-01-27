const { Router } = require("express");
const passport = require('passport');

const router = Router();

app.post('/login', (req, res) => {
  if (req.user) {
    return;
  }

  passport.authenticate("local", (err, user) => {
    if (err) {
      return res.json({
        meta: {
          error: true,
          message: err.message
        }
      });
    }
    if (!user) {
      // all failed logins default to the same error message
      return res.json({
        meta: {
          error: true,
          message: "Bad credentials"
        }
      });
    }
    req.logIn(user, err => {
      if (err) {
        return res.json({
          meta: {
            error: true,
            message: err
          }
        });
      }
      return res.json({
        meta: {
          error: false
        },
        user: utils.cleanUser(Object.assign({}, user))
      });
    });
  })(req, res);
});

module.exports = router;
