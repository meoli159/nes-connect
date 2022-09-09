const db = require("../models");
const User = db.user;
const Community = db.community;

// checkDuplicateUser = async(req, res, next) => {
//   try {
 
//     const currentCommunity = await Community.findOne({communityId: req.body.communityId})
    
//     console.log(currentCommunity)
//     next();
  
//   } catch (error) {
    
//   }
  
//   // Community.findOne({
//   //   communityName: req.body.communityName,
//   // }).exec((err, community) => {
//   //   if (err) {
//   //     res.status(500).send({ message: err });
//   //     return;
//   //   }
//   //   if (!community) {
//   //     communityName = req.body.communityName;
//   //     return res
//   //       .status(404)
//   //       .send({ message: "Community Not found.", communityName });
//   //   }

//   //   Community.findOne({
//   //     communityName: group.communityName,
//   //     users: { $in: user._id },
//   //   }).exec((err, duplicated) => {
//   //     if (err) {
//   //       res.status(500).send({ message: err });
//   //       return;
//   //     }
//   //     if (duplicated) {
//   //       username = req.body.username;
//   //       res.status(400).send({
//   //         message: "Failed! Username is already in group!",
//   //         username,
//   //       });
//   //       return;
//   //     }
//   //     next();
//   //   });
//   // });
// };

// checkUserInGroup = (req, res, next) => {
//   User.findOne({
//     username: req.body.username,
//   }).exec((err, user) => {
//     if (err) {
//       res.status(500).send({ message: err });
//       return;
//     }
//     if (!user) {
//       username = req.body.username;
//       return res.status(404).send({ message: "User Not found.", username });
//     }

//     Group.findOne({
//       groupName: req.body.groupName,
//     }).exec((err, group) => {
//       if (err) {
//         res.status(500).send({ message: err });
//         return;
//       }
//       if (!group) {
//         groupName = req.body.groupName;
//         return res.status(404).send({ message: "Group Not found.", groupName });
//       }

//       Group.findOne({
//         groupName: group.groupName,
//         users: { $in: user._id },
//       }).exec((err, duplicater) => {
//         if (err) {
//           res.status(500).send({ message: err });
//           return;
//         }
//         if (!duplicater) {
//           username = req.body.username;
//           res
//             .status(400)
//             .send({ message: "Failed! Username is NOT in group!", username });
//           return;
//         }
//         next();
//       });
//     });
//   });
// };

const checkCommunity = {
  // checkDuplicateUser,
  // checkUserInGroup,
};

module.exports = checkCommunity;
