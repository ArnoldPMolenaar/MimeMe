define([
    'jquery',
    'underscore',
    'backbone',
    'models/user',
    'text!templates/index.html',
    'bootstrap',
    'jquery.appear'
], function($, _, Backbone, UserModel, IndexTemplate){
    var indexView = Backbone.View.extend({
        el: $('#main'),
        initialize: function(){
            //check login status
            var cookieHandler = new CookieHandler();
            var userId = cookieHandler.readCookie('user-id')

            if(typeof userId != null && typeof userId != 'undefined'){
                $.get('includes/data/users.php?method=get&id=' + userId, function (getCallback) {
                    this.userModel = new UserModel();
                    this.userModel.id = getCallback.id;
                    this.userModel

                });
            }

            ///hier ben ik gebleven

            var data = {
                action: this.collection.models
            };

            this.template = _.template(IndexTemplate);
            $(this.$el).html(this.template);
        }
    });

    return indexView;
});