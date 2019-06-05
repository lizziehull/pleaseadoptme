const Joi = require('joi')

// Define the valid user input for adding an animal via the website.
module.exports = {
  post (req, res, next) {
    const schema = {
      name: Joi.string().regex(
        new RegExp('^[a-zA-Z ]{1,15}$')
      ),
      species: Joi.string().regex(
        new RegExp('^[a-zA-Z ]{1,20}$')
      ),
      breed: Joi.string().regex(
        new RegExp('^[a-zA-Z ]{1,32}$')
      ),
      age: Joi.string().regex(
        new RegExp('^[0-9]{1,3}$')
      ),
      location: Joi.string().regex(
        new RegExp('^[a-zA-Z ]{1,20}$')
      ),
      shelter: Joi.string().regex(
        new RegExp('^[a-zA-Z ]{1,30}$')
      ),
      contact: Joi.string().email({ minDomainAtoms: 2 }),
      description: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9,:;.?! ]{10,400}$')
      ),
      imageURL: Joi.string().uri()
    }

    const {error} = Joi.validate(req.body, schema)

    /* If an error has occurred, display the appropriate message according to
    which field has been entered incorrectly */
    if (error) {
      switch (error.details[0].context.key) {
        case 'name': 
          res.status(400).send({
            error: 'Please enter a valid name - alphabetic characters and spaces up to 15 characters long.'
          })
        break
        case 'species': 
          res.status(400).send({
            error: 'Please enter a valid species - alphabetic characters and spaces up to 20 characters long.'
          })
        break
        case 'breed': 
          res.status(400).send({
            error: 'Please enter a valid breed - alphabetic characters and spaces up to 32 characters long.'
          })
        break
        case 'age': 
          res.status(400).send({
            error: 'Please enter a valid age in years between 0 and 999.'
          })
        break
        case 'location': 
          res.status(400).send({
            error: 'Please enter a valid location - alphabetic characters and spaces up to 20 characters long.'
          })
        break
        case 'shelter': 
        res.status(400).send({
          error: 'Please enter a valid shelter name - alphabetic characters and spaces up to 20 characters long.'
        })
        break
        case 'contact': 
        res.status(400).send({
          error: 'Please enter a valid email address for your shelter.'
        })
        break
        case 'description': 
          res.status(400).send({
            error: 'Please enter a valid description - alphanumeric characters and spaces from 10 to 400 characters long. Sorry, no apostrophes or speech marks!'
          })
        break
        case 'imageURL': 
          res.status(400).send({
            error: 'Please enter a valid link starting with http:// or https://'
          })
        break
        default: 
          res.status(400).send({
            error: 'Error when uploading an animal. Please contact administrator.'
          })
        }
      } else {
        next()
      }     
  }
}
