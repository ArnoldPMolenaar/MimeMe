define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/tasks.html'
], function($, _, Backbone, TasksTemplate){
    var tasksView = Backbone.View.extend({
        el: $('#tasks-page'),
        initialize: function(){
            this.template = _.template(TasksTemplate);
            $(this.$el).html(this.template);
        }
    });

    return tasksView;
});