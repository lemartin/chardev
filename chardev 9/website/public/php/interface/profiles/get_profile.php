<?php

require_once '../../../../app/chardev/Autoloader.php';

use chardev\backend\UserDatabase;

$id = $_GET['id'] ? json_decode($_GET['id']) : null;
echo json_encode(array( 'character' => UserDatabase::getInstance()->getProfile($id), 'meta_data' => null));