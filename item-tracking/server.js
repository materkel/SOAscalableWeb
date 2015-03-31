'use strict';

var express = require('express');
var bodyParser = require('body-parser')
var auth = require('./auth');
var itemModel = require('./model');
var config = require('./config');
var app = module.exports = express();
var initItemID = 2;

var items = [
  {
    "name": "Johannas PC",
    "location": 0,
    "id": 0
  },
  {
    "name": "Johannas desk",
    "location": 0,
    "id": 1
  },
  {
    "name": "Lobby chair #1",
    "location": 1,
    "id": 2
  }
];

var addItem = function(item) {
  initItemID++
	item.id = initItemID;
  // validate and push item
	if (itemModel(item) && items.push(item)) {
		return item;
	}
}

var getItems = function() {
	return items;
}

var deleteItem = function(id) {
	var result = false;
	for (var i = 0; i<= items.length-1; i++) {
		var obj = items[i];
		if (parseInt(obj.id) === parseInt(id)) {
			items.splice(i,1);
			result = true;
			break;
		}
	}
	return result;
}

app.use(bodyParser.json());

app.get('/items', auth, function(req, res) {
	res.status(200).json(getItems());
});

app.post('/items', auth, function(req, res) {
	var item = req.body;
	var result = addItem(item);
	if (result) {
		res.status(201).json(result);
	} else {
		res.status(400).json("your JSON request was not valid");
	}
});

app.delete('/items/:id', auth, function(req, res) {
	var id = req.params.id;
	var result = deleteItem(id);
	if (result) {
		res.status(200).end();
	} else {
		res.status(404).end();
	}
});

app.listen(config.port);
