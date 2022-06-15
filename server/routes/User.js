const route = require('express').Router()
const User = require('../models/User')

route.get('/',(req,res) => res.send("User Route"))

route.post('/register',async (req,res)=>{
    //Create new user
    try{
        const user = new User (req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user,token})
    } 
    catch(error){
        res.status(400).send(error)
    }
}) 
 module.exports = route