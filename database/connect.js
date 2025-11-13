const mongoose = require("mongoose");

async function dbConnect() {
	try {
		await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("Connected to database successfully");
	} catch (err) {
		console.error("Error connecting to database:", err);
		// Rethrow so application can decide how to handle startup failure
		throw err;
	}
}

module.exports = dbConnect;
