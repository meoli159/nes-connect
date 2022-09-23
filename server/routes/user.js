const { authJwt } = require("../middlewares");
const {getAllUser,deleteUser, updateUser} = require("../controllers/user.controller");
const router = require("express").Router();



router.get("/",authJwt.verifyToken, getAllUser);
router.put("/",authJwt.verifyToken,updateUser)
router.delete("/:userId",authJwt.verifyToken, deleteUser)


module.exports = router;
