<?php

require_once __DIR__ . "/../../app/bootstrap.php";

chardev\Session::startBackendSession();

echo json_encode(chardev\backend\data\CharacterRaceData::getInstance()->fromId(isset($_GET["id"]) ? (int)$_GET["id"] : 0));