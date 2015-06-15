define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/account.html'
], function($, _, Backbone, AccountTemplate){
    var accountView = Backbone.View.extend({
        el: $('#account-page'),
        template: _.template(AccountTemplate),
        initialize: function(){
            $(this.$el).html(this.template);

            $('#registerForm').on('submit', function(e){
                e.preventDefault();

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
            });

            $('#loginForm').on('submit', function(e){
                e.preventDefault();

                var errorHandler = new ErrorHandler();

                if(errorHandler.showErrorForInput('#login-name') == false && errorHandler.showErrorForInput('#login-password') == false){
                    $('.text-danger').slideUp();
                    var instagram = new Instagram();
                    instagram.loginUser($('#login-name').val(), $('#login-password').val(), $('#login-name').parent().find('.text-danger'), $('#login-success'));
                }
            });
        }
    });

    return accountView;
});