const adminOnly = (req, res, next) => {
	const role = res.user.role;
	if (!role || res.user.role) {
		return res.status(401).json({
			success: false,
			msg: "Unauthorized! can't find user role",
		});
	}
	if (!role === "admin") {
		return res.status(403).json({
			success: false,
			msg: "Unauthorized! only user can do this ",
		});
	}
	next();
};

module.exports = adminOnly;
