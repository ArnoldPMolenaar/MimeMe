<?php
//create first database connection
$dbConnection = new Mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

if($dbConnection->connect_error){
    throw new Exception(
        sprintf('(#%d) %s', $dbConnection->connect_errno, $dbConnection->connect_error)
    );
}