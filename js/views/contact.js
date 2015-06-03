define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/contact.html'
], function($, _, Backbone, ContactTemplate){
    var contactView = Backbone.View.extend({
        el: $('#contact-page'),
        initialize: function(){
            this.template = _.template(ContactTemplate);
            $(this.$el).html(this.template);
        }
    });

    return contactView;
});