const db = require("../models");
const User = db.user;
const Role = db.role;

// Xác thực với Jtw và bảo mật với bcrypt
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

//Đăng ký
exports.signup = (req, res) =>{
    // Add new user
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
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
};

// Đăng nhập
exports.login = (req, res) => {
    //check username
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
