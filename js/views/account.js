define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/account.html'
], function($, _, Backbone, AccountTemplate){
    var accountView = Backbone.View.extend({
        el: $('#account-page'),
        template: _.template(AccountTemplate),
        initialize: function(){
            $(this.$el).html(this.template);

            //setup submit events
            this.eventHandler = new EventHandler();
        },
        events: {
            'submit #registerForm': 'registerAccount',
            'submit #loginForm': 'loginAccount'
        },
        registerAccount: function(e){
            e.preventDefault();
            this.eventHandler.registerAccount();

            return false;
        },
        loginAccount: function(e){
            e.preventDefault();
            this.eventHandler.loginAccount();

            return false;
        }
    });

    return accountView;
});