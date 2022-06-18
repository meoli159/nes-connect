const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = require('../models/userModel')

//Get
User.getUsers = asyncHandler(async(req,res)=>{
    const user = await User.find()
    if(user)
    {res.status(200).json(user)}
    else{
        res.status(400);
        throw new Error('No user found')
    }
})


//Post
 User.register = asyncHandler(async(req,res)=> {
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

    //Hash pw
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password,salt) 

    //Create user
    const user = await User.create({
        username,
        email,
        password:hashPassword,
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

User.login = asyncHandler(async(req,res)=>{
    const {email,password} = req.body
    const user = await User.findOne({email})
    if(user &&(await bcrypt.compare(password,user.password))){
        res.json({
            _id:user._id,
            username:user.username,
            email:user.email,
            password:user.password,
            token:generateToken(user._id),               
        })
    }
    else{
        res.status(400);
        throw new Error("Invalid user!")
    }
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    })
  }
  
module.exports = User
