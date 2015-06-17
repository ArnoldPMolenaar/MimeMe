<?php
require_once "../initialize.php";

$method = $_GET['method'];
$output = null;

if($method == 'set' || $method == 'update'){
    $instagramUsername = str_replace('_', ' ', $_GET['instagramusername']);
    $instagramId = $_GET['instagramid'];
    $instagramPicture = $_GET['instagrampicture'];
    $instagramName = str_replace('_', ' ', $_GET['instagramname']);
    $password = str_replace('_', ' ', $_GET['password']);
    $rank = $_GET['rank'];
}

if(isset($_GET['id'])){
    $id = $_GET['id'];
} else {
    $id = null;
}

if($method == 'get') {
    if ($id == null) {
        $output = $databaseExtension->getUsers();
    } else {
        $output = $databaseExtension->getUser($id);
    }
}
else if($method == 'set'){
    $output = $databaseExtension->setUser($instagramUsername, $instagramId, $instagramPicture, $instagramName, $password);
}
else if($method == 'update'){
    $output = $databaseExtension->updateUser($id, $instagramUsername, $instagramId, $instagramPicture, $instagramName, $password, $rank);
}
else if($method == 'login'){
    $loginName = $_GET['instagramname'];
    $loginPassword = str_replace('_', ' ', $_GET['password']);
    $output = $databaseExtension->getUserLogin($loginName, $loginPassword);
}

print json_encode($output);
