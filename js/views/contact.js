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

            //eventHandler init
            this.eventHandler = new EventHandler();
        },
        events : {
            'submit #contactForm': 'mailListener'
        },
        mailListener: function(e){
            e.preventDefault();
            this.eventHandler.mailListener();

            return false;
        }
    });

    return contactView;
});