const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const router = require('express').Router();
const path = require('path');// For html view ( not for react)





router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

//register
router.get("/auth/register",(req,res)=>{
    //res.sendFile(path.join(__dirname, '../views', 'register.html'));
    res.render("register");
})

router.post(
    "/auth/register",
    [
        verifySignUp.checkDuplicateUsernameOrEmail,
        //verifySignUp.checkRolesExisted
    ],
    controller.register
);

// đăng nhập
router.get("/auth/login",(req,res)=>{
    //res.sendFile(path.join(__dirname, '../views', 'login.html'));
    res.render("login");
})

router.post("/auth/login", controller.login);

// đăng xuất
router.get('/auth/logout', function(req, res, next) {
    // set tuổi cookie về 1mili giây
    res.cookie('jwt', '', { maxAge : 1 });
    res.redirect('/');
});

module.exports = router;
