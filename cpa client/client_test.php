<?php

require_once('cpa_client.php');

$client = new cpa_client( null, null );

// echo $client->get_item(62023);

echo $client->get_profile( 
	"Aiijah", 
	"Azshara", 
	cpa_client::REGION_EU,
	array(
		cpa_client::PROFILE_ITEMS, 
		cpa_client::PROFILE_TALENTS, 
		cpa_client::PROFILE_PROFESSIONS
	)
);

?>