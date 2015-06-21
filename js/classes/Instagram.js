/**
 * Handle all instagram calls and user calls
 * @constructor
 */
var Instagram = function(){
    //some default instagram settings
    this.accessToken = "1087532719.b6c56d8.fa6e25cb1f014b12a986c4c5a173894b";
    this.clientId = "b6c56d87d26d490f8e09f72149e47961";
    this.clientSecret = "d48892bc9b4a49dfbc601ef4e2ebeb56";

    /**
     * this is the register function - check if user exists - if so add to my database
     * @param userName
     * @param password
     * @param $errorEl
     * @param $succesEl
     */
    this.searchForUserAndInsert = function(userName, password, $errorEl, $succesEl){
        var userData = null;
        var bUserExists = false;

        //do instagram ajax call - search for the user
        $.ajax({
            url: 'https://api.instagram.com/v1/users/search?q='+userName.replace(' ', '_'),
            dataType: 'jsonp',
            type: 'GET',
            data: {client_id: this.clientId},
            success: function(data){

                if(data.data.length > 0) {

                    $.each(data.data, function (index) {

                        if (data.data[index].username == userName) {

                            //user exists
                            bUserExists = true;
                            userData = data.data[index];

                            //do dataBase insert if users doesn't exists allready
                            $.get('includes/data/users.php?method=get&id='+userData.id, function(getCallback){

                                //we got a new user :)
                                if(getCallback == "false"){
                                    $succesEl.load('includes/data/users.php?method=set&instagramusername='+userData.username.replace(' ', '_')+'&instagramid='+userData.id+'&instagrampicture='+userData.profile_picture+'&instagramname='+userData.full_name.replace(' ', '_')+'&password='+password.replace(' ', '_')+'&rank=0', function(callback){
                                        if(callback == "true") {
                                            $succesEl.hide().text('Het is gelukt! U bent nu aangemeld bij MimeMe, U kunt voortaam inloggen met uw instagram naam en wachtwoord').slideDown();
                                        } else {
                                            $errorEl.hide().text('Er is iets fout gegaan met de query contacteer de admin: '+callback).slideDown();
                                        }
                                    });
                                } else {
                                    $errorEl.hide().text('Uw account bestaat al in onze database.').slideDown();
                                }

                            });

                        } else if (bUserExists == false) {
                            $errorEl.hide().text('Uw gebruikersnaam bestaat niet op instagram. Heb je een schrijffout gemaakt?').slideDown();
                        }

                    });

                } else {
                    $errorEl.hide().text('Uw gebruikersnaam bestaat niet op instagram. Heb je een schrijffout gemaakt?').slideDown();
                }

            },
            error: function(data){
                console.log(data);
            }
        });
    };

    /**
     * check if the database gives a true - if so then set a cookie with instagram id
     * @param userName
     * @param password
     * @param $errorEl
     * @param $succesEl
     */
    this.loginUser = function(userName, password, $errorEl, $succesEl){
        //get data
        $.get('includes/data/users.php?method=login&instagramname='+userName+'&password='+password.replace(' ', '_'), function(getCallback){
            //if user exists
            if(getCallback != "false"){
                //set cookie
                var cookieHandler = new CookieHandler();
                cookieHandler.createCookie('user-id', getCallback.replace('"', '').replace('"', ''), 1);

                //show message
                $succesEl.hide().text('U bent ingelogged u zult nu terug gestuurd worden naar de homepagina').slideDown();

                //set timeout to read the message and go to the homescreen
                setTimeout(function(){
                    location.reload();
                }, 4000);
            } else {
                //user doesn't exists
                $errorEl.hide().text('Uw gebruikersnaam en/of wachtwoord komen niet overeen met een geldige gebruiker.').slideDown();
            }
        });
    };

    /**
     * get instagram data
     * @param hashtag
     */
    this.getInstagramData = function(MapModel, MapView, photoCollection, hashtag){
        var that = this;

        $.ajax({
            url: 'https://api.instagram.com/v1/tags/'+hashtag+'/media/recent',
            dataType: 'jsonp',
            type: 'GET',
            data: {client_id: this.clientId},
            success: function (data) {

                var instagramData = [];

                $.each(data.data, function(index){
                    if(data.data[index].location != null) {
                        instagramData.push({
                            hashtag: hashtag,
                            username: data.data[index].user.username,
                            photo: data.data[index].images.thumbnail.url,
                            likes: data.data[index].likes.count,
                            locName: data.data[index].location.name,
                            latitude: data.data[index].location.latitude,
                            longitude: data.data[index].location.longitude
                        });
                    }
                });

                that.onDataLoaded(MapModel, MapView, photoCollection, instagramData, hashtag);

            },
            error: function (data) {
                console.log(data);
            }
        });
    };

    /**
     * lets load google maps if all task data and instagram data is loaded
     * @param data
     */
    this.onDataLoaded = function(MapModel, MapView, photoCollection, data, hashtag){

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
        map_model.initMap({ coords: {latitude: 53.0525992, longitude: 4.0066088} });

        //set the model to the view
        if(objects.length > 0) {
            var map_view = new MapView({model: map_model}, {id: data[0].hashtag}, {markerCollection: this.collection});
        } else {
            var map_view = new MapView({model: map_model}, {id: hashtag}, {markerCollection: this.collection});
        }

        //render Google Maps
        map_view.render();
    };

};