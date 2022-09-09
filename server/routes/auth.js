const { authJwt } = require("../middlewares");
const {logout,login,register, requestRefreshToken} = require("../controllers/auth.controller");
const router = require('express').Router();


router.post("/register",register);
router.post("/login", login);
router.post("/logout",authJwt.verifyToken,logout);

router.post("/refresh",requestRefreshToken)



module.exports = router;
