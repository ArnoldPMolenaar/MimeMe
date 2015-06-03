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
}