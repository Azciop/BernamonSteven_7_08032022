const http = require('http');
var express = require('express');

var app = express();

require('dotenv').config();

const db = require('./app/models/');

app.get("/", (req, res) => {
	res.json({ message: "Welcome to Groupomania application." });
});

db.sequelize.sync({ force: true }).then(() => {
	console.log("Drop and re-sync db.");
});
const server = http.createServer(app);
// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});