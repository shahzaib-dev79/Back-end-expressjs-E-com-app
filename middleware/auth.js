const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
	const authHeader = req.headers && req.headers.authorization;
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return res.status(401).json({ success: false, msg: "Unauthorized" });
	}

	const token = authHeader.split(" ")[1];
	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		req.user = {
			firstName: payload.firstName,
			lastName: payload.lastName,
			email: payload.email,
			role: payload.role,
			id: payload.id,
		};
		next();
	} catch (error) {
		console.error("Error verifying token", error);
		return res.status(401).json({ success: false, msg: "Invalid token" });
	}
};

module.exports = auth;
