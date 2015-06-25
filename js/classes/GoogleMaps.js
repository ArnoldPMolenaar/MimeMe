/**
 * google maps class with a constructor: initializes the map
 * @param MapModel
 * @param MapView
 * @param photoCollection
 * @param data
 * @param hashtag
 * @constructor
 */
var GoogleMaps = function(MapModel, MapView, photoCollection, data, mapId){
    //set default variables
    this.MapModel = MapModel;
    this.MapView = MapView;
    this.photoCollection = photoCollection;
    this.data = data;
    this.mapId = mapId;

    /**
     * constructor
     * @param MapModel
     * @param MapView
     * @param photoCollection
     * @param data
     * @param hashtag
     */
    this.init = function(){

        //create a new collection for the markers
        this.collection = new this.photoCollection();

        //save data into variable
        var objects = this.data;

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
        var map_model = new this.MapModel();
        map_model.initMap({ coords: {latitude: 53.0525992, longitude: 4.0066088} });

        //set the model to the view
        var map_view = new this.MapView({model: map_model}, {id: this.mapId}, {markerCollection: this.collection});

        //render Google Maps
        map_view.render();
    };

    this.init();
};