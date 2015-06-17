define([
    'jquery',
    'underscore',
    'backbone',
    'models/user',
    'text!templates/tasks.html'
], function($, _, Backbone, UserModel, TasksTemplate){
    var tasksView = Backbone.View.extend({
        el: $('#tasks-page'),
        initialize: function(){
            this.template = _.template(TasksTemplate);
            $(this.$el).html(this.template);
        },
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

                    var data = {
                        userModel: that.userModel.attributes
                    };

                    that.template = _.template(TasksTemplate, data);
                    $(that.$el).html(that.template);

                    $('#createTaskForm').on('submit', function(e){
                        e.preventDefault();

                        var errorHandler = new ErrorHandler();
                        if(errorHandler.showErrorForInput('#task-name') == false && errorHandler.showErrorForInput('#task-description') == false && errorHandler.showErrorForInput('#task-hashtag') == false){
                            $('.text-danger').slideUp();

                            var tasksHandler = new TasksHandler();
                            tasksHandler.insertTask(
                                data.userModel.id,
                                $('#task-name').val(),
                                $('#task-description').val(),
                                $('#task-hashtag').val(),
                                $('#task-hashtag').parent().find('.text-danger'),
                                $('#create-task-success')
                            );
                        }

                    });
                });
            }
        }
    });

    return tasksView;
});