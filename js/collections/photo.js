//collection for all instagram data
define([
    'underscore',
    'backbone',
    'models/photo'
], function(_, Backbone, photoModel){
    var photoCollection = Backbone.Collection.extend({
        model: photoModel
    });

    return photoCollection;
});