const { authJwt } = require("../middlewares");
const {logout,login,register,updateUser} = require("../controllers/auth.controller");
const router = require('express').Router();


router.post("/register",register);
router.post("/login", login);
router.put("/",authJwt.verifyToken,updateUser)
router.post("/logout",authJwt.verifyToken,logout);




module.exports = router;
