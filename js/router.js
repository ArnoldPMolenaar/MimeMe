define([
    'jquery',
    'underscore',
    'backbone',
    'views/index',
    'views/about',
    'views/account',
    'views/contact',
    'views/leaderboards',
    'views/news',
    'views/service',
    'views/tasks',
    'views/testimonial',
    'modernizr',
    'bootstrap'
], function($, _, Backbone, IndexView, AboutView, AccountView, ContactView, LeaderboardsView, NewsView, ServiceView, TasksView, TestimonialView){
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
            var aboutView = new AboutView();
            var accountView = new AccountView();
            var contactView = new ContactView();
            var leaderboardsView = new LeaderboardsView();
            var newsView = new NewsView();
            var serviceView = new ServiceView();
            var tasksView = new TasksView();
            tasksView.render();
            var testimonialView = new TestimonialView();
        });

        app_router.trigger('defaultActions');

        Backbone.history.start();
    };

    return{
        initialize: initialize
    };
});