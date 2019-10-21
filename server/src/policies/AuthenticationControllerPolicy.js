const Joi = require('joi')
const PasswordComplexity = require('joi-password-complexity')

module.exports = {
  register(req, res, next) {
    const schema = {
      email: Joi.string().email(),
      password: new PasswordComplexity()
    }

    const { error, value } = Joi.validate(req.body, schema)

    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'You must provide a valid email address'
          })
          break
        case 'password':
          res.status(400).send({
            error: `The password provided failed to match the following rules:
                <br>
                1. Must only contain the folowing characters: lower case, upper case, numbers
                <br>
                2. It must be between 8 and 32 characters in length.`
          })
          break
        default:
      }
    } else {
      console.log('Validation passed.')
      next()
    }
  }
}
