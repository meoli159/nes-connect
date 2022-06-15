const routes = require('express').Router()
const config = require('../database/DBconnect')

const userController = require('../controllers/User')

routes.get('/users',(req,res,next)=>userController.getUser(req,res,next))

module.exports = routes