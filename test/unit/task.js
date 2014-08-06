/* jshint expr:true */
/* global describe, it, before, beforeEach  */

'use strict';

var expect = require('chai').expect;
var Priority = require('../../app/models/priority');
var Task = require('../../app/models/task');
var dbConnect = require('../../app/lib/mongodb');
var Mongo = require('mongodb');

var high, low, jog, draw, write, compose, code, brainstorm, cycle, recycle;
var apriority = [];

describe('Task', function(){
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
  
  beforeEach(function(done){
    Task.collection.remove(function(){
    var o = {name:'jog', due: '01/06/2015', photo: 'http://www.nutripro.net/wp-content/uploads/2011/10/jogger.jpg'};
    var o1 = {name:'draw', due: '01/02/2015', photo: 'http://www.nutripro.net/wp-content/uploads/2011/10/jogger.jpg'};
    var o2 = {name:'write', due: '01/03/2015', photo: 'http://www.nutripro.net/wp-content/uploads/2011/10/jogger.jpg'};
    var o3 = {name:'compose', due: '01/04/2015', photo: 'http://www.nutripro.net/wp-content/uploads/2011/10/jogger.jpg'};
    var o4 = {name:'code', due: '01/05/2015', photo: 'http://www.nutripro.net/wp-content/uploads/2011/10/jogger.jpg'};
    var o5 = {name:'brainstorm', due: '01/01/2015', photo: 'http://www.nutripro.net/wp-content/uploads/2011/10/jogger.jpg'};
    var o6 = {name:'cycle', due: '01/07/2015', photo: 'http://www.nutripro.net/wp-content/uploads/2011/10/jogger.jpg'};
    var o7 = {name:'recycle', due: '01/08/2015', photo: 'http://www.nutripro.net/wp-content/uploads/2011/10/jogger.jpg'};
    jog = new Task(o);
    draw = new Task(o1);
    write = new Task(o2);
    compose = new Task(o3);
    code = new Task(o4);
    brainstorm = new Task(o5);
    cycle = new Task(o6);
    recycle = new Task(o7);
    
    jog.tags.push('exercise', 'outdoors');
    cycle.tags.push('exercise', 'outdoors');
    draw.tags.push('creative', 'visual');
    brainstorm.tags.push('visual', 'collaborative', 'creative');
    compose.tags.push('musical', 'creative');
    write.tags.push('literary', 'creative');
    code.tags.push('creative', 'innovation');
    recycle.tags.push('innovation');
      
    jog.insert(function(){
        draw.insert(function(){
          write.insert(function(){
            compose.insert(function(){
              code.insert(function(){
                brainstorm.insert(function(){
                  cycle.insert(function(){
                    recycle.insert(function(){
                      done();
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
 
 describe('constructor', function(){ 
  it('should create a task constructor', function(){
    var o = {name:'jog', due: '01/01/2015', photo: 'http://www.nutripro.net/wp-content/uploads/2011/10/jogger.jpg'};
    var jog = new Task(o);

    expect(jog).to.be.instanceof(Task);
    expect(jog.name).to.equal('jog');
    expect(jog.due).to.be.instanceof(Date);
    expect(jog.photo).to.be.a('string');
    expect(jog.tags).to.have.length(0);
  });
 });


 describe('#insert', function(){
  it('should insert a task', function(done){
    var o = {name:'jog', due: '01/01/2015', photo: 'http://www.nutripro.net/wp-content/uploads/2011/10/jogger.jpg'};
    var jog = new Task(o);
    jog.insert(function(){
      expect(jog._id).to.be.instanceof(Mongo.ObjectID);  
      done();
    });
  });
 });
 
 describe('#cPriority', function(){
   it('should find a priority and add it to task', function(done){
    apriority.push(high._id);
    console.log('This is the priority object\'s id ',apriority[0]);
      jog.cPriority(apriority[0], function(){
        expect(jog.priorityId).to.equal(apriority[0]);
        expect(jog.priorityId).to.be.instanceof(Mongo.ObjectID);
        console.log('This is the priorityId for the task object ', jog.priorityId);
        done();
      });
   });
 });

 describe('.all', function(){
  it('should find all tasks', function(done) {
    Task.all(function(tasks){
      expect(tasks).to.have.length(8);
      expect(tasks[0]).to.be.instanceof(Task);
      done();
    });
  });
 });

 describe('.sortByDate', function(){
  it('should sort tasks by due dates', function(done){
    Task.sortByDate(function(tasks){
      expect(tasks).to.have.length(8);
      expect(tasks[0]).to.be.instanceof(Task);
      expect(tasks[0].due).to.be.instanceof(Date);
      expect(brainstorm.due).to.be.instanceof(Date);
      //console.log(tasks);
      done();
    });
  });
 });

 describe('.filterTags', function(){
  it('should filter tasks by tag words', function(done){
    Task.filterTags('creative', function(tasks){
      expect(tasks).to.have.length(5);
      console.log(tasks);
      done();
    });
  });
 });



// Last Braces
});
