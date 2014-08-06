/* jshint expr:true */
/* global describe, it, before, beforeEach  */

'use strict';

var expect = require('chai').expect;
var Priority = require('../../app/models/priority');
var dbConnect = require('../../app/lib/mongodb');
var Mongo = require('mongodb');
var high, low;

describe('Priority', function(){
  before(function(done){
    dbConnect('priority-test', function(){
      done();
    });
  });
  
  beforeEach(function(done){
    Priority.collection.remove(function(){
      var o = {name: 'High', color: 'red', value: '10'};
      high = new Priority(o);
      var o1 = {name: 'Low', color: 'yellow', value: '1'};
      low = new Priority(o1);
      
      high.insert(function(){
        low.insert(function(){
          done();
        });
      });
    });
  });

  describe('constructor', function(){
    it('should create a new Priority object', function(){
      var o = {name: 'High', color: 'red', value: '10'};
      var high = new Priority(o);

      expect(high).to.be.instanceof(Priority);
      expect(high.name).to.equal('High');
      expect(high.color).to.equal('red');
      expect(high.value).to.equal(10);
    });
  });
  
 describe('#insert', function(){
  it('should insert a priority', function(done){
    var o = {name: 'High', color: 'red', value: '10'};
    high = new Priority(o);
    high.insert(function(){
      expect(high._id).to.be.instanceof(Mongo.ObjectID);  
      done();
    });
  });
 });

 describe('.all', function(){
  it('should get all priorities from database', function(done){
    Priority.all(function(priorities){
      expect(priorities).to.have.length(2);
      expect(priorities[0]).to.be.instanceof(Priority);
      done();
    });
  });
 });

 describe('.findById', function(){
  it('should find a priority by its id', function(done){
    Priority.findById(high._id.toString(), function(priority){
      expect(priority.name).to.equal('High');
      expect(priority).to.be.instanceof(Priority);
      done();
    });
  });
 });
  //Last braces
});
