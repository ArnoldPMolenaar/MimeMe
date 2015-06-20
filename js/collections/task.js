//collection for all task models
define([
    'underscore',
    'backbone',
    'models/task'
], function(_, Backbone, taskModel){
    var taskCollection = Backbone.Collection.extend({
        model: taskModel
    });

    return taskCollection;
});