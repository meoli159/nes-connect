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
  deleteUser,
};
