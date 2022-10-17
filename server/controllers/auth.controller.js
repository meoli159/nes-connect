const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      username: user.username
    },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
};

const register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ message: "Please fill all information!" });

  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User already exists! Login Instead" });
  }

  const user = new User({
    username,
    email,
    password,
  });

  await user.save((err, user) => {
    if (err) {
      return res.status(500).send({ message: err });
    } else {
      res.status(200).json(user);
    }
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({email:email}).select("+password");

  if (user && (await user.matchPassword(password))) {
    //Token generate
    const accessToken = generateAccessToken(user);
    res.cookie("token",accessToken,{
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
    })
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      pic: user.pic,
    });
  } else {
    res.status(404).send({ message: "Invalid Email or Password!" });
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
      }
    }
    
    const updatedUser = await user.save();
    const accessToken = generateAccessToken(updatedUser);
    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      pic: updatedUser.pic,
      accessToken
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json("Logged out!");
};

//Reset password

module.exports = {
  generateAccessToken,
  updateUser,
  logout,
  login,
  register,
};
