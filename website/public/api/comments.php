<?php

use chardev\Ajax;
use chardev\Session;

require_once __DIR__ . "/../../app/bootstrap.php";

Session::startBackendSession();

if (isset($_GET['profile'])) {
    $arr = array(
        "comments" => array(),
        "page" => 1,
        "page_count" => 1
    );

    echo json_encode($arr);
} else if (isset($_POST['profile'])) {
    try {

//        if (!isset($_POST['content'])) {
//            throw new \Exception("The content may not be empty!");
//        }
//
//        if (!isset($_SESSION['user_id'])) {
//            Ajax::dieOnError("You are not logged in!");
//        }
//        $user_data = new user_data($_SESSION['user_id']);
//
//        $comments->addCommentToCharacter((int)$_POST['character'], $user_data->get_id(), $_POST['content']);
    } catch (\Exception $e) {
        Ajax::dieOnException($e);
    }
}