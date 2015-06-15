/**
 * fixes the errors in input fields
 * @constructor
 */
var ErrorHandler = function(){

    /**
     * if the input field is empty show an error
     * @param id
     * @returns {boolean}
     */
    this.showErrorForInput = function(id){
        var el = $(id);
        var value = el.val();
        var Error = el.attr('rel');
        var required = el.attr('required');

        if(value == "" && typeof required !== typeof undefined && required !== false){
            $('.text-danger').slideUp();
            el.parent().find('.text-danger').hide().text(Error).slideDown();
            return true;
        } else {
            return false;
        }
    }
};