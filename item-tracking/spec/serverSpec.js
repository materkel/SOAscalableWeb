'use strict';

var request = require('supertest');
var config = require('../config');
var app = require('../server');

var encode = function(username, password) {
	return new Buffer(username+":"+password).toString('base64')
}

var createdObjectID = null;


 // Specs for testing the /items Server
 // If node environment is set to 'testing', the specs get tested without user authentication
 // change environment to 'production' in the config file to test the Specs with authentication
 // remember to start up the user-management server first

var username = "wanda";
var password = "partyhard2000";

describe('GET /items', function(){
  it('should respond with 200 and the items in JSON array', function(done){
    request(app)
      .get('/items')
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

describe('POST an item to /items', function(){
  it('should respond with 201 and the created Object in JSON', function(done){
    request(app)
      .post('/items')
      .set('Authorization', "Basic " + encode(username, password))
      .set('Accept', 'application/json')
      .send({ "name": "Office Salzburg",
              "location": 1 })
      .expect(201)
      .expect(createdObject)
      .end(function(err, res){
        if (err) return done.fail(err);
        createdObjectID = res.body.id
        done()
      });

      function createdObject(res) {
        if (!('name' in res.body)) return "missing name key in response object";
        if (!('location' in res.body)) return "missing location key in response object";
        if (!('id' in res.body)) return "missing id key in response object";
      }
  })
})

describe('DELETE an existing item at /items/:id', function(){
  it('should respond with 200', function(done){
    request(app)
      .delete('/items/'+createdObjectID)
      .set('Authorization', "Basic " + encode(username, password))
      .expect(200)
      .end(function(err, res){
        if (err) return done.fail(err);
        done()
      });
  })
})

describe('DELETE a non existing item at /items/:id', function(){
  it('should respond with 404', function(done){
    request(app)
      .delete('/items/'+20)
      .set('Authorization', "Basic " + encode(username, password))
      .expect(404)
      .end(function(err, res){
        if (err) return done.fail(err);
        done()
      });
  })
})

 // Testing Endpoints with wrong user + password, only gets called if not in 'testing' environment

if (config.environment !== 'testing') {

  var usernameFalse = "falseUsername";
  var passwordFalse = "falsePassword";

  describe('GET /items with wrong username & password', function(){
    it('should respond with 403', function(done){
      request(app)
        .get('/items')
        .set('Authorization', "Basic " + encode(usernameFalse, passwordFalse))
        .expect(403)
        .end(function(err, res){
          if (err) return done.fail(err);
          done()
        });
    })
  })

  describe('POST an item to /items with wrong username & password', function(){
    it('should respond with 403', function(done){
      request(app)
        .post('/items')
        .set('Authorization', "Basic " + encode(usernameFalse, passwordFalse))
        .set('Accept', 'application/json')
        .send({ "name": "Office Salzburg",
              "location": 1 })
        .expect(403)
        .end(function(err, res){
          if (err) return done.fail(err);
          done()
        });
    })
  })

  describe('DELETE an existing location at /items/:id with wrong username and password', function(){
    it('should respond with 403', function(done){
      request(app)
        .delete('/items/'+createdObjectID)
        .set('Authorization', "Basic " + encode(usernameFalse, passwordFalse))
        .expect(403)
        .end(function(err, res){
          if (err) return done.fail(err);
          done()
        });
    })
  })
}
