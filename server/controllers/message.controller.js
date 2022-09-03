const db = require("../models");
const User = db.user;
const Group = db.group;
const Message = db.message;

const fetchAllMessages = async (req, res) => {
  try {
    const messages = await Message.find({ group: req.params.groupId })
      .populate("sender")
      .populate("group")
      .lean()
      .exec();
      console.log(messages)
    return res.status(200).send(messages);
  } catch (error) {
    return res.status(400).send(error.messages);
  }
};

const createMessage = async(req,res)=>{
    const { content, groupId } = req.body;
    if (!content || !groupId) {
      return res.status(400).send("Invalid data passed into request");
    }
  
    var newMessage = {
      sender: req.user._id,
      content: content,
      group: groupId,
    };
    try {
      var message = await Message.create(newMessage);
      message = Message.findOne({ _id: message._id })
        .populate("sender")
        .populate("group")
        .lean()
        .exec();
      message = await User.populate(message, {
        path: "group.users",
       
      });
  
    //   let data = await Chat.findByIdAndUpdate(req.body.chatId, {
    //     latestMessage: message._id,
    //   });
  
      return res.status(200).send(message);
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

module.exports = {
  fetchAllMessages,
  createMessage
};
