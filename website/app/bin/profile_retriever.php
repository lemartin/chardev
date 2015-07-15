<?php

require __DIR__ . '/../bootstrap.php';
require __DIR__ . '/../resources/bootstrap.php';

$dr = new \chardev\util\DataRetriever();

$names = require __DIR__ . "/res/names.inc";

$i = 16;
$dr->retrieveProfiles( array_slice( $names, $i * 100, ( $i + 1 ) * 100 - 1));