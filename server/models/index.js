const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.user = require("./user");
db.role = require("./role");

db.ROLES = ["user", "admin", "moderator"];

<<<<<<< HEAD
module.exports = db;
=======
module.exports = db;
>>>>>>> 75f626329b0862781b67d00b055aeaf7fe522bac
