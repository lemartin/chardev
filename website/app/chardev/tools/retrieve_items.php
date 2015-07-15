<?php

	use chardev\backend\Database;

	use chardev\backend\DatabaseHelper;
	use chardev\profiles\CommunityPlatformClient;

	require_once __DIR__ . '/../../../BNET_KEYS.inc';
	require_once __DIR__ . '/../Autoloader.php';
	
	$client = new CommunityPlatformClient(BNET_PRIVATE_KEY, BNET_PUBLIC_KEY);
	
	$db = Database::getConnection();
	
	$stmt = DatabaseHelper::query($db, "SELECT `ID` FROM chardev_cataclysm.`item` LIMIT ". $_SERVER['argv'][1] . "," . $_SERVER['argv'][2]);
	
	while( $record = $stmt->fetch()) {
		DatabaseHelper::execute(
				$db, 
				"INSERT INTO chardev_devel.`bnet_items` VALUES (?,?)",
				array(
						$record['ID'],
						$client->getItem($record['ID'])
				)
		);
	}