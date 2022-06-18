const routes = require('express').Router()

const authController = require('../controllers/authController')

routes.get('/',authController.getUsers)
routes.post('/login',authController.login)
routes.post('/register',authController.register)


module.exports = routes