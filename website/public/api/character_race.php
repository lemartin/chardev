<?php

require_once '../../app/chardev/Autoloader.php';

chardev\Session::startBackendSession();

echo json_encode(chardev\backend\data\CharacterRaceData::getInstance()->fromId(isset($_GET["id"]) ? (int)$_GET["id"] : 0));