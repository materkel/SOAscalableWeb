'use strict';

var express = require('express');
var bodyParser = require('body-parser')
var auth = require('./auth');
var locationModel = require('./model');
var config = require('./config');
var app = module.exports = express();
var initLocationID = 2;

var locations = [
  {
    "name": "Office Alexanderstraße",
    "address": "Alexanderstraße 45, 33853 Bielefeld, Germany",
    "id": 0
  },
  {
    "name": "Warehouse Hamburg",
    "address": "Gewerbestraße 1, 21035 Hamburg, Germany",
    "id": 1
  },
  {
    "name": "Headquarters Salzburg",
    "address": "Mozart Gasserl 4, 13371 Salzburg, Austria",
    "id": 2
  }
];

var addLocation = function(location) {
  initLocationID++;
	location.id = initLocationID;
  // validate and push location
	if (locationModel(location) && locations.push(location)) {
		return location;
	}
}

var getLocations = function() {
	return locations;
}

var deleteLocation = function(id) {
	var result = false;
	for (var i = 0; i<= locations.length-1; i++) {
		var obj = locations[i];
		if (parseInt(obj.id) === parseInt(id)) {
			locations.splice(i,1);
			result = true;
			break;
		}
	}
	return result;
}

app.use(bodyParser.json());

app.get('/locations', auth, function(req, res) {
	res.status(200).json(getLocations());
});

app.post('/locations', auth, function(req, res) {
	var location = req.body;
	var result = addLocation(location);
	if (result) {
		res.status(201).json(result);
	} else {
		res.status(400).json("some error");
	}
});

app.delete('/locations/:id', auth, function(req, res) {
	var id = req.params.id;
	var result = deleteLocation(id);
	if (result) {
		res.status(200).end();
	} else {
		res.status(404).end();
	}
});

app.listen(config.port);
