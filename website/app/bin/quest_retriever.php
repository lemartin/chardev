<?php

require __DIR__ . '/../bootstrap.php';
require __DIR__ . '/../resources/BNET_KEYS.inc';

$dr = new \chardev\util\DataRetriever();
$dr->setCpc(new \chardev\profiles\CommunityPlatformClient(BNET_PRIVATE_KEY, BNET_PUBLIC_KEY));
$dr->retrieveQuests(33000, 36000);