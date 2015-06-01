define([
    'jquery',
    'underscore',
    'backbone',
    'router',
    'modernizr',
    'bootstrap'
], function($, _, Backbone, Router){
    var initialize = function(){
        //pass in the router module and call his initialize
        Router.initialize();
    };

    return{
        initialize: initialize
    };
});