<?php

require_once __DIR__ . "/../../app/bootstrap.php";

chardev\Session::startBackendSession();

echo json_encode(chardev\backend\data\Buffs::getInstance()->get());