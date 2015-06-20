define([
    'jquery',
    'underscore',
    'backbone',
    'views/index',
    'views/account',
    'views/contact',
    'views/leaderboards',
    'views/tasks',
    'modernizr',
    'bootstrap'
], function($, _, Backbone, IndexView, AccountView, ContactView, LeaderboardsView, TasksView){
    var AppRouter = Backbone.Router.extend({
        routes:{
            //default rout URL
            '*actions': 'defaultActions'
        }
    });

    var initialize = function(){
        var app_router = new AppRouter();

        app_router.on('defaultActions', function(actions){
            var indexView = new IndexView();
            indexView.render();
            var accountView = new AccountView();
            var contactView = new ContactView();
            var leaderboardsView = new LeaderboardsView();
            var tasksView = new TasksView();
        });

        app_router.trigger('defaultActions');

        Backbone.history.start();
    };

    return{
        initialize: initialize
    };
});