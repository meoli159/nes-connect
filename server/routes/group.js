const controller = require("../controllers/group.controller");
const router = require('express').Router();
const { checkGroup } = require("../middlewares");

router.post("/create", controller.createGroup)

router.post("/addUser",[
    checkGroup.checkDuplicateUser,
], controller.addUserToGroup)

router.post("/removeUser",[
    checkGroup.checkUserInGroup,
],controller.deleteUserToGroup)

module.exports = router;