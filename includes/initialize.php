<?php
session_start();

//Require needed files
require_once "settings.php";
require_once "dbc.php";
require_once "classes/Database.php";
require_once "classes/DatabaseExtension.php";

// load database and classes
$dbConnection = new Database(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE);
$databaseExtension = new DatabaseExtension($dbConnection);
