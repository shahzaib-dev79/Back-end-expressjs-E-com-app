const userModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createUser = async (req, res) => {
	const { firstName, lastName, email, password } = req.body;
	const ifUserExist = userModel.findOne({ email });
	if (ifUserExist == true) {
		console.log(ifUserExist);
		return res.status(400).json({
			success: false,
			msg: "User already exist please use another email",
		});
	}
	const hashedPassword = await bcrypt.hash(password, 10);
	const token = jwt.sign(
		{ email, password, firstName, lastName },
		process.env.JWT_SECRET
	);
	const setUser = await userModel.create({
		firstName,
		lastName,
		email,
		password: hashedPassword,
	});
	res.status(200).json({
		success: true,
		setUser,
		msg: "User created successfully",
		token: token,
	});
};

module.exports = createUser;
