var EventHandler = function(){
    /**
     * insert a new task to the database
     * @param userId
     */
    this.createTaskListner = function(userId){
        $('#createTaskForm').on('submit', function (e) {
            e.preventDefault();

            //create errorhandler
            var errorHandler = new ErrorHandler();
            if (errorHandler.showErrorForInput('#task-name') == false && errorHandler.showErrorForInput('#task-description') == false && errorHandler.showErrorForInput('#task-hashtag') == false) {
                $('.text-danger').slideUp();

                //all fields are set lets go to the insert query
                var tasksHandler = new TasksHandler();
                tasksHandler.insertTask(
                    userId,
                    $('#task-name').val(),
                    $('#task-description').val(),
                    $('#task-hashtag').val(),
                    $('#task-hashtag').parent().find('.text-danger'),
                    $('#create-task-success')
                );
            }

        });
    }
}