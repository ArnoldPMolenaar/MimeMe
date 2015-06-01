define([
    'jquery',
    'underscore',
    'backbone',
    'modernizr',
    'bootstrap'
], function($, _, Backbone){
    var AppRouter = Backbone.Router.extend({
        routes:{
            //default rout URL
            '*actions': 'defaultActions'
        }
    });

    var initialize = function(){
        var app_router = new AppRouter();

        app_router.on('defaultActions', function(actions){
            console.log('No route:', actions);
        });

        Backbone.history.start();
    };

    return{
        initialize: initialize
    };
});