const adminOnly = (req, res, next) => {
	const role = req.user && req.user.role;
	if (!role) {
		return res.status(401).json({
			success: false,
			msg: "Unauthorized! can't find user role",
		});
	}

	if (role !== "admin") {
		return res.status(403).json({
			success: false,
			msg: "Forbidden: admin only",
		});
	}

	next();
};

module.exports = adminOnly;
