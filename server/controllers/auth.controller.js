const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Role = require("../models/role");

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

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  // Add new user
  const user = new User({
    username,
    email,
    password: hashedPassword,
  });

  user.save((err, user) => {
    if (err) {
      return res.status(500).send({ message: err });
    } else {
      console.log(user);
    }
    // check user role
    if (req.body.roles) {
      Role.find({ name: { $in: req.body.roles } }, (err, roles) => {
        if (err) {
          return res.status(500).send({ message: err });
        }
        user.roles = roles.map((role) => role._id);
        user.save((err) => {
          if (err) {
            return res.status(500).send({ message: err });
          }
          res.status(200).send(user);
        });
      });
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          return res.status(500).send({ message: err });
        }
        // Cho role của user là user
        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            return res.status(500).send({ message: err });
          }
          res.send(user);
        });
      });
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
    { expiresIn: "20s" }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      username: user.username,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "30d" }
  );
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email })
    .select("+password")
    .populate("roles", "-__v");

  if (!user) {
    return res.status(404).send({ message: "Invalid Email!" });
  }

  //check password
  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) {
    return res.status(404).send({ message: "Invalid Password!" });
  }
  if (user && passwordIsValid) {
    //check role
    var authorities = [];
    for (let i = 0; i < user.roles.length; i++) {
      authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
    }

    //Token generate
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
    });

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken,
    });
  }
};

const getUser = async (req, res) => {
  const userId = req._id;
  let user;
  try {
    user = await User.findById(userId, "-password");
  } catch (err) {
    return new Error(err);
  }
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json({ user });
};

const requestRefreshToken = async (req, res) => {
  const refreshToken = req.cookies["refreshToken"];
  if (!refreshToken)
    return res.status(401).json({ message: "You're not authenticated" });
  if (!refreshToken.includes(refreshToken)) {
    return res.status(403).json({message:"Refresh token is not valid"});
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
    }
    const newAccessToken = generateAccessToken(user);
    res.status(200).json({ accessToken: newAccessToken});
  });
};

const logout = async (req, res) => {
  res.clearCookie("refreshToken");
  res.status(200).json("Logged out!");
};

module.exports = {
  logout,
  login,
  register,
  getUser,
  requestRefreshToken,
};
