<?php 

require_once '../../app/chardev/Autoloader.php';

chardev\Session::startBackendSession();

echo json_encode(chardev\backend\data\TalentsData::getInstance()->fromId((int)$_GET["id"]));