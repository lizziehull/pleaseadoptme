const {User} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

// Generates a token for the user.
function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 *7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  // Registers a user. Returns error if email not unique.
  async register (req, res) {
    try {
      const user = await User.create(req.body)
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(400).send({
        error: 'Email account already in use. Please choose another!'
      })
    }   
  },
  // Allows a user to login. Returns error if login information incorrect.
  async login (req, res) {
    try {
      const {email, password} = req.body
      const user = await User.findOne({
        where: {
          email: email
        }
      })
      if (!user) {
        return res.status(403).send({
          error: 'Incorrect login information. Please try again!'
        })
      }
      const isPasswordValid = await user.comparePassword(password)
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'Incorrect login information. Please try again!'
        })
      }
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(500).send({
        error: 'Error when trying to login. Please try again!'
      })
    }  
  }
}
