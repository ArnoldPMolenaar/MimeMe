<?php
require_once "../initialize.php";

$method = $_GET['method'];
$output = null;

if($method == 'get'){
    $output = $databaseExtension->updateRankingOfUsers();
    if($output == true){
        $output = $databaseExtension->getTasksCount();
    }
}

print json_encode($output);