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
                    var eventHandler = new EventHandler();
                    eventHandler.createTaskListner(data.userModel.id);
                }

                $.each(tasksObjects, function(index){

                    var hashtagEncoded = tasksObjects[index].hashtag.replace('#', '');

                    instagram.getInstagramData(MapModel, MapView, photoCollection, hashtagEncoded);
                });
            });
        }
    });

    return tasksView;
});