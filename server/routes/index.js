const router = require('express').Router();

const { authJwt, verifyRegister } = require("../middlewares");
const authController = require("../controllers/auth.controller");

router.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.post("/register",authController.register);
router.post("/login", authController.login);
router.get("/user", authJwt.verifyToken);
router.post("/logout", (req, res) =>{
    
    res.clearCookie('jwt');
    res.status(200).json("Logged out successfully!");
});

module.exports = router;
