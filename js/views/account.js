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
            var eventHandler = new EventHandler();
            eventHandler.registerAccount();
            eventHandler.loginAccount();
        }
    });

    return accountView;
});