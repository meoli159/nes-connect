const { authJwt } = require("../middlewares");
const {getAllUser,deleteUser} = require("../controllers/user.controller");
const router = require("express").Router();



router.get("/",authJwt.verifyToken, getAllUser);
router.delete("/:_id",authJwt.verifyToken, deleteUser)


module.exports = router;
