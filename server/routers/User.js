const router = require('express').Router()
const User = require('../models/User')

router.get('/users',(req,res) => res.send("User Router"))

router.post('/users', async (req,res)=>{
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
 module.exports = router