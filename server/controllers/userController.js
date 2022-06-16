const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const User = require('../models/userModel')


 User.registerUser = asyncHandler(async(req,res)=> {
    const {username,email,password} = req.body;

    if(!username||!email||!password){
        res.status(400);
        throw new Error('Please enter all the fields');
    }

    //Check user if exist
    const userExists = await User.findOne({email})
    if (userExists){
        res.status(400);
        throw new Error('User already exist')
    }

    //Create user
    const user = await User.create({
        username,
        email,
        password,
    })

    if(user){
        res.status(200).json({
            _id:user._id,
            username:user.username,
            email:user.email,
            password:user.password,
            token:generateToken(user._id),
        })
    }
    else{
        res.status(400);
        throw new Error("Fail to create user!")
    }
}) 

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    })
  }
module.exports = User
