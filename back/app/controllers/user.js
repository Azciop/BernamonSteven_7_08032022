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
			User
				.create(userObject, {raw:true})
				.then(newUser => {
					// we get the email to send it to the hateoas
					newUser = newUser.toJSON();
					newUser.email = decryptEmail(newUser.email);
					res
						.status(201)
						.json(
							newUser, hateoasLinks(req, newUser._id)
						);
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
	User.findOne({ email: emailCryptoJS, raw:true })
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
							token: jwt.sign({ idUser: user.id }, "RANDOM_TOKEN_SECRET", {
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
exports.updateUser = (req, res, next) => {
	User.findByPk(req.auth.idUser)
	.then(user => {
		console.log(user)
		// si je renseigne un password alors je le hash et je le met dans req.body.password
		// si je renseigne un email alors je l'encrypt et je le met dans req.body.email
		// si j'ai un avatar alors je met son url dans req.body.url
		// si j'avais deja un avatar et que j'en met un nouveau, je l'unlink pour mettre le nouveau
		// faire l'update avec le req.body et je renvoie mon nouveau user avec les hateoas
	})
}

// deleteUser
// readUser
// exportData
// reportUser
// readUserByUserName

// include 

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

