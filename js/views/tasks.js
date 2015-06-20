define([
    'jquery',
    'underscore',
    'backbone',
    'models/user',
    'models/map',
    'views/map',
    'collections/photo',
    'text!templates/tasks.html'
], function($, _, Backbone, UserModel, MapModel, MapView, photoCollection, TasksTemplate){
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
                    that.userModel.attributes.id = object.id;
                    that.userModel.attributes.instagramUsername = object.instagramUsername;
                    that.userModel.attributes.instagramId = object.instagramId;
                    that.userModel.attributes.instagramPicture = object.instagramPicture;
                    that.userModel.attributes.instagramName = object.instagramName.replace('_', ' ');
                    that.userModel.attributes.password = object.password;
                    that.userModel.attributes.ranking = object.rank;

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
            $.get('includes/data/tasks.php?method=get', function(tasks) {

                //convert json to objects
                var tasksObjects = JSON.parse(tasks);

                //check if usermodel is defined
                if(typeof userModel != 'undefined') {
                    data = {
                        userModel: userModel,
                        tasks: tasksObjects
                    };
                } else {
                    data = {
                        tasks: tasksObjects
                    }
                }

                //load template
                that.template = _.template(TasksTemplate, data);
                $(that.$el).html(that.template);

                if(typeof userModel != 'undefined') {
                    eventHandler.createTaskListner(data.userModel.attributes.id);
                }

                //loop true tasks
                $.each(tasksObjects, function(index){

                    var hashtagEncoded = tasksObjects[index].hashtag.replace('#', '');

                    instagram.getInstagramData(MapModel, MapView, photoCollection, hashtagEncoded);

                    //add event click on the button
                    eventHandler.toggleTask('#open-task-'+tasksObjects[index].id);

                    //add event handler for the like button
                    eventHandler.voteTask('#like-'+tasksObjects[index].id, tasksObjects[index].id, tasksObjects[index].votes);
                });
            });
        }
    });

    return tasksView;
});