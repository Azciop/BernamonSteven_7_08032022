const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	try {
		// Making a const token to extract the token from the authorization,
		const token = req.headers.authorization.split(" ")[1];
		// then we verify if the token is the same as our random token secret
		const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
		// then we get the idUser from our token
		const idUser = decodedToken.idUser;
		req.auth = { idUser };
		// then we compare our idUser with our idUser from the token
		if (req.body.idUser && req.body.idUser !== idUser) {
			// if not the same idUser, throw an error, else, we use the next function to push our result
			throw "Invalid user ID";
		} else {
			next();
		}
	} catch {
		res.status(401).json({
			error: new Error("Invalid request!"),
		});
	}
};