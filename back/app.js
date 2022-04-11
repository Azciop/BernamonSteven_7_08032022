const express = require('express');

const app = express();

require('dotenv').config();

var path = require('path');

const router = require("./app/routes/index");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

var cors = require('cors');

var corsOptions = {
	origin: process.env.ENDPOINT,
};

app.use(cors(corsOptions));

app.use("/images/", express.static(path.join(__dirname, "images")));

// importing the hateoas module
var hateoasLinker = require("express-hateoas-links");

app.use(hateoasLinker);

app.use("/api", router);

module.exports = app;