
const {logout,login,register,updateUser} = require("../controllers/auth.controller");
const { verifyToken } = require("../middlewares/authJwt");
const router = require('express').Router();


router.post("/register",register);
router.post("/login", login);
router.put("/",verifyToken ,updateUser)
router.post("/logout",verifyToken,logout);




module.exports = router;
