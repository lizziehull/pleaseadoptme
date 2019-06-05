const passport = require('passport')

// Use Passport and JWT to authenticate the user.
module.exports = function (req, res, next) {
  passport.authenticate('jwt', function (err, user) {
    if (err || !user) {
      res.status(403).send({
        error: 'Unauthorised access.'
      })
    } else {
      req.user = user
      next()
    }
  }) (req, res, next)
}
