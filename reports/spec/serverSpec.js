'use strict';

var request = require('supertest');
var config = require('../config');
var app = require('../server');

var encode = function(username, password) {
	return new Buffer(username+":"+password).toString('base64')
}

var createdObjectID = null;

 // Specs for testing the /reports Server
 // If Node Environment is set to 'testing', the specs get tested without user authentication
 // change the environment to 'production' in the config file to test the Specs with authentication
 // remember to start up the user-management, location-management and item-tracking servers first

var username = 'wanda';
var password = 'partyhard2000';

describe('GET /reports/by-location', function(){
  it('should respond with 200 and the report in JSON array', function(done){
    request(app)
      .get('/reports/by-location')
      .set('Authorization', "Basic " + encode(username, password))
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(arrayResponseBody)
      .end(function(err, res){
        if (err) return done.fail(err);
        done()
      });

      function arrayResponseBody(res) {
        if (Object.prototype.toString.call(res.body) !== '[object Array]') {
          return 'did not respond with JSON array';
        };
        if (res.body.length >= 1 && !res.body[0].name) {
          return 'no key \"name\" in response body';
        }
        if (res.body.length >= 1 && !res.body[0].items) {
          return 'no key \"items\" in response body';
        }
      }
  })
})

// Testing Endpoint with wrong user + password, only gets called if not in 'testing' environment

if (config.environment !== 'testing') {

  var usernameFalse = 'falseUsername';
  var passwordFalse = 'falsePassword';

  describe('GET /reports/by-location with wrong username & password', function(){
    it('should respond with 403', function(done){
      request(app)
        .get('/reports/by-location')
        .set('Authorization', "Basic " + encode(usernameFalse, passwordFalse))
        .expect(403)
        .end(function(err, res){
          if (err) return done.fail(err);
          done()
        });
    })
  })
}
