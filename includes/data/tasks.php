<?php
require_once "../initialize.php";

$method = $_GET['method'];
$output = null;

if($method == 'get'){
    if(isset($_GET['id'])){

    } else {
        $output = $databaseExtension->getTasks();
    }
}
else if($method == 'set'){
    $output = $databaseExtension->setTask($_GET['accountid'], $_GET['title'], $_GET['description'], $_GET['hashtag']);
}
else if($method == 'exists'){
    $output = $databaseExtension->existsTask($_GET['hashtag']);
}

print json_encode($output);