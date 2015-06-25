var EventHandler = function(){
    /**
     * register a new account
     */
    this.registerAccount = function(){
        var errorHandler = new ErrorHandler();
        var name = $('#register-name').val();

        if(errorHandler.showErrorForInput('#register-name') == false && errorHandler.showErrorForInput('#register-password') == false && errorHandler.showErrorForInput('#register-confirm-password') == false){
            if($('#register-password').val() == $('#register-confirm-password').val()) {
                $('.text-danger').slideUp();
                var instagram = new Instagram();
                instagram.searchForUserAndInsert(name, $('#register-password').val(), $('#register-name').parent().find('.text-danger'), $('#register-success'));
            } else {
                $('#register-confirm-password').parent().find('.text-danger').hide().text('De wachtwoorden komen niet overeen').slideDown();
            }
        }
    };
    /**
     * login a account
     */
    this.loginAccount = function(){
        var errorHandler = new ErrorHandler();

        if(errorHandler.showErrorForInput('#login-name') == false && errorHandler.showErrorForInput('#login-password') == false){
            $('.text-danger').slideUp();
            var instagram = new Instagram();
            instagram.loginUser($('#login-name').val(), $('#login-password').val(), $('#login-name').parent().find('.text-danger'), $('#login-success'));
        }
    };

    /**
     * logout account
     */
    this.logout = function(){
        $('#destroy-account').on('click', function(){
            if(confirm('Weet je zeker dat je wilt uitloggen?')){
                var cookieHandler = new CookieHandler();
                cookieHandler.eraseCookie('user-id');
                location.reload();
            }
        });
    };
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
            $(this).parent().parent().css('display', 'none');
            var self = $(this).parent().parent().parent();

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
    };

    /**
     * sends a mail on submit
     * @param id
     */
    this.mailListener = function(id){
        var errorHandler = new ErrorHandler();

        //check for empty fields
        if(errorHandler.showErrorForInput('#contact-name') == false && errorHandler.showErrorForInput('#contact-email') == false && errorHandler.showErrorForInput('#contact-subject') == false && errorHandler.showErrorForInput('#contact-message') == false){
            $('.text-danger').slideUp();

            //get post data
            var str = $(this).serialize();
            var postData = str+'&method=send';

            //send mail
            $.ajax({
                type: "POST",
                url: 'includes/data/email.php',
                data: postData,
                success: function(data){
                    $('#mail-success').hide().text('Uw email is verstuurd.').slideDown();
                },
                error: function(data){
                    console.log(data)
                }
            });

        }
    }
};