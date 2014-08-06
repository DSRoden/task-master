'use strict';

function Task(o){
  this.name = o.name;
  this.due = new Date(o.due);
  this.photo = o.photo;
  this.priorityId = Mongo.ObjectID(o.priorityId)
}

module.exports = Task;
