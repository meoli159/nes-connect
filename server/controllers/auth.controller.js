const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/user");
const Role = require("../models/role");



exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  let existingUser = await User.findOne({ email: email });
  
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
      res.status(500).send({ message: err });
      return;
    } else {
      console.log(user);
    }
    // check user role
    if (req.body.roles) {
      Role.find({ title: { $in: req.body.roles } }, (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        user.roles = roles.map((role) => role._id);
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          res.status(200).send(user);
        });
      });
    } else {
      Role.findOne({ title: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        // Cho role của user là user
        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          res.send(user);
        });
      });
    }
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email })
  .populate("roles", "-__v")

  if (!user) {
    return res.status(404).send({ message: "User Not found." });
  }

  //check password
  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) {
    return res.status(401).send({
      message: "Invalid Password!",
    });
  }

  //Token generate
  const accessToken = jwt.sign(
    { id: user._id,username:user.username},
    process.env.JWT_SECRET,
    { expiresIn: "10s" }
  );
  const refreshToken = jwt.sign(
    { id: user._id,username:user.username},
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "365d" }
  );
  
  res.cookie("jwt", refreshToken, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
    secure:false, //set true when deploy
  })

  //check role
  var authorities = [];
  for (let i = 0; i < user.roles.length; i++) {
    authorities.push("ROLE_" + user.roles[i].title.toUpperCase());
  }
  res.status(200).send({
    id: user._id,
    username: user.username,
    email: user.email,
    roles: authorities,
    accessToken: accessToken,
    status: true,
  });
};


//Add role to DB
exports.initial = (req, res) => {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        title: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });

      new Role({
        title: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'moderator' to roles collection");
      });

      new Role({
        title: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
};
