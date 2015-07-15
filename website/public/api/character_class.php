<?php

require_once __DIR__ . "/../../app/bootstrap.php";

chardev\Session::startBackendSession();


if (!isset($_GET["id"])) {
    \chardev\Ajax::dieOnError("No character class ID set!");
}

echo json_encode(chardev\backend\data\CharacterClassData::getInstance()->fromId((int)$_GET["id"]));