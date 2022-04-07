// Importing bcrypt to hash passwords
const bcrypt = require("bcrypt");

// Importing jwt to make tokens
const jwt = require("jsonwebtoken");

// Importing the models
const User = require("../models/user");

// importing the dotenv file
const dotenv = require("dotenv");
const result = dotenv.config();
require("dotenv").config();

const CryptoJS = require("crypto-js");

const fs = require("fs");

// Importing express
var express = require("express");
var app = express();

// Importing hateoas module
var hateoasLinker = require("express-hateoas-links");
const user = require("../models/user");

// replace standard express res.json with the new version
app.use(hateoasLinker);

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
			const user = new User({
				email: emailEncrypted,
				password: hash,
				firstName: req.body.firstName,
				lastName: req.body.lastName,
			});
			user
				.save()
				.then(result => {
					// we get the email to send it to the hateoas
					result.email = req.body.email;
					res
						.status(201)
						.json(
							{ message: " User Created !", data: result },
							hateoasLinks(req, result._id)
						);
				})
				.catch(error => res.status(400).json({ error }));
		})
		.catch(error => res.status(500).json(console.log(error)));
};

// making the login function
exports.login = (req, res, next) => {
	// we get the encrypted email
	const emailCryptoJS = encryptEmail(req.body.email);
	// using findOne to find the user
	User.findOne({ email: emailCryptoJS })
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
							// if passwords matches, creat random secret token for a duration of 24h, and log in
							idUser: user._id,
							token: jwt.sign({ idUser: user._id }, "RANDOM_TOKEN_SECRET", {
								expiresIn: "24h",
							}),
						},
						hateoasLinks(req, user._id)
					);
				})
				.catch(error => res.status(500).json({ error }));
		})
		.catch(error => res.status(500).json({ error }));
};

// we make a function to update an user
exports.updateUser = (req, res, next) => {
	// Using the findOne method to find the user
	user
		.findOne({ _id: req.params.id })
		.then(user => {
			if (req.auth.idUser !== user.idUser) {
				return res
					.status(403)
					.json({ message: "Access denied. You can't change someone else infos" });
			}
			// we make a const to find the image we want to delete in case of a image change
			const filename = user.profilPicture.split("/images/")[1];
			if (req.file) {
				// we make a object that contains the new values and the new image
				const userObject = {
					...JSON.parse(req.body.user),
					profilPicture: `/images/${req.file.filename}`,
				};
				// We use the unlink method to delete the old image
				fs.unlink(`images/${filename}`, () => {
					// using the updateOne function to update the values if the image has been modified
					user.updateOne(
						{ _id: req.params.id },
						{ ...userObject, _id: req.params.id }
					)
						// then we send the message
						.then(user =>
							res
								.status(200)
								.json(
									{ message: "Your user has been modified", data: user },
									hateoasLinks(req, user._id)
								)
						)
						.catch(error => res.status(400).json({ error }));
				});
			} else {
				// else, we just update the new values without changing the image
				user.updateOne(
					{ _id: req.params.id },
					{ ...req.body, _id: req.params.id }
				)
					// then, we send the message
					.then(user =>
						res
							.status(200)
							.json(
								{ message: "Your user has been modified", data: user },
								hateoasLinks(req, user._id)
							)
					)
					.catch(error => res.status(400).json({ error }));
			}
		})
		.catch(error => res.status(500).json({ error }));
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

