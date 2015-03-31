'use strict'

var http = require('http');
var config = require('./config');
var authConfig = config.services.auth;

// auth client middleware, for user authentication with User-Management
var auth = module.exports = function(req, res, next) {
  if (config.environment === 'testing') {
    return next();
  } else {
    var options = {
        hostname: authConfig.hostname,
        port: authConfig.port,
        path: authConfig.path,
        headers: req.headers
    };
    http.get(options, function(getRes) {
      if (getRes.statusCode === 200) {
        next();
      } else {
        res.status(getRes.statusCode).end();
      }
    });
  }
}
