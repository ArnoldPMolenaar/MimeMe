define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/testimonial.html'
], function($, _, Backbone, TestimonialTemplate){
    var testimonialView = Backbone.View.extend({
        el: $('#testimonial-page'),
        initialize: function(){
            this.template = _.template(TestimonialTemplate);
            $(this.$el).html(this.template);
        }
    });

    return testimonialView;
});