const mongoose = require("mongoose");

async function dbConnect() {
	mongoose
		.connect(process.env.MONGO_URI)
		.then(console.log("Conected to database successfully"))
		.catch((err) => console.log("Error occured", err));
}
module.exports = dbConnect;
