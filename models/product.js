const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	price: {
		required: true,
		type: Number,
	},
	image: {
		type: String,
	},
	category: {
		type: String,
		required: true,
	},
});
const productModel = mongoose.model("products", productSchema);
module.exports = productModel;
