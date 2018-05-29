//app.js
var express = require('express'),
	consign = require('consign'),
	bodyParser = require('body-parser'),
	expressValidator = require('express-validator'),
	mongoose = require('mongoose'),
	app = express();
	
app.validator = require('validator');

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:1337');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(expressValidator());

consign({cwd: 'app'}).include('config').include('models').include('controllers').include('routes').into(app);

app.listen(3000, () => console.log('App started!'));