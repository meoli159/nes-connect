const User = require("../models/user");

const getAllUser = async(req,res)=>{
    try {
        const user = await User.find()
        res.status(200).json(user)
        return;
    } catch (error) {
        res.status(500).json(error)
        return;
    }
}

const deleteUser = async(req,res)=>{
    try {
        const user = await User.findByIdAndDelete(req.params.id)
       return res.status(200).json("Delete Successfully")
        
    } catch (error) {
      return  res.status(500).json(error)
      
    }
}
const test = (req,res)=>{
res.json('admin content')
}
module.exports ={
    getAllUser,
    deleteUser,
    test
}