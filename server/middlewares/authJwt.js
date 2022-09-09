const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Role = require("../models/role");

verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (token) {
    const accessToken = token.split(" ")[1];
    jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json("Invalid Token" );
      }
      req.user = user;
      next();
    });
  } else return res.status(401).json("You're not authenticated" );
};

isAdmin = (req, res, next) => {
  User.findById(req.user.id).exec((err, user) => {
    if (err) {
      res.status(500).send(err );
      return;
    }
    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send(err );
          return;
        }
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }
        res.status(403).send("Require Admin Role!" );
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

verifyTokenAndAdminAuth = (req, res, next) => {
  authJwt.verifyToken(req, res, () => {
    if (req.user.id !== req.params.id) {
      authJwt.isAdmin(req, res,next);
    } else {
      if (req.user.id === req.params.id) {
        next();
      } else {
        return res.status(403).json("You are not allowed to do that");
      }
    }
  });
};
const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
  verifyTokenAndAdminAuth,
};

module.exports = authJwt;
