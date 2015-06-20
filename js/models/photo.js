//model for the instagram data (default settings)
define([
    'underscore',
    'backbone'
], function(_, Backbone){
    var photoModel = Backbone.Model.extend({
        defaults: {
            username: "",
            photo: "",
            likes: 0,
            locName: "",
            latitude: "",
            longitude: ""
        }
    });

    return photoModel;
});