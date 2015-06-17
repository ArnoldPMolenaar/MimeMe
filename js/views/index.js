define([
    'jquery',
    'underscore',
    'backbone',
    'models/user',
    'text!templates/index.html'
], function($, _, Backbone, UserModel, IndexTemplate){
    var indexView = Backbone.View.extend({
        el: $('#main'),
        initialize: function(){
            this.template = _.template(IndexTemplate);
            $(this.$el).html(this.template);
        },
        render: function(){
            //check login status
            var cookieHandler = new CookieHandler();
            var userId = cookieHandler.readCookie('user-id');
            var that = this;

            if(userId != null && userId != 'undefined' && userId != ""){
                $.get('includes/data/users.php?method=get&id=' + userId, function (getCallback) {
                    var object = JSON.parse(getCallback);
                    that.userModel = new UserModel();
                    that.userModel.attributes.id = object.id;
                    that.userModel.attributes.instagramUsername = object.instagramUsername;
                    that.userModel.attributes.instagramId = object.instagramId;
                    that.userModel.attributes.instagramPicture = object.instagramPicture;
                    that.userModel.attributes.instagramName = object.instagramName.replace('_', ' ');
                    that.userModel.attributes.password = object.password;
                    that.userModel.attributes.ranking = object.rank;

                    var data = {
                        userModel: that.userModel.attributes
                    };

                    that.template = _.template(IndexTemplate, data);
                    $(that.$el).html(that.template);

                    $('#destroy-account').on('click', function(){
                        if(confirm('Weet je zeker dat je wilt uitloggen?')){
                            var cookieHandler = new CookieHandler();
                            cookieHandler.eraseCookie('user-id');
                            location.reload();
                        }
                    });
                });
            }
        }
    });

    return indexView;
});