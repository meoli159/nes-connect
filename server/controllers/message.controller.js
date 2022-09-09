const db = require("../models");
const User = db.user;
const Community = db.community;
const Message = db.message;

const fetchAllMessages = async (req, res) => {
  try {
    const messages = await Message.find({ community: req.params.communityId })
      .populate("sender")
      .populate("community")
      .lean()
      .exec();
    return res.status(200).send(messages);
  } catch (error) {
    return res.status(400).send(error.messages);
  }
};

const createMessage = async (req, res) => {
  const { content, communityId } = req.body;
  if (!content || !communityId) {
    console.log(communityId)
    return res
      .status(400)
      .send({ message: "Invalid data passed into request" });
  }

  const message = new Message({
    sender: req.user._id,
    content: content,
    communityId: communityId,
  });

  message.save(async(err, message) => {
    if (err) {
      return res.status(400).send({ message: err });
    } else {
     await Message.findOne({ _id: message._id })
        .populate("sender")
        .populate("community")
        .lean()
        .exec();
      return res.status(200).send(message);
    }
  });
};

module.exports = {
  fetchAllMessages,
  createMessage,
};
