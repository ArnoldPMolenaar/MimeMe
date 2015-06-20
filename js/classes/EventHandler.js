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
    };

    /**
     * animate the google maps to make it bigger and use it to look for pictures on the map.
     * Its a on toggle function so everything is handeld bij this function
     * @param id
     */
    this.toggleTask = function(id){
        $(id).on('click', function(){
            //toggle between buttons
            $('.task-details').css('display', 'block');
            $(this).parent().css('display', 'none');
            var self = $(this).parent().parent();

            //animate the map
            $('.task').animate({
                height: 270,
                width: 270
            }, 1000, function() {
                self.fadeOut(300).fadeIn(300).fadeOut(300).fadeIn(300).animate({
                    height: 400,
                    width: 400
                }, 1000);
                $('.task').stop();
            });
        });
    };

    /**
     * vote listner for the like button
     * @param el
     * @param id
     * @param votes
     */
    this.voteTask = function(el, id, votes){

        //init click event
        $(el).on('click', function(){
            //check cookie for access
            var cookieHandler = new CookieHandler();
            var cookieVote = cookieHandler.readCookie('vote');

            if(cookieVote == 1) {
                //update current vote
                var newVotes = parseInt(votes) + 1;

                //update database
                $.get('includes/data/tasks.php?method=vote&id=' + id + '&votes=' + newVotes, function (callback) {
                    if (callback == "true") {
                        //update button
                        $(el + ' .vote').html(newVotes);

                        //create new cookie where user can't vote
                        cookieHandler.eraseCookie("vote");
                        cookieHandler.createCookie("vote", 0, 1);
                    }
                });
            }
        });
    }
};