const AuthenticationController = require('./controllers/AuthenticationController')
const StatusController = require('./controllers/StatusController')

const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')

module.exports = app => {
  app.get('/status', StatusController.status)

  app.post(
    '/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register
  )
}
