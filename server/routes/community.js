const {getCommunity,createCommunity,renameCommunity,deleteCommunity,addUserToCommunity, removeUserFromCommunity} = require("../controllers/community.controller");
const { authJwt } = require("../middlewares");
const { checkCommunity } = require("../middlewares");
const router = require('express').Router();

router.get("/",authJwt.verifyToken,getCommunity)
router.post("/",authJwt.verifyToken, createCommunity)
router.put("/",authJwt.verifyToken,checkCommunity.isCommunityAdmin,renameCommunity);
router.delete("/:communityId",authJwt.verifyToken,checkCommunity.isCommunityAdmin,deleteCommunity);

router.put("/:communityId/adduser",authJwt.verifyToken,checkCommunity.isCommunityAdmin,addUserToCommunity);
router.put("/:communityId/removeuser",authJwt.verifyToken,checkCommunity.checkCommunityAdminOrSameUser,removeUserFromCommunity);

module.exports = router;