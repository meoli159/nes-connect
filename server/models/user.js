const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 5,
        max: 50
    },
    password: {
        type: String,
        required: true,
        select:false,
        min: 5,
        max: 225
    },
    email:{
        type: String,
        required:true,
        unique:true,
    },
    pic:{
        type: String,
        default:"https://icon-library.com/images/no-user-image-icon/no-user-image-icon-23.jpg",
    },
},{
    timestamps: true
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
