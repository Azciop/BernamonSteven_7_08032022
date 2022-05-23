var express = require('express');
var path = require('path');

var app = express();

require('dotenv').config();

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

const db = require('./app/models/');

db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and re-sync db.");
});

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});