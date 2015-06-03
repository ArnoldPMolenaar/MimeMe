define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/news.html'
], function($, _, Backbone, NewsTemplate){
    var newsView = Backbone.View.extend({
        el: $('#news-page'),
        initialize: function(){
            this.template = _.template(NewsTemplate);
            $(this.$el).html(this.template);
        }
    });

    return newsView;
});