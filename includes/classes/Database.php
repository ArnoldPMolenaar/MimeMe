<?php
/**
 * Class Database
 * @package root
 */
class Database extends mysqli {

    /**
     * construct Mysqli connection
     *
     * @$host
     * @$user
     * @$password
     * @$database
     * @$port
     * @$socket
     *
     */
    public function __construct($host, $user, $password, $database = "", $port = NULL, $socket = NULL) {
        parent::__construct($host, $user, $password, $database, $port, $socket);
        $this->throwConnectionExceptionOnConnectionError();
    }

    /**
     * throw error when connection is lost
     * throwConnectionExceptionOnConnectionError
     */
    private function throwConnectionExceptionOnConnectionError() {
        if (!$this->connect_error) return;
        $message = sprintf('(%s) %s', $this->connect_errno, $this->connect_error);
        throw new DatabaseException($message);
    }

    /**
     * close the database connection at the end
     *
     */
    public function __destruct(){
        parent::close();
    }
}