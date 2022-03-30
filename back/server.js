var express = require('express');
var app = express ();

app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('helloword')
});

app.listen(8080), function () {
    console.log('server is listening');
}