'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var auth = require('./auth'); // user management auth client middleware
var config = require('./config');
var app = module.exports = express();

app.use(bodyParser.json());

// location service client middleware function
// GET request for location data
var getLocations = function(req, res, next) {
  var options = {
        hostname: config.services.locations.hostname,
        port: config.services.locations.port,
        path: config.services.locations.path,
        headers: req.headers
  };
  http.get(options, function(httpRes) {
    if (res.statusCode === 200) {
      var locations = '';
      httpRes.on('data', function(chunk){
        locations += chunk;
      });
      httpRes.on('end', function() {
        req.body.locations = JSON.parse(locations);
        next();
      });
    } else {
      res.status(httpRes.statusCode).end();
    }
  });
}

// item-service client, basially same as locations client
// GET request for item data
var getItems = function(req, res, next) {
  var options = {
        hostname: config.services.items.hostname,
        port: config.services.items.port,
        path: config.services.items.path,
        headers: req.headers
  };
  http.get(options, function(httpRes) {
      if (httpRes.statusCode === 200) {
        var items = '';
        httpRes.on('data', function(chunk){
          items += chunk;
        });
        httpRes.on('end', function() {
          req.body.items = JSON.parse(items);
          next();
        });
      } else {
        res.status(httpRes.statusCode).end();
      }
    });
};

// middleware for creating a report out of locations and items
var getReportByLocation = function(req, res, next) {
  // initiatlize "items" key for locations as empty array
  req.body.locations.map(function(location, index, locations) {
    locations[index].items = [];
  });
  // add items to their respective locations
  var itemCount = req.body.items.length;
  for (var i=0; i<itemCount; i++) {
    req.body.locations.map(function(location, index, locations) {
      if (req.body.items[i].location === location.id) {
        locations[index].items.push(req.body.items[i]);
      }
    });
  }
  req.body.report = req.body.locations;
  next();
};

// Report Route, use auth, getLocations, getItems and getReport middleware functions
app.get('/reports/by-location', auth, getLocations, getItems, getReportByLocation, function(req, res) {
    res.status(200).json(req.body.report);
});

app.listen(config.port);
