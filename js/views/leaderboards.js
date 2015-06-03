define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/leaderboards.html'
], function($, _, Backbone, LeaderboardsTemplate){
    var leaderboardsView = Backbone.View.extend({
        el: $('#leaderboards-page'),
        initialize: function(){
            this.template = _.template(LeaderboardsTemplate);
            $(this.$el).html(this.template);
        }
    });

    return leaderboardsView;
});