define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/service.html'
], function($, _, Backbone, ServiceTemplate){
    var serviceView = Backbone.View.extend({
        el: $('#service-page'),
        initialize: function(){
            this.template = _.template(ServiceTemplate);
            $(this.$el).html(this.template);
        }
    });

    return serviceView;
});