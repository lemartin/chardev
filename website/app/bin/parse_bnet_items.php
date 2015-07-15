<?php

use chardev\backend\Database;
use chardev\backend\DatabaseHelper;

require __DIR__ . '/../bootstrap.php';

$stmt = DatabaseHelper::query(Database::getConnection(), "SELECT * FROM chardev_devel.`bnet_items` WHERE json NOT LIKE \"\" ORDER BY ID DESC LIMIT 0,100");

while ($record = $stmt->fetch()) {
    $obj = json_decode($record['Json']);

    //var_dump($obj);

    echo $obj->id . " ";
    var_dump($obj->itemSource);
}