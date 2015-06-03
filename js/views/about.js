define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/about.html'
], function($, _, Backbone, AboutTemplate){
    var aboutView = Backbone.View.extend({
        el: $('#about-page'),
        initialize: function(){
            this.template = _.template(AboutTemplate);
            $(this.$el).html(this.template);
        }
    });

    return aboutView;
});