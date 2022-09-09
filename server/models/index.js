const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.user = require("./user");
db.role = require("./role");
db.group = require("./group");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
