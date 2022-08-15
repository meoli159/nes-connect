const db = require("../models");
const User = db.user;
const Group = db.group;

checkDuplicateUser = (req, res, next) => {
    User.findOne({
        username: req.body.username,
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!user) {
            username = req.body.username;
            return res.status(404).send({ message: "User Not found.", username });
        }

        Group.findOne({
            groupName: req.body.groupName,
        }).exec((err, group)=>{
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!group) {
                groupName = req.body.groupName;
                return res.status(404).send({ message: "Group Not found.", groupName });
            }

            Group.findOne({
                groupName: group.groupName,
                users : {$in: user._id}
            }).exec((err, duplicater)=>{
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                if (duplicater) {
                    username = req.body.username;
                    res.status(400).send({ message: "Failed! Username is already in group!", username});
                    return;
                }
                next();
            })
        })
    })
};

checkUserInGroup = (req, res, next) => {
    User.findOne({
        username: req.body.username,
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!user) {
            username = req.body.username;
            return res.status(404).send({ message: "User Not found.", username });
        }

        Group.findOne({
            groupName: req.body.groupName,
        }).exec((err, group)=>{
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!group) {
                groupName = req.body.groupName;
                return res.status(404).send({ message: "Group Not found.", groupName });
            }

            Group.findOne({
                groupName: group.groupName,
                users : {$in: user._id}
            }).exec((err, duplicater)=>{
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                if (!duplicater) {
                    username = req.body.username;
                    res.status(400).send({ message: "Failed! Username is NOT in group!", username});
                    return;
                }
                next();
            })
        })
    })
};

const checkGroup = {
    checkDuplicateUser,
    checkUserInGroup
};

module.exports = checkGroup;