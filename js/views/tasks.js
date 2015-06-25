define([
    'jquery',
    'underscore',
    'backbone',
    'models/user',
    'models/map',
    'views/map',
    'collections/task',
    'collections/photo',
    'text!templates/tasks.html'
], function($, _, Backbone, UserModel, MapModel, MapView, TaskCollection, photoCollection, TasksTemplate){
    var tasksView = Backbone.View.extend({
        el: $('#tasks-page'),
        /**
         * initialize the tasks object
         */
        initialize: function(){
            //create a vote cookie for every visitor to vote everyday on one a task
            var cookieHandler = new CookieHandler();
            var oldVoteCookie = cookieHandler.readCookie("vote");

            if(oldVoteCookie == null) {
                cookieHandler.createCookie("vote", 1, 1);
            }

            //render the view
            this.render();
        },
        /**
         * render the tasks object
         */
        render: function(){
            //check login status
            var cookieHandler = new CookieHandler();
            var userId = cookieHandler.readCookie('user-id');
            var that = this;

            if(userId != null && userId != 'undefined' && userId != ""){
                $.get('includes/data/users.php?method=get&id=' + userId, function (getCallback) {
                    var object = JSON.parse(getCallback);
                    that.userModel = new UserModel();
                    that.userModel.set('id', object.id);
                    that.userModel.set('instagramUsername', object.instagramUsername);
                    that.userModel.set('instagramId', object.instagramId);
                    that.userModel.set('instagramPicture', object.instagramPicture);
                    that.userModel.set('instagramName', object.instagramName.replace('_', ' '));
                    that.userModel.set('password', object.password);
                    that.userModel.set('ranking', object.rank);

                    //get tasks put user model in it
                    that.getTasks(that.userModel);
                });
            } else {
                //show only all tasks
                this.getTasks();
            }
        },
        /**
         * get tasks for the tasks view
         * @param userModel
         */
        getTasks: function(userModel){

            //some default variables
            var data = null;
            var that = this;
            var instagram = new Instagram();
            var eventHandler = new EventHandler();

            //get all tasks from the database
            this.collection = new TaskCollection();
            this.collection.fetch().done(function(){

                //check if usermodel is defined
                if(typeof userModel != 'undefined') {
                    data = {
                        userModel: userModel,
                        tasks: that.collection
                    };
                } else {
                    data = {
                        tasks: that.collection
                    }
                }

                //load template
                that.template = _.template(TasksTemplate, data);
                $(that.$el).html(that.template);

                if(typeof userModel != 'undefined') {
                    eventHandler.createTaskListner(data.userModel.attributes.id);
                }

                //loop true tasks
                that.collection.each(function(model){

                    var hashtagEncoded = model.attributes.hashtag.replace('#', '');

                    instagram.getInstagramData(MapModel, MapView, photoCollection, hashtagEncoded);

                    //add event click on the button
                    eventHandler.toggleTask('#open-task-'+model.attributes.id);

                    //add event handler for the like button
                    eventHandler.voteTask('#like-'+model.attributes.id, model.attributes.id, model.attributes.votes);
                });

            });
        }
    });

    return tasksView;
});