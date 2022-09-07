const db = require("../models");
const User = db.user;
const Group = db.group;
const Message = db.message;

const fetchAllMessages = async (req, res) => {
  try {
    const messages = await Message.find({ group: req.params.groupId })
      .populate("sender")
      .populate("group");
    return res.status(200).send(messages);
  } catch (error) {
    return res.status(400).send(error.messages);
  }
};

const createMessage = async (req, res) => {
  const { content, groupId } = req.body;
  if (!content || !groupId) {
    return res
      .status(400)
      .send({ message: "Invalid data passed into request" });
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    group: groupId,
  };
  try {
    var message = await Message.create(newMessage);
    message = await Message.findOne({ _id: message._id })
      .populate("sender")
      .populate("group");

    // let data = await groupId.findByIdAndUpdate(req.body.groupId, {
    //   latestMessage: message._id,
    // });

    return res.status(200).send(message);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  fetchAllMessages,
  createMessage,
};
