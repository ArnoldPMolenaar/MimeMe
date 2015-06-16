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
                    this.userModel = new UserModel();
                    this.userModel.attributes.id = object.id;
                    this.userModel.attributes.instagramUsername = object.instagramUsername;
                    this.userModel.attributes.instagramId = object.instagramId;
                    this.userModel.attributes.instagramPicture = object.instagramPicture;
                    this.userModel.attributes.instagramName = object.instagramName.replace('_', ' ');
                    this.userModel.attributes.password = object.password;
                    this.userModel.attributes.ranking = object.rank;

                    var data = {
                        userModel: this.userModel.attributes
                    };

                    this.template = _.template(IndexTemplate, data);
                    $(that.$el).html(this.template);

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