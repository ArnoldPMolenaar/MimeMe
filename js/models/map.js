/**
 * Google maps model
 */
define([
    'underscore',
    'backbone'
], function(_, Backbone){
    var MapModel = Backbone.Model.extend({
        defaults: {
            id: '',
            LatLng: {},
            mapOptions: {},
            position: {},
            map: {},
            zoom: 7,
            maxZoom: 30,
            minZoom: 0
        },
        //initialize for google maps
        initMap: function(position){
            this.set('position', position)
            var LatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            this.set('LatLng', LatLng);
            var mapOptions = {
                zoom: this.get('zoom'),
                minZoom: this.get('minZoom'),
                maxZoom: this.get('maxZoom'),
                center: this.get('LatLng'),
                mapTypeControl: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            this.set('mapOptions', mapOptions);
        }
    });

    return MapModel;
});