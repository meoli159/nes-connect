const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET
const db = require("../models");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
  //let token = req.headers["x-auth-token"];
  let token = req.cookies.jwt;

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  try {
    const userId = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
    const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: "10s"
    });
    res.json({ accessToken})
  } catch (error) {
    return res.status(403).send({ errors: "Invalid token" });
  }
};

requireToken = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    res.redirect('/api/login');
  } else {
    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
      if (err) {
        res.redirect('/api/login');
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