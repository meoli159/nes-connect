const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    title:{
        type: String
    }
},);

const Role = mongoose.model('Role', RoleSchema);

module.exports = Role;