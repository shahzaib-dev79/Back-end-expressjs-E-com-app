const jwt = require("jsonwebtoken");
const auth = async (req, res, next) => {
	const authHeader = res.header.authorization;
	if (!authHeader || !authHeader.startswith("Bearer")) {
		throw new console.error("Unautherized User");
	}
	const token = authHeader.split(" ", [1]);
	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		res.user = {
			firstName: payload.firstName,
			lastName: payload.lastName,
			email: payload.email,
			password: payload.password,
			role: payload.role,
		};
		next();
	} catch (error) {
		console.log("Error occured in creating Payload", error);
	}
};
module.exports = auth;
