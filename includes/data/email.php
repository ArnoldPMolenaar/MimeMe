<?php
require_once "../initialize.php";

$method = $_POST['method'];
$output = null;

if($method == 'send'){
    $output = $Mail = new Mail('0882275@hr.nl', $_POST['email'], $_POST['subject'], $_POST['name'], $_POST['message']);
}

print json_encode($output);