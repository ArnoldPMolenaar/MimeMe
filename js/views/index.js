define([
    'jquery',
    'underscore',
    'backbone',
    'models/user',
    'models/map',
    'views/map',
    'collections/photo',
    'text!templates/index.html'
], function($, _, Backbone, UserModel, MapModel, MapView, photoCollection, IndexTemplate){
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
                    that.userModel.attributes.id = object.id;
                    that.userModel.attributes.instagramUsername = object.instagramUsername;
                    that.userModel.attributes.instagramId = object.instagramId;
                    that.userModel.attributes.instagramPicture = object.instagramPicture;
                    that.userModel.attributes.instagramName = object.instagramName.replace('_', ' ');
                    that.userModel.attributes.password = object.password;
                    that.userModel.attributes.ranking = object.rank;

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
         * @param userModel
         */
        getGoogleMaps: function(){

            //some default variables
            var data = null;
            var that = this;
            var instagram = new Instagram();
            var instagramData = [];

            //get all tasks from the database
            $.get('includes/data/tasks.php?method=get', function(tasks) {

                //convert json to objects
                var tasksObjects = JSON.parse(tasks);

                //loop true tasks
                $.each(tasksObjects, function(index){
                    var hashtagEncoded = tasksObjects[index].hashtag.replace('#', '');

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

                            var i = index;
                            i++;

                            //each is done all data is loaded
                            if(tasksObjects.length == i++){
                                that.onDataLoaded(instagramData, 'map');
                            }

                        },
                        error: function (data) {
                            console.log(data);
                        }
                    });
                });
            });
        },
        /**
         * lets load google maps if all marker data is loaded
         * @param data
         */
        onDataLoaded: function(data, id){

            //create a new collection for the objects
            this.collection = new photoCollection();

            //save data into variable
            var objects = data;

            //check if the variable is not empty
            if(objects.length >= 0) {
                //loop all photos and data
                for(var i in objects){
                    //save object in the collection
                    this.collection.add({
                        photo: objects[i].photo,
                        locName: objects[i].locName,
                        username: objects[i].username,
                        likes: objects[i].likes,
                        latitude: objects[i].latitude,
                        longitude: objects[i].longitude
                    });
                }
            }

            //create model
            var map_model = new MapModel();
            map_model.initMap({ coords: {latitude: 52.51, longitude: 5} });

            //set the model to the view
            var map_view = new MapView({model: map_model}, {id: id}, {markerCollection: this.collection});

            //render Google Maps
            map_view.render();
        }
    });

    return indexView;
});