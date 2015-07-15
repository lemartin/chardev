<?php

require_once __DIR__ . "/../../app/bootstrap.php";

\chardev\Session::startBackendSession();
//
$args = isset($_GET['a']) ? $_GET['a'] : "";
$flags = isset($_GET['f']) ? $_GET['f'] : "";
$order = isset($_GET['o']) ? $_GET['o'] : "";
$page = isset($_GET['p']) ? (int)$_GET['p'] : 1;
//
echo json_encode(\chardev\backend\data\ProfileListData::getInstance()->getProfiles($args, $flags, $order, $page));
