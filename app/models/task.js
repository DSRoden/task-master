'use strict';


var Mongo = require('mongodb');
var _ = require('lodash');

function Task(o){
  this.name = o.name;
  this.due = new Date(o.due);
  this.photo = o.photo;
  this.tags = [];
  this.priorityId = Mongo.ObjectID(o.priorityId);
}


Object.defineProperty(Task, 'collection', {
  get: function(){return global.mongodb.collection('tasks');}
});

Task.prototype.insert = function(cb){
  Task.collection.save(this, cb);
};


Task.prototype.cPriority = function(newId, cb){
  newId = Mongo.ObjectID(newId);
  this.priorityId = newId;
  
  Task.collection.update({_id:this._id},{priorityId: newId}, cb);
};

Task.all = function(cb){
  Task.collection.find().toArray(function(err, objects){
    var tasks = objects.map(function(o){
      return changePrototype(o);
    });

    cb(tasks);
  });
};

Task.sortByDate = function(cb){
  Task.collection.find().sort({'due': 1}).toArray(function(err, objects){
    var tasks = objects.map(function(o){
      return changePrototype(o);
    });
    cb(tasks);
  });
};

Task.filterTags = function(query, cb) {
  Task.collection.find({tags: {$in: [query]}}).toArray(function(err, objects){
     var tasks = objects.map(function(o){
      return changePrototype(o);
     });
     cb(tasks);
  });
};

module.exports = Task;

// PRIVATE HELPER FUNCTION

function changePrototype(obj){
  return _.create(Task.prototype, obj);
}

