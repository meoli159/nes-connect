const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
    groupName : {
        type: String,
        required: true
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
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