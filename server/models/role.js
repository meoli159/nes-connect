const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    title:{
        type: String
    }
},);

const Role = mongoose.model('Role', RoleSchema);

<<<<<<< HEAD
module.exports = Role;
=======
module.exports = Role;
>>>>>>> 75f626329b0862781b67d00b055aeaf7fe522bac
