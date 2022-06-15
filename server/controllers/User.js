const User = require('../models/User')

User.getUser = async (req,res,next)=>{
    res.send('List of user')
}

module.exports = User