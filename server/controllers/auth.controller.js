const asyncHandler = require('express-async-handler')
const db = require("../models");
const User = db.user;
const Role = db.role;

// Xác thực với Jtw và bảo mật với bcrypt
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

//Đăng ký
exports.signup = asyncHandler(async(req, res) =>{
    const {username,email,password} = req.body;

    
    // Add new user
    const user = new User({
        username,
        email,
        password: bcrypt.hashSync( password, 10),
    });
    
    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        else{
            console.log(user)
        }
        // check user có role chưa
        if (req.body.roles) {
            Role.find(
              {
                title: { $in: req.body.roles }
              },
              (err, roles) => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }
                //Chuyển role sang role id
                user.roles = roles.map(role => role._id);
                user.save(err => {
                  if (err) {
                    res.status(500).send({ message: err });
                    return;
                  }
      
                  res.send(user);
                });
              }
            );
            } 
            // nếu user chưa có role
            else {
                // check có role user trong collection roles hay ko
                Role.findOne({ name: "user" }, (err, role) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    // Cho role của user là user
                    user.roles = [role._id]; //No role found
                    user.save(err => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }
                        res.send(user);
                    });
                });
            }
    });
    //chuyển link về home
    //res.redirect("/")
});

// Đăng nhập
exports.login = (req, res) => {
    //check email
    User.findOne({
      email: req.body.email
    })
      .populate("roles", "-__v")
      .exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
  
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        
        //check password
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
  
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }
        
        // tạo token
        var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: 86400 // 24 hours
        });
        
        res.cookie('jwt', token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true}) // httpOnly ko cho truy cập từ front end

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
            accessToken: token
        });
    });
};

exports.initial = (req, res) => {
    // connect success create collection in database
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
}