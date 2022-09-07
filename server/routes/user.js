const { authJwt } = require("../middlewares");
const {getAllUser,deleteUser, test} = require("../controllers/user.controller");
const router = require("express").Router();



router.get("/",authJwt.verifyToken, getAllUser);
router.delete("/:_id",authJwt.verifyTokenAndAdminAuth, deleteUser)


module.exports = router;
