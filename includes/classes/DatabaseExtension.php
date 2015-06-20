<?php

/**
 * Class DatabaseExtension
 */
class DatabaseExtension {
    /**
     * set protected database connection variable
     */
    protected $dbConnection;

    /**
     * construct initalize
     * Database connection
     * @$dbConnection
     */
    public function __construct($dbConnection) {
        $this->Database = $dbConnection;
    }

    /**
     * real_escape_string function
     * @$string
     * return real_escape_string()
     */
    protected function Mysqli_RealEscapString($string)
    {
        return $this->Database->real_escape_string($string);
    }

    /**
     * prepare query function with database error
     * @query
     * return statement
     */
    protected function PrepareQuery($query){
        // set utf8
        $this->Database->query("SET NAMES 'utf8'");

        //start prepare
        $statement = $this->Database->prepare($query);
        if (!$statement) {
            throw new Exception(
                $this->Database->error.$this->Database->errno.". Full query: [$query]"
            );
        }
        return $statement;
    }

    /**
     * @return array
     * @throws Exception
     */
    public function getUsers(){
        $aUsers = [];

        if($statement = $this->PrepareQuery("SELECT * FROM `mm_accounts`")){
            $statement->execute();
            $statement->bind_result($id, $instagramUsername, $instagramId, $instagramPicture, $instagramName, $password, $rank);
            while($statement->fetch()){
                array_push($aUsers, [
                    'id' => $id,
                    'instagramUsername' => $instagramUsername,
                    'instagramId' => $instagramId,
                    'instagramPicture' => $instagramPicture,
                    'instagramName' => $instagramName,
                    'password' => $password,
                    'rank' => $rank
                ]);
            }
            $statement->close();
        }

        return $aUsers;
    }

    /**
     * @param $id
     * @return array
     * @throws Exception
     */
    public function getUser($instagramid){
        $aUser = null;

        if($statement = $this->PrepareQuery("SELECT * FROM `mm_accounts` WHERE `instagram-id` = $instagramid")){
            $statement->execute();
            $statement->bind_result($id, $instagramUsername, $instagramId, $instagramPicture, $instagramName, $password, $rank);
            $statement->fetch();
            if(!is_null($instagramId)) {
                $aUser = [
                    'id' => $id,
                    'instagramUsername' => $instagramUsername,
                    'instagramId' => $instagramId,
                    'instagramPicture' => $instagramPicture,
                    'instagramName' => $instagramName,
                    'password' => $password,
                    'rank' => $rank
                ];
            } else {
                $aUser = false;
            }
            $statement->close();
        }

        return $aUser;
    }

    /**
     * @param $instagramUsername
     * @param $password
     * @return bool
     * @throws Exception
     */
    public function getUserLogin($instagramUsername, $password){
        if($statement = $this->PrepareQuery("SELECT `instagram-id` FROM `mm_accounts` WHERE `instagram-username` = '".$instagramUsername."' AND `password` = '".sha1($password)."'")){
            $statement->execute();
            $statement->bind_result($id);
            $statement->fetch();
            $statement->close();
        }
        if(!is_null($id)) {
            return $id;
        } else {
            return false;
        }
    }

    /**
     * @param $instagramUsername
     * @param $instagramId
     * @param $instagramPicture
     * @param $instagramName
     * @param $password
     * @return bool
     * @throws Exception
     */
    public function setUser($instagramUsername, $instagramId, $instagramPicture, $instagramName, $password){
        if($statement = $this->PrepareQuery("INSERT INTO `mm_accounts` (`instagram-username`, `instagram-id`, `instagram-picture`, `instagram-name`, `password`, `ranking`) VALUES ('".$this->Mysqli_RealEscapString($instagramUsername)."', '".$this->Mysqli_RealEscapString($instagramId)."', '".$this->Mysqli_RealEscapString($instagramPicture)."', '".$this->Mysqli_RealEscapString($instagramName)."', '".sha1($password)."', 0)")){
            $statement->execute();
            $statement->close();
            return true;
        } else {
            return false;
        }
    }

    /**
     * @param $id
     * @param $instagramUsername
     * @param $instagramId
     * @param $instagramPicture
     * @param $instagramName
     * @param $password
     * @param $rank
     * @return bool
     * @throws Exception
     */
    public function updateUser($id, $instagramUsername, $instagramId, $instagramPicture, $instagramName, $password, $rank){
        if($statement = $this->PrepareQuery("UPDATE `mm_accounts` SET `instagram-username` = '".$this->Mysqli_RealEscapString($instagramUsername)."', `instagram-id` = '".$this->Mysqli_RealEscapString($instagramId)."', `instagram-picture` = '".$this->Mysqli_RealEscapString($instagramPicture)."', `instagram-name` = '".$this->Mysqli_RealEscapString($instagramName)."', `password` = '".sha1($password)."', `ranking` = '".$this->Mysqli_RealEscapString($rank)."' WHERE `id` = ".$id."")){
            $statement->execute();
            $statement->close();
            return true;
        } else {
            return false;
        }
    }

    /**
     * *********************************************************************
     * TASKS
     * *********************************************************************
     */

    /**
     * @param $accountId
     * @param $title
     * @param $description
     * @param $hashtag
     * @return bool
     * @throws Exception
     */
    public function setTask($accountId, $title, $description, $hashtag){
        if($statement = $this->PrepareQuery("INSERT INTO `mm_tasks` (`accountid`, `title`, `description`, `hashtag`, `votes`) VALUES ('".$this->Mysqli_RealEscapString($accountId)."', '".$this->Mysqli_RealEscapString($title)."', '".$this->Mysqli_RealEscapString($description)."', '".$this->Mysqli_RealEscapString($hashtag)."', 0)")){
            $statement->execute();
            $statement->close();
            return true;
        } else {
            return false;
        }
    }

    /**
     * @param $hashtag
     * @return bool
     * @throws Exception
     */
    public function existsTask($hashtag){
        if($statement = $this->PrepareQuery("SELECT `hashtag` FROM `mm_tasks` WHERE `hashtag` = '".$hashtag."'")){
            $statement->execute();
            $statement->store_result();
            $numberOfRows = $statement->num_rows;

            if($numberOfRows >= 1) {
                return true;
            } else {
                return false;
            }

            $statement->close();
        }
    }

    public function getTasks(){
        $tasks = array();

        if($statement = $this->PrepareQuery("SELECT * FROM `mm_tasks`")){
            $statement->execute();
            $statement->bind_result($id, $accountId, $title, $description, $hashtag, $votes);
            while($statement->fetch()){
                array_push($tasks, array(
                    'id' => $id,
                    'accountid' => $accountId,
                    'title' => $title,
                    'description' => $description,
                    'hashtag' => $hashtag,
                    'votes' => $votes
                ));
            }

            $statement->close();
        }

        return $tasks;
    }
}