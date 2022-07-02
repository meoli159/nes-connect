const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET
const db = require("../models");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

requireToken = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    res.redirect('/api/auth/login');
  } else {
    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
      if (err) {
        res.redirect('/api/auth/login');
      } else {
        next();
      }
    });
  }
}

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
  requireToken
};

module.exports = authJwt;