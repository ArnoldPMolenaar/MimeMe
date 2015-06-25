define([
    'jquery',
    'underscore',
    'backbone',
    'collections/user',
    'text!templates/leaderboards.html'
], function($, _, Backbone, userCollection, LeaderboardsTemplate){
    var leaderboardsView = Backbone.View.extend({
        el: $('#leaderboards-page'),
        initialize: function(){
            var self = this;
            this.collection = new userCollection;

            //get all ranking charts of all users
            $.get('includes/data/leaderboards.php?method=get', function (numberOfTasks) {

                self.collection.fetch().done(function(){
                    var data = {
                        users: self.collection,
                        taskCount: numberOfTasks
                    };

                    self.template = _.template(LeaderboardsTemplate, data);
                    $(self.$el).html(self.template);

                    self.render();
                });

            });
        },
        render: function(){

            // Progress Bar animation
            $('.skill-shortcode').appear(function () {
                $('.progress').each(function () {
                    $('.progress-bar').css('width',  function () { return ($(this).attr('data-percentage') + '%')});
                });
            }, {accY: -100});

        }
    });

    return leaderboardsView;
});