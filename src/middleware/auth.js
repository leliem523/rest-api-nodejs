const jwt = require('jsonwebtoken');

exports.authentication = (req, res, next) => {
	const token = req.header('token');
	console.log(token);
	if (!token) {
		return res.status(401).json({
			status: false,
			message: 'Ban chua cap quyen truy cap !!'
		});
	}
	jwt.verify(token, 'liemTest', (err, user) => {
		if (err) {
			return res.status(500).json({
				status: false,
				message: 'Ban khong duoc quyen truy cap !!'
			});
		}
		req.user = user;
		console.log('user verify', user);
		next();
	});
};
