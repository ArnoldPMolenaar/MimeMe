define([
    'jquery',
    'underscore',
    'backbone',
    'models/user',
    'models/map',
    'views/map',
    'collections/task',
    'collections/photo',
    'text!templates/index.html'
], function($, _, Backbone, UserModel, MapModel, MapView, taskCollection, photoCollection, IndexTemplate){
    var indexView = Backbone.View.extend({
        el: $('#main'),
        initialize: function(){
            this.getGoogleMaps();
            this.template = _.template(IndexTemplate);
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
                    that.userModel.set('id', object.id);
                    that.userModel.set('instagramUsername', object.instagramUsername);
                    that.userModel.set('instagramId', object.instagramId);
                    that.userModel.set('instagramPicture', object.instagramPicture);
                    that.userModel.set('instagramName', object.instagramName.replace('_', ' '));
                    that.userModel.set('password', object.password);
                    that.userModel.set('ranking', object.rank);

                    var data = {
                        userModel: that.userModel.attributes
                    };

                    that.template = _.template(IndexTemplate, data);
                    $(that.$el).html(that.template);

                    var eventHandler = new EventHandler();
                    eventHandler.logout();
                });
            }
        },
        /**
         * get Google maps for carousel
         */
        getGoogleMaps: function(){

            //some default variables
            var data = null;
            var that = this;
            var instagram = new Instagram();
            var instagramData = [];
            var count = 0;

            //fetch tasks
            this.collection = new taskCollection();
            this.collection.fetch().done(function(){

                that.collection.each(function(model){

                    count++;
                    var hashtagEncoded = model.attributes.hashtag.replace('#', '');

                    //get instagram data foreach task
                    $.ajax({
                        url: 'https://api.instagram.com/v1/tags/'+hashtagEncoded+'/media/recent',
                        dataType: 'jsonp',
                        type: 'GET',
                        data: {client_id: instagram.clientId},
                        success: function (data) {

                            $.each(data.data, function(index){
                                if(data.data[index].location != null) {
                                    instagramData.push({
                                        hashtag: hashtagEncoded,
                                        username: data.data[index].user.username,
                                        photo: data.data[index].images.thumbnail.url,
                                        likes: data.data[index].likes.count,
                                        locName: data.data[index].location.name,
                                        latitude: data.data[index].location.latitude,
                                        longitude: data.data[index].location.longitude
                                    });
                                }
                            });

                            //each is done all data is loaded
                            if(that.collection.length == count){
                                var googleMaps = new GoogleMaps(MapModel, MapView, photoCollection, instagramData, 'map');
                            }

                        },
                        error: function (data) {
                            console.log(data);
                        }
                    });

                });

            });
        }
    });

    return indexView;
});