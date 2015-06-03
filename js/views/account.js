define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/account.html'
], function($, _, Backbone, AccountTemplate){
    var accountView = Backbone.View.extend({
        el: $('#account-page'),
        initialize: function(){
            this.template = _.template(AccountTemplate);
            $(this.$el).html(this.template);
        }
    });

    return accountView;
});