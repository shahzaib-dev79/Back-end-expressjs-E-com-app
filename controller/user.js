const userModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
	try {
		const { firstName, lastName, email, password } = req.body;

		const ifUserExist = await userModel.findOne({ email });

		if (ifUserExist) {
			return res.status(400).json({
				success: false,
				msg: "User already exist, please use another email",
			});
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const setUser = await userModel.create({
			firstName,
			lastName,
			email,
			password: hashedPassword,
		});

		// SECURITY: Only include safe data (like ID and email) in the JWT
		const token = jwt.sign(
			{ email: setUser.email, id: setUser._id },
			process.env.JWT_SECRET,
			{ expiresIn: "1h" } // Good practice to set an expiration
		);

		// SECURITY: Remove password from the response object
		const userResponse = setUser.toObject();
		delete userResponse.password;

		res.status(200).json({
			success: true,
			user: userResponse,
			msg: "User created successfully",
			token: token,
		});
	} catch (error) {
		console.error(error); // Log the error for debugging
		res.status(500).json({
			success: false,
			msg: "An error occurred during registration.",
		});
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		// FIX 1: Added 'await'
		const ifUserExist = await userModel.findOne({ email });

		if (!ifUserExist) {
			return res.status(404).json({
				success: false,
				msg: "Invalid credentials.",
			});
		}

		const isPasswordMatched = await bcrypt.compare(
			password,
			ifUserExist.password
		);

		if (!isPasswordMatched) {
			return res.status(401).json({
				success: false,
				msg: "Invalid credentials.",
			});
		}
		const token = jwt.sign(
			{ email: ifUserExist.email, id: ifUserExist._id },
			process.env.JWT_SECRET,
			{ expiresIn: "1h" }
		);

		res.status(200).json({
			success: true,
			msg: "User logged in successfully",
			token,
		});
	} catch (error) {
		console.error(error); // Log the error for debugging
		res.status(500).json({
			success: false,
			msg: "An error occurred during login.",
		});
	}
};

module.exports = { createUser, login };
