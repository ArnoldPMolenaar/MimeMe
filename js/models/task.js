//model for the tasks (default settings)
define([
    'underscore',
    'backbone'
], function(_, Backbone){
    var taskModel = Backbone.Model.extend({
        defaults: {
            id: "",
            accountid: "",
            title: "",
            description: "",
            hashtag: "",
            votes: 0
        }
    });

    return taskModel;
});