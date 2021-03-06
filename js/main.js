//load default libarys
require.config({
    shim :{
        bootstrap: { deps:['jquery'] },
        'jquery.appear': { deps:['jquery'] },
        'jqBootstrapValidation': { deps:['jquery'] },
        'instagram': { deps:['jquery'] },
        'errorhandler': { deps:['jquery'] },
        'taskshandler': { deps:['jquery'] },
        'eventhandler': { deps:['jquery'] },
        'googlemaps': { deps:['jquery'] }
    },
    paths:{
        jquery: 'libs/jquery',
        underscore: 'libs/underscore',
        backbone: 'libs/backbone',
        bootstrap: 'libs/bootstrap',
        modernizr: 'libs/modernizr.custom',
        'jquery.appear': 'libs/plugins/jquery.appear',
        'jqBootstrapValidation': 'libs/plugins/jqBootstrapValidation',
        'instagram': 'classes/Instagram',
        'errorhandler': 'classes/ErrorHandler',
        'cookiehandler': 'classes/CookieHandler',
        'taskshandler': 'classes/TasksHandler',
        'eventhandler': 'classes/EventHandler',
        'googlemaps': 'classes/GoogleMaps'
    }
});

require([
    //load the app module to difine the functions
    'app'
], function(App){
    //'app' dependency is passes in as 'App'
    App.initialize();
});

define([
    //configure the library's in our bootstrap
    'jquery',
    'underscore',
    'backbone',
    'modernizr',
    'bootstrap',
    'jquery.appear',
    'jqBootstrapValidation',
    'instagram',
    'errorhandler',
    'cookiehandler',
    'taskshandler',
    'eventhandler',
    'googlemaps'
], function($, _, Backbone){
    //pass in jQuery, underscore and backbone
    return {};
});