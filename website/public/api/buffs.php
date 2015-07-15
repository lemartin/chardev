<?php 

require_once '../../app/chardev/Autoloader.php';

chardev\Session::startBackendSession();

echo json_encode(chardev\backend\data\Buffs::getInstance()->get());