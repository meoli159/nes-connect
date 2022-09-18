const db = require("../models");
const { verifyToken } = require("./authJwt");
const Community = db.community;

isCommunityAdmin = async (req, res, next) => {
  Community.findById(req.params.communityId).exec((err, community) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    verifyToken(req, res, () => {
      if (req.user._id == community.communityAdmin._id) {
        next();
      } else {
        return res
          .status(403)
          .send({ message: "You Are NOT Allow To Do That!!" });
      }
    });
  });
};

checkCommunityAdminOrSameUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user._id === req.params.userId) {
      next();
    } else if (req.user._id !== req.params.userId) {
      checkCommunity.isCommunityAdmin(req, res, next);
    } else {
      return res
        .status(403)
        .send({ message: "You Are NOT Allow To Do That!!!" });
    }
  });
};

const checkCommunity = {
  isCommunityAdmin,
  checkCommunityAdminOrSameUser,
};

module.exports = checkCommunity;
