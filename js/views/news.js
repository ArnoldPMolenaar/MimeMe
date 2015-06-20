define([
    'jquery',
    'underscore',
    'backbone',
    'models/map',
    'views/map',
    'collections/photo',
    'text!templates/news.html'
], function($, _, Backbone, MapModel, MapView, photoCollection, NewsTemplate){
    var newsView = Backbone.View.extend({
        el: $('#news-page'),
        initialize: function(){
            this.template = _.template(NewsTemplate);
            $(this.$el).html(this.template);
        },
        onDataLoaded: function(data){

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
            map_model.initMap({ coords: {latitude: 52, longitude: 5} });

            //set the model to the view
            var map_view = new MapView({model: map_model}, {id: data[0].hashtag});

            //render Google Maps
            map_view.render();

            //setup infoWindow markers
            /*
             _.each(this.collection.models, function(data){
             //get a template for the content
             var template = _.template(infoWindowTemplate, data);
             $(this.marker).html(template);

             //set the infoWindow template in the marker
             var infoWindow = new google.maps.InfoWindow({
             content: template
             });

             //set position and marker on the map
             var LatLng = new google.maps.LatLng(data.attributes.latitude, data.attributes.longitude);
             var marker = new google.maps.Marker({
             position: LatLng,
             map: map_model.get('map'),
             title: data.attributes.locName
             });

             //add a click function to the marker to open the dialog
             google.maps.event.addListener(marker, 'click', function() {
             infoWindow.open(map_model.get('map'), marker);
             });
             });
             */
        }
    });

    return newsView;
});