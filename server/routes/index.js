const { verifyLogin, authJwt, verifyRegister } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const router = require('express').Router();
// const path = require('path');// For html view ( not for react)
const db  = require("../models");
const User = db.user;
const jwt = require('jsonwebtoken')




router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, X-Requested-With,Content-Type, Accept"
    );
    next();
});

//register
router.post("/register",
    [
        verifyRegister.checkDuplicateUsernameOrEmail,
        //verifySignUp.checkRolesExisted
    ],
    controller.register
);

// đăng nhập
router.post("/login", controller.login);

router.get('/user', [authJwt.verifyToken , authJwt.checkUser],() => {
    
})

// đăng xuất
router.post('/logout', (req, res) =>{
    // set tuổi cookie về 1mili giây
    res.cookie('jwt', '', { maxAge : 0 });
    res.send({message: 'success'})
});

module.exports = router;
