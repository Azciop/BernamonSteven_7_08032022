// Importing bcrypt to hash passwords
const bcrypt = require("bcrypt");

// Importing jwt to make tokens
const jwt = require("jsonwebtoken");

// Importing the models
const { User } = require("../models");

// importing the dotenv file
require("dotenv").config();

const CryptoJS = require("crypto-js");

const fs = require("fs");

// Making a function to encrypt the email
function encryptEmail(email) {
	return CryptoJS.AES.encrypt(
		email,
		CryptoJS.enc.Base64.parse(process.env.PASSPHRASE),
		{
			iv: CryptoJS.enc.Base64.parse(process.env.IV),
			mode: CryptoJS.mode.ECB,
			padding: CryptoJS.pad.Pkcs7,
		}
	).toString();
}

// Making a function to decrypt the email
function decryptEmail(email) {
	var bytes = CryptoJS.AES.decrypt(
		email,
		CryptoJS.enc.Base64.parse(process.env.PASSPHRASE),
		{
			iv: CryptoJS.enc.Base64.parse(process.env.IV),
			mode: CryptoJS.mode.ECB,
			padding: CryptoJS.pad.Pkcs7,
		}
	);
	return bytes.toString(CryptoJS.enc.Utf8);
}

function emailValidator(email) {
	const reg =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return reg.test(String(email).toLowerCase());
}

// making the signup function
exports.signup = (req, res, next) => {
	if (!emailValidator(req.body.email)) {
		return res.status(400).json({ error: "invalid email" });
	}
	// making the email encrypting function
	bcrypt
		.hash(req.body.password, 10)
		.then(hash => {
			// we get the encrypted email and we creat the user object
			const emailEncrypted = encryptEmail(req.body.email);
			const userObject = {
				...req.body,
				email: emailEncrypted,
				password: hash,
			};
			User.create(userObject, { raw: true })
				.then(newUser => {
					// we get the email to send it to the hateoas
					newUser = newUser.toJSON();
					newUser.email = decryptEmail(newUser.email);
					res.status(201).json(newUser, hateoasLinks(req, newUser.id));
				})
				.catch(error => console.log(error));
		})
		.catch(error => res.status(500).json(console.log(error)));
};

// making the login function
exports.login = (req, res, next) => {
	// we get the encrypted email
	const emailCryptoJS = encryptEmail(req.body.email);
	// using findOne to find the user
	User.findOne({ email: emailCryptoJS, raw: true })
		.then(user => {
			if (!user) {
				return res.status(401).json({ error: " User not found !" });
			}
			bcrypt
				// checking if the two passwords matches. If not, send error message
				.compare(req.body.password, user.password)
				.then(valid => {
					if (!valid) {
						return res.status(401).json({ error: "Wrong password !" });
					}
					res.status(200).json(
						{
							// if passwords matches, create random secret token for a duration of 24h, and log in
							idUser: user.id,
							token: jwt.sign({ idUser: user.id }, process.env.RANDOM_TOKEN_SECRET, {
								expiresIn: "24h",
							}),
						},
						hateoasLinks(req, user.id)
					);
				})
				.catch(error => res.status(500).json({ error }));
		})
		.catch(error => res.status(500).json({ error }));
};

// we make a function to update an user
exports.updateUser = async (req, res, next) => {
	User.findByPk( req.auth.idUser)
		.then( async (user) => {
			if (req.body.password) {
				// Hashing the password
				const hash = await bcrypt.hash(req.body.password, 10);
				//changing the password
				req.body.password = hash;
			}
			// Making the email change
			if (req.body.email) {
				if (!emailValidator(req.body.email)) {
					return res.status(400).json({ error: "invalid email" });
				}
				// changing the  email
				req.body.email = encryptEmail(req.body.email);
			}
			// if user not found, send error message
			if (!user) {
				return res.status(404).json({ error: "User not found !" });
			}
			// else, sending the confirmation message and update the user's infos
			User.update(req.body, {where : {id : user.id}, plain:true, returning: true})
			.then(async(newUser) => { 
				await user.reload()
				user.email = decryptEmail(user.email)
				res
				.status(200)
				.json(
					 user ,
					hateoasLinks(req, newUser.id)
				);
			})
			.catch()
		})
		.catch(error => console.log(error));
};

exports.deleteUser = (req, res) => {
	User.findByPk(req.auth.idUser)
	.then(user => {
		// if (req.body.idUser == req.auth.idUser)
			user
				.destroy({
					where: {
						id: req.auth.idUser,
					},
				})
				.then(() =>
					res.status(204).send())
				.catch(error => res.status(501).json(error));
			})
};

exports.readUser = (req, res) => {
	User.findByPk(req.auth.idUser)
	.then(user => {
		if (!user) {
			return res.status(404).json({ error: "User not found!" });
		}
		user.email = decryptEmail(user.email);
			// send user infos as json
			res.status(200).json(user, hateoasLinks(req, user.id));
		})
		.catch(error => {
			res.status(404).send(console.log(error));
		});
};

exports.exportUser = (req, res) => {
	User.findByPk(req.auth.idUser)
	.then (user => {
		if (!user) {
			return res.status(404).json({ error: "User not found !" });
		}
		user.email = decryptEmail(user.email);
		// stringify user infos as txt file
		const string = user.toString();
		res.attachment("data.txt");
		res.type("txt");
		// send text file to user
		return res.status(200).send(string);
	});
};


// HATEOAS Links

function hateoasLinks(req, id) {
	const baseUri = `${req.protocol}://${req.get("host")}`;

	return [
		{
			rel: "signup",
			method: "POST",
			title: "Create an user",
			href: baseUri + "/api/auth/signup",
		},
		{
			rel: "login",
			method: "POST",
			title: "Login an user",
			href: baseUri + "/api/auth/login",
		},
		{
			rel: "read",
			method: "GET",
			title: "Read user's data",
			href: baseUri + "/api/auth/read",
		},
		{
			rel: "export",
			method: "GET",
			title: "Export user's data",
			href: baseUri + "/api/auth/export",
		},
		{
			rel: "update",
			method: "PUT",
			title: "Update user's data",
			href: baseUri + "/api/auth/",
		},
		{
			rel: "delete",
			method: "DELETE",
			title: "Delete user's data",
			href: baseUri + "/api/auth/",
		},
		{
			rel: "report",
			method: "POST",
			title: "Report a user",
			href: baseUri + "/api/auth/report/" + id,
		},
	];
}
