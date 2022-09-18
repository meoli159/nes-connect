const User = require("../models/user");

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
    const { userName ,password} = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.userId, 
      {$set:{
        userName: userName,
        password:password,
      }},
      {
      new: true,
      }
    );
    if (!user)
      return res.status(401).send({ message: "User Not Found" });
    else {
      res.json(user);
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params._id);
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
