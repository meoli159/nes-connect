const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
<<<<<<< HEAD
const router = require('express').Router();
const path = require('path');// For html view( not for react)




=======
const express = require('express');
const path = require('path');

const router = express.Router();

// chuyển user.body sang json bằng body parser
router.use(express.json());
router.use(express.urlencoded());
>>>>>>> 75f626329b0862781b67d00b055aeaf7fe522bac

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

//đăng ký
router.get("/auth/signup",(req,res)=>{
    res.sendFile(path.join(__dirname, '../views', 'signup.html'));
    //res.render("signup");
})

router.post(
    "/auth/signup",
    [
        verifySignUp.checkDuplicateUsernameOrEmail,
        //verifySignUp.checkRolesExisted
    ],
    controller.signup
);

// đăng nhập
router.get("/auth/login",(req,res)=>{
    res.sendFile(path.join(__dirname, '../views', 'login.html'));
    //res.render("signin");
})

router.post("/auth/login", controller.login);

// đăng xuất
router.get('/auth/logout', function(req, res, next) {
    // set tuổi cookie về 1mili giây
    res.cookie('jwt', '', { maxAge : 1 });
    res.redirect('/');
});

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> 75f626329b0862781b67d00b055aeaf7fe522bac
