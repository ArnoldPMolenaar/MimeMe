//collection for all user models
define([
    'underscore',
    'backbone',
    'models/user'
], function(_, Backbone, userModel){
    var userCollection = Backbone.Collection.extend({
        model: userModel,
        url: 'includes/data/users.php?method=get'
    });

    return userCollection;
});