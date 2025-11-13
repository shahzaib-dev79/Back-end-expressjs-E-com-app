const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
	},
	email: {
		unique: true,
		type: String,
		required: true,
	},
	password: {
		required: true,
		type: String,
		minlength: 8,
	},
	role: {
		type: String,
		enum: ["admin", "client"],
		default: "client",
		required: true,
	},
});
const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
