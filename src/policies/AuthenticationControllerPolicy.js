const Joi = require('joi')

// Define the valid user input for adding a user (registering) via the website.
module.exports = {
  register (req, res, next) {
    const schema = {
      email: Joi.string().email({ minDomainAtoms: 2 }),
      password: Joi.string().regex(new RegExp('^[a-zA-Z0-9]{8,32}$'))
    }

    const {error} = Joi.validate(req.body, schema)
    
    /* If an error has occurred, display the appropriate message according to
    which field has been entered incorrectly */
    if (error) {
      switch (error.details[0].context.key) {
        case 'email': 
          res.status(400).send({
            error: 'Please enter a valid email address'
          })
        break
        case 'password': 
          res.status(400).send({
            error: 'Password needs to be letters or numbers and be between 8 to 32 characters long.'
          })
        break
        default: 
          res.status(400).send({
            error: 'Error when registering. Please contact administrator.'
          })
        }
      }
      else {
        next()
      }     
  }
}
