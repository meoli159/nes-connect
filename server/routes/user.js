const { authJwt } = require("../middlewares");
const { searchUser, deleteUser } = require("../controllers/user.controller");
const router = require("express").Router();

router.get("/", authJwt.verifyToken, searchUser);

router.delete("/:userId", authJwt.verifyToken, deleteUser);

module.exports = router;
