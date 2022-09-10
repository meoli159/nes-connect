const {getCommunity,createCommunity,renameCommunity,addUserToCommunity, removeUserFromCommunity} = require("../controllers/community.controller");
const { authJwt } = require("../middlewares");
const { checkCommunity } = require("../middlewares");
const router = require('express').Router();

router.get("/",authJwt.verifyToken,getCommunity)
router.post("/",authJwt.verifyToken, createCommunity)
router.put("/rename",authJwt.verifyToken,renameCommunity)
// router.delete("/:groupId",authJwt.verifyToken,deleteCommunity);

router.put("/adduser",authJwt.verifyToken,addUserToCommunity)
router.put("/removeuser",authJwt.verifyToken,removeUserFromCommunity)

module.exports = router;