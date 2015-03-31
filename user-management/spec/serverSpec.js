'use strict'

var request = require('supertest');
var app = require('../server');

var encode = function(username, password) {
	return new Buffer(username+":"+password).toString('base64')
}

describe('GET /user with User: Hello, Password: World', function(){
  it('respond with 403', function(done){
    request(app)
      .get('/user')
      .set('Authorization', "Basic " + encode("Hello", "World"))
      .expect(403)
      .end(function(err, res){
        if (err) return done.fail(err);
        done()
      });
  })
})

describe('GET /user with User: wanda, Password: failpassword', function(){
  it('respond with 403', function(done){
    request(app)
      .get('/user')
      .set('Authorization', "Basic " + encode("wanda", "failpassword"))
      .expect(403)
      .end(function(err, res){
        if (err) return done.fail(err);
        done()
      });
  })
})

describe('GET /user with User: wanda, password: partyhard2000', function(){
  it('respond with 200', function(done){
    request(app)
      .get('/user')
      .set('Authorization', "Basic " + encode("wanda", "partyhard2000"))
      .expect(200)
      .end(function(err, res){
        if (err) return done.fail(err);
        done()
      });
  })
})

describe('GET /user with User: anne, password: flytothemoon', function(){
  it('respond with 200', function(done){
    request(app)
      .get('/user')
      .set('Authorization', "Basic " + encode("anne","flytothemoon"))
      .expect(200)
      .end(function(err, res){
        if (err) return done.fail(err);
        done()
      });
  })
})
