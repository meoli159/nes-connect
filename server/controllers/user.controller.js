const User = require("../models/user");
const bcrypt = require("bcrypt");

const getAllUser = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
    return;
  } catch (error) {
    res.status(500).json(error.message);
    return;
  }
};

const updateUser = async (req, res) => {
  try {
    const { username, oldPassword, password } = req.body;
    const user = await User.findById(req.user._id).select("+password");

    if (user) {
      user.username = username || user.username;
      
      if (password) {
        const passwordValid = await user.matchPassword(oldPassword,user.password);
        if (!passwordValid) {
          return res.status(400).send({message:"Please enter correct old password"});
        } 
          user.password = password || user.password;
          console.log(passwordValid)
      }
    }
  
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      pic: updatedUser.pic
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    return res.status(200).json({ message: "Delete Successfully" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  getAllUser,
  updateUser,
  deleteUser,
};
