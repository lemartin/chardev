<?php

require __DIR__ . '/../bootstrap.php';

$start = time();
$dp = new \chardev\tools\DataParser();
$dp->parseProfiles();

echo "Finished after " . (time() - $start) . "s\n";

//$uri = "http://eu.battle.net/wow/en/character/mannoroth/Ry%C3%A2/simple";
//$dp->parseProfile($uri, 10, 2, 87, file_get_contents(__DIR__ . "/res/profile.inc"));

//var_dump(json_decode(file_get_contents(__DIR__ . "/res/json.json")));