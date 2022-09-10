const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.user = require("./user");
db.role = require("./role");
db.community = require("./community");
db.message = require("./message");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
