const db = require("../models");
const User = db.user;
const Group = db.group;

exports.fetchChats = async (req, res) => {
  try {
    await Group.find({
      $or: [
        { groupAdmin: { $eq: req.user._id } },
        { users: { $elemMatch: { $eq: req.user._id } } },
      ],
    })
      .populate("users")
      .populate("groupAdmin")
      .then((results) => {
        res.status(200).send(results);
      });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

exports.createGroup = (req, res) => {
  User.findOne({
    user: req.user,
  }).exec((err) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!req.user) {
      return res.status(404).send({ message: "User Not found." });
    }
    console.log(req.user);
    const group = new Group({
      groupName: req.body.groupName,
      groupAdmin: req.user,
    });
    group.save((err, group) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      } else {
        console.log(group);
        res.status(200).send({
          groupId: group._id,
          groupName: group.groupName,
          groupAdmin: group.groupAdmin,
        });
      }
    });
  });
};



exports.addUserToGroup = (req, res) => {
  Group.findOne({
    groupName: req.body.groupName,
  }).exec((err, group) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    User.findOne({
      username: req.body.username,
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      //add new userid to end of users list in group
      group.users.push(user._id);

      group.save((err, group) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        } else {
          res.status(200).send({
            adminId: group.admin,
            groupId: group._id,
            userId: group.users,
          });
        }
      });
    });
  });
};

exports.deleteUserToGroup = (req, res) => {
  Group.findOne({
    groupName: req.body.groupName,
  }).exec((err, group) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!group) {
      groupName = req.body.groupName;
      return res.status(404).send({ message: "Group Not found.", groupName });
    }
    User.findOne({
      username: req.body.username,
    }).exec(function (err, user) {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        username = req.body.username;
        return res.status(404).send({ message: "User Not found.", username });
      }
      //find location of user in users list
      const index = group.users.indexOf(user._id);
      //remove that user
      if (index >= 0) {
        group.users.splice(index, 1);
      }

      group.save((err, group) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        } else {
          res.status(200).send({
            adminId: group.admin,
            groupId: group._id,
            userId: group.users,
          });
        }
      });
    });
  });
};
