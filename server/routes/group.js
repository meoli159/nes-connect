const controller = require("../controllers/group.controller");
const { authJwt } = require("../middlewares");
const { checkGroup } = require("../middlewares");
const router = require('express').Router();

router.get("/",authJwt.verifyToken,controller.fetchChats)
router.post("/",authJwt.verifyToken, controller.createGroup)

router.post("/addUser",[
    checkGroup.checkDuplicateUser,
], controller.addUserToGroup)

router.post("/removeUser",[
    checkGroup.checkUserInGroup,
],controller.deleteUserToGroup)

module.exports = router;