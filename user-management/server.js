'use strict';

var express = require('express');
var app = module.exports = express();
var config = require('./config');

var users = [
	{ "name": "wanda", "password": "partyhard2000" },
	{ "name": "paul", "password": "thepanther" },
	{ "name": "anne", "password": "flytothemoon" }
];

var findUser = function(username, password) {
	var result = false;
	for (var i = 0; i<= users.length-1; i++) {
		var obj = users[i];
		if (obj.hasOwnProperty("name") && obj.name === username && obj.password === password) {
			result = true;
			break;
		}
	}
	return result;
}
// authorization middleware for basic auth
app.use(function(req, res, next) {
	var auth;
    if (req.headers.authorization) {
      auth = new Buffer(req.headers.authorization.substring(6), 'base64').toString().split(':');
    }
    if (!auth || !findUser(auth[0], auth[1])) {
        res.setHeader('WWW-Authenticate', 'Basic realm="User Service"');
        res.status(403).send('Unauthorized');
    } else {
        next();
    }
});

app.get('/user', function(req, res) {
	res.status(200).send('Authenticated');
});

app.listen(config.port);
