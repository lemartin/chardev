<?php

require_once('cpa_client.php');
require_once('../common.php');
require_once('../db.php');

$client = new cpa_client( null, null );

// echo $client->get_item(62023);

$cp_json = $client->get_profile( 
	"Hans",//"Rebirthh", 
	"Stormrage",//"眾星之子", 
	cpa_client::REGION_US,
	array(
		cpa_client::PROFILE_ITEMS, 
		cpa_client::PROFILE_TALENTS, 
		cpa_client::PROFILE_PROFESSIONS
	)
);

echo $cp_json;


//$error = "";
//get_battlenet_profile( ARMORY_IMPORT_REGION_EU, "Azshara", "Aiijah", $error )

?>