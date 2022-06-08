const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type: 'string',
        unique: true,
        require: true,
    },
    email: {
        type: 'string',
        unique: true,
        require: true,
    },
    password:{
        type: 'string',
        require: true,
    },
    passwordConfirm: {
        type: 'string',
        require: true,
    }
});

const User = mongoose.model('User',UserSchema);
module.exports = User;