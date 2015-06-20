/**
 * google maps view
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'models/map',
    'text!templates/infoWindow.html'
], function($, _, Backbone, MapModel, infoWindowTemplate){
    var MapView = Backbone.View.extend({
        id: "",
        collection: "",
        //initialize google maps with the model
        initialize: function(model, id, markerCollection){
            var self = this;
            this.id = '#' + this.objToString(id);
            this.collection = markerCollection;

            $(this.el).addClass('google-maps');

            //set the map object into the model
            this.model.set('map', new google.maps.Map(this.el, this.model.get('mapOptions')));

            //update the google maps object for new markers and sizes
            $(document).ready(function () {

                setInterval(function(){
                    google.maps.event.trigger(self.el, "resize");
                }, 2000);

            });

            this.addMarkers();
        },
        //render google maps bij replacing the id with the element
        render: function(){
            $(this.id).replaceWith(this.el);
            return this;
        },
        addMarkers: function(){
            var self = this;

            //setup infoWindow markers
             _.each(this.collection.markerCollection.models, function(data){
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
                     map: self.model.get('map'),
                     title: data.attributes.locName
                 });

                 //add a click function to the marker to open the dialog
                 google.maps.event.addListener(marker, 'click', function() {
                    infoWindow.open(self.model.get('map'), marker);
                 });

             });

        },
        objToString: function(obj){
            var str = '';
            for (var p in obj) {
                if (obj.hasOwnProperty(p)) {
                    str += obj[p] + '\n';
                }
            }
            return str;
        }
    });

    return MapView;
});