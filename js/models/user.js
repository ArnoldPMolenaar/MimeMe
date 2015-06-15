//model for the user {default settings}
define([
    'underscore',
    'backbone'
], function(_, Backbone){
    var userModel = Backbone.Model.extend({
        defaults: {
            id: "",
            instagramUsername: "",
            instagramId: 0,
            instagramPicture: "",
            instagramName: "",
            password: "",
            ranking: ""
        }
    });

    return userModel;
});