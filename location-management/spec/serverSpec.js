'use strict';

var request = require('supertest');
var config = require('../config');
var app = require('../server');

var encode = function(username, password) {
	return new Buffer(username+":"+password).toString('base64')
}

var createdObjectID = null;

 // Specs for testing the /locations Server
 // If node environment is set to 'testing', the specs get tested without user authentication
 // change environment to 'production' in the config file to test the Specs with authentication
 // remember to start up the user-management server first

var username = "wanda";
var password = "partyhard2000";

describe('GET /locations', function(){
  it('should respond with 200 and the locations in JSON array', function(done){
    request(app)
      .get('/locations')
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
          return "did not respond with JSON array";
        };
      }
  })
})

describe('POST a location to /locations', function(){
  it('should respond with 200 and the created Object in JSON', function(done){
    request(app)
      .post('/locations')
      .set('Authorization', "Basic " + encode(username, password))
      .set('Accept', 'application/json')
      .send({ "name": "Office Salzburg",
              "address": "Puch Urstein 3-5, Puch, Austria" })
      .expect(201)
      .expect(createdObject)
      .end(function(err, res){
        if (err) return done.fail(err);
        createdObjectID = res.body.id
        done()
      });

      function createdObject(res) {
        if (!('name' in res.body)) return "missing name key in response object";
        if (!('address' in res.body)) return "missing address key in response object";
        if (!('id' in res.body)) return "missing id key in response object";
      }
  })
})

describe('DELETE a existing location at /locations/:id', function(){
  it('should respond with 200', function(done){
    request(app)
      .delete('/locations/'+createdObjectID)
      .set('Authorization', "Basic " + encode(username, password))
      .expect(200)
      .end(function(err, res){
        if (err) return done.fail(err);
        done()
      });
  })
})

describe('DELETE a non existing location at /locations/:id', function(){
  it('should respond with 404', function(done){
    request(app)
      .delete('/locations/'+20)
      .set('Authorization', "Basic " + encode(username, password))
      .expect(404)
      .end(function(err, res){
        if (err) return done.fail(err);
        done()
      });
  })
})

/**
 * Testing Endpoints with wrong user + password, only gets called if not in 'testing' environment
 */

if (config.environment !== 'testing') {

  var usernameFalse = "falseUsername";
  var passwordFalse = "falsePassword";

  describe('GET /locations with wrong username & password', function(){
    it('should respond with 403', function(done){
      request(app)
        .get('/locations')
        .set('Authorization', "Basic " + encode(usernameFalse, passwordFalse))
        .expect(403)
        .end(function(err, res){
          if (err) return done.fail(err);
          done()
        });
    })
  })

  describe('POST a location to /locations with wrong username & password', function(){
    it('should respond with 403', function(done){
      request(app)
        .post('/locations')
        .set('Authorization', "Basic " + encode(usernameFalse, passwordFalse))
        .set('Accept', 'application/json')
        .send({ "name": "Office Salzburg",
                "address": "Puch Urstein 3-5, Puch, Austria" })
        .expect(403)
        .end(function(err, res){
          if (err) return done.fail(err);
          done()
        });
    })
  })

  describe('DELETE an existing location at /locations/:id with wrong username and password', function(){
    it('should respond with 403', function(done){
      request(app)
        .delete('/locations/'+createdObjectID)
        .set('Authorization', "Basic " + encode(usernameFalse, passwordFalse))
        .expect(403)
        .end(function(err, res){
          if (err) return done.fail(err);
          done()
        });
    })
  })
}
