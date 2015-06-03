<?php
//define custom constants for the databse connection
define("DB_HOST", "localhost");
define("DB_USERNAME", "0882275");
define("DB_PASSWORD", "76x3j8p04");
define("DB_DATABASE", "0882275");

//Custom error handler, so every error will throw a custom ErrorException
function CustomError($severity, $message, $file, $line) {
    throw new ErrorException($message, $severity, $severity, $file, $line);
}
set_error_handler("CustomError");