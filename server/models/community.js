const mongoose = require("mongoose");

const CommunitySchema = new mongoose.Schema(
  {
    communityName: {
      type: String,
      required: true,
    },
    communityAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Community = mongoose.model("Community", CommunitySchema);

module.exports = Community;
