/* jshint expr:true */
/* global describe, it, before, beforeEach  */

'use strict';

var expect = require('chai').expect;
var Priority = require('../../app/models/priority');
var Task = require('../../app/models/task');
var dbConnect = require('../../app/lib/mongodb');
var Mongo = require('mongodb');

describe('Task', function(){
  it('should create a task constructor', function(){
    var o = {name:'jog', due: '01/01/2015', photo: 'http://www.nutripro.net/wp-content/uploads/2011/10/jogger.jpg'};
    var jog = new Task(o);

    expect(jog).to.be.instanceof(Task);
    expect(jog.name).to.equal('jog');
    expect(jog.due).to.be.instanceof(Date);
    expect(jog.photo).to.be.instanceof(String);
    expect(jog.tags).to.have.length(0);
  });

// Last Braces
});
