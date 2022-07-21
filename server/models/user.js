const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 225
    },
    email:{
        type: String,
        sparse:true,
    },
    roles: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Role",
        },
      ]
},{
    timestamps: true
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
