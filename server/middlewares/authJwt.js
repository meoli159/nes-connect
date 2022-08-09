const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET
const User = require("../models/user");
const Role = require("../models/role");

//xác thực refesh token và tái tạo access token, dùng access token để xác nhận user
verifyToken = async(req, res, next) => {
  let token = req.headers['x-headers-token'];
  let cookie = req.cookies["jwt"];

  if (!token) {
    if (!cookie) {
      return res.status(403).send({ errors: "No cookie provided!" });
    }
    try {
    const reToken = jwt.verify(cookie, process.env.REFRESH_TOKEN_SECRET)
    const accessToken = jwt.sign({ id: reToken._id,username:reToken.username}, process.env.JWT_SECRET, {
      expiresIn: "10s"
    }); 
    const user = await User.findOne(accessToken.id)
    const {password, ...data} = await user.toJSON()
    res.send(data)
    } catch (error) {
      return res.status(403).send({ errors: "No Token provided!" });
    }

  } else {
    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(403).send({ errors: "Token verified" });
      } else {
   
        next();
      }
    });
  }
};

checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    //res.status(403).send({ message: "No token provided!" });
    res.locals.user = null;
    next();
  } else {
    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
      if (err) {
        //res.status(401).send({ message: "Unauthorized!" });
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decoded.id)
        res.locals.user = user;
        next();
      }
    });
  }
}

isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }
        res.status(403).send({ message: "Require Admin Role!" });
        return;
      }
    );
  });
};

isModerator = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "moderator") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Moderator Role!" });
        return;
      }
    );
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
  checkUser,
};

module.exports = authJwt;