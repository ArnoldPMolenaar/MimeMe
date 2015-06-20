var TasksHandler = function(){
    /**
     * insert a task to the database
     * @param accountId
     * @param title
     * @param description
     * @param hashtag
     * @param $errorEL
     * @param $successEl
     */
    this.insertTask = function(accountId, title, description, hashtag, $errorEL, $successEl){
        var hashtagEncode = hashtag.replace('#', '%23');
        //check if tasks allready exists
        $.get('includes/data/tasks.php?method=exists&hashtag='+hashtagEncode, function(data) {
            if(data == 'false'){
                //insert the task
                $.get('includes/data/tasks.php?method=set&accountid='+accountId+'&title='+title+'&description='+description+'&hashtag='+hashtagEncode, function(insertData) {
                    if(insertData == 'true'){
                        // de task is toegevoegd :)
                        $successEl.hide().text('YES!! Je opdracht is aangemaakt. Hij is nu te zien in de opdrachten pagina.').slideDown();
                        setTimeout(function(){location.reload();},2000);
                    } else {
                        //er ging iets fout in de database :(
                        $errorEL.hide().text('Er ging iets fout! controleer de velden en probeer het opnieuw. Anders neem contact op met de ontwikkelaar.').slideDown();
                    }
                });
            } else {
                //task allready exists
                console.log($errorEL);
                $errorEL.hide().text('De hashtag (opdracht) die u heeft gemaakt bestaat al. Er bestaat een kans dat iemand anders uw opdracht al gemaakt heeft.').slideDown();
            }
        });
    };

};