const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

var cors = require('cors');

var corsOptions = {
	origin: process.env.HOST,
};

app.use(cors(corsOptions));

// importing the hateoas module
var hateoasLinker = require("express-hateoas-links");

app.use(hateoasLinker);

require('dotenv').config();



module.exports = app;