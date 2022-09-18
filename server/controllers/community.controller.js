const db = require("../models");
const User = db.user;
const Community = db.community;

const getCommunity = async (req, res) => {
  try {
    await Community.find({
      $or: [
        { communityAdmin: { $eq: req.user._id } },
        { users: { $elemMatch: { $eq: req.user._id } } },
      ],
    })
      .populate("users")
      .populate("communityAdmin")
      .then((results) => {
        res.status(200).send(results);
      });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const createCommunity = (req, res) => {
  if (!req.user) {
    return res.status(404).send({ message: "User Not found." });
  }
  const community = new Community({
    communityName: req.body.communityName,
    communityAdmin: req.user,
  });
  community.save((err, community) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    } else {
      res.status(200).send({
        communityId: community._id,
        communityName: community.communityName,
        communityAdmin: community.communityAdmin,
      });
    }
  });
};

//edit community
const renameCommunity = async (req, res) => {
  try {
    const { communityName,communityId } = req.body;
    const updatedCommunity = await Community.findByIdAndUpdate(
     communityId,
      {
        communityName: communityName,
      },
      {
        new: true,
      }
    )
      .populate("users")
      .populate("communityAdmin");
    if (!updatedCommunity)
      return res.status(401).send({ message: "Community Not Found" });
    else {
      res.json(updatedCommunity);
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

//delete community
const deleteCommunity = async (req, res) => {
  try {
    await Community.findByIdAndDelete(req.params.communityId);
    return res.status(200).send({ message: "Delete Successfully" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

//add user to community
const addUserToCommunity = async (req, res) => {
  try {
    const { userId } = req.body;
    const added = await Community.findByIdAndUpdate(
      req.params.communityId,
      {
        $addToSet: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate("users")
      .populate("communityAdmin");

    if (!added)
      return res.status(404).send({ message: "Community Not Found!!" });
    else {
      res.json(added);
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

//remove user from community
const removeUserFromCommunity = async (req, res) => {
  try {
    const { userId } = req.body;
    const removed = await Community.findByIdAndUpdate(
      req.params.communityId,
      {
        $pull: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate("users")
      .populate("communityAdmin");
    if (!removed)
      return res.status(404).send({ message: "Community Not Found!!" });
    else {
      res.json(removed);
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = {
  getCommunity,
  createCommunity,
  renameCommunity,
  deleteCommunity,
  addUserToCommunity,
  removeUserFromCommunity,
};