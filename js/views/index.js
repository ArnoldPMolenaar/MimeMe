define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/index.html',
    'bootstrap',
    'jquery.appear'
], function($, _, Backbone, IndexTemplate){
    var indexView = Backbone.View.extend({
        el: $('#main'),
        initialize: function(){
            this.template = _.template(IndexTemplate);
            $(this.$el).html(this.template);
        }
    });

    return indexView;
});