const db = require("../models");
const User = db.user;
const Group = db.group;

exports.createGroup = (req, res) => {
    User.findOne({
        username: req.body.username
    })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            const group = new Group({
                groupName: req.body.groupName,
                admin : user._id
            });

            group.save((err, group) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                else{
                    console.log(group)
                    res.status(200).send({
                        groupName: group.groupName,
                        adminId: group.admin,
                        groupId: group._id
                    });
                }
            });
            
    });
}

exports.addUserToGroup = (req, res) => {
    Group.findOne({
        groupName: req.body.groupName
    })
        .exec((err, group) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            User.findOne({
                username: req.body.username
            })
                .exec((err, user) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                //add new userid to end of users list in group
                group.users.push(user._id)
                
                group.save((err, group) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    else{
                        res.status(200).send({
                            adminId: group.admin,
                            groupId: group._id,
                            userId: group.users
                        });
                    }
                });
        });
    });
}

exports.deleteUserToGroup = (req, res) => {
    Group.findOne({
        groupName: req.body.groupName
    })
        .exec((err, group) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!group) {
                groupName = req.body.groupName;
                return res.status(404).send({ message: "Group Not found.", groupName });
            }
            User.findOne({
                username: req.body.username
            })
                .exec(function(err, user)  {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    if (!user) {
                        username = req.body.username;
                        return res.status(404).send({ message: "User Not found.", username });
                    }
                    //find location of user in users list
                    const index = group.users.indexOf(user._id)
                    //remove that user
                    if (index>=0){
                        group.users.splice(index, 1)
                    }

                    group.save((err, group) => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }
                        else{
                            res.status(200).send({
                                adminId: group.admin,
                                groupId: group._id,
                                userId: group.users
                            });
                        }
                    });        
                })
        });
}