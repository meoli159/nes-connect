const {fetchAllMessages, createMessage} = require("../controllers/message.controller");
const { authJwt } = require("../middlewares");
const router = require('express').Router();

router.get("/:groupId",authJwt.verifyToken,fetchAllMessages);
router.post("/",authJwt.verifyToken,createMessage);
module.exports = router;