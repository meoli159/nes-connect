const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ message: "Please fill all information!" });

  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists! Login Instead" });
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  // Add new user
  const user = new User({
    username,
    email,
    password: hashedPassword,
  });

  await user.save((err, user) => {
    if (err) {
      return res.status(500).send({ message: err });
    } else {
      console.log(user);
    }
  });
};

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email }).select("+password");

  if (!user) {
    return res.status(404).send({ message: "Invalid Email!" });
  }

  //check password
  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) {
    return res.status(404).send({ message: "Invalid Password!" });
  }
  if (user && passwordIsValid) {
    //Token generate
    const accessToken = generateAccessToken(user);
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      pic:user.pic,
      accessToken,
    });
  }
};

const logout = async (req, res) => {
  // res.clearCookie("refreshToken");
  res.status(200).json("Logged out!");
};

module.exports = {
  logout,
  login,
  register,
};
