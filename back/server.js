var express = require('express');

var app = express();

require('dotenv').config();

const models = require('./app/models');

app.get("/", (req, res) => {
	res.json({ message: "Welcome to Groupomania application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});