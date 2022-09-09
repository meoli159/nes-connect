const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
    groupName : {
        type: String,
        required: true
    },
    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    users: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ]
},{
    timestamps: true
});

const Group = mongoose.model('Group', GroupSchema);

module.exports = Group;