<?php
//	Author: Martin WaÃŸmann
//	Date: 02 Aug 2001
//
//	Usage of cpa_client
//
//
//	cpa_client File
require_once('../common.php');
require_once('../db.php');
require_once('../bnet_auth.php');
require_once('cpa_client.php');

//
//
//	Your private and public keys go here, if you have none
//	leave these values null, the client will then do 
//	un-authenticated requests

//
//
//	Create a new client instance
$client = new cpa_client( BNET_PRIVATE_KEY, BNET_PUBLIC_KEY );
//
//	Set the protocol to either
//		cpa_client::PROTOCOL_HTTP
//	or
//		cpa_client::PROTOCOL_HTTPS
//	It is recommended to use HTTPS with authenticated requests.
//	See: http://blizzard.github.com/api-wow-docs/#id3682026
//
$client->set_protocol( cpa_client::PROTOCOL_HTTP);
//
//
//	Example item retrieval, only works with authentication
// echo $client->get_item(62023);
//
//
//	Example profile request, notice that the cpa_client requires 
//	utf8 encoded character and server name. To request more profile
//	data use the following predefined constants.
//
//		cpa_client::PROFILE_GUILD
//		cpa_client::PROFILE_STATS
//		cpa_client::PROFILE_TALENTS
//		cpa_client::PROFILE_ITEMS
//		cpa_client::PROFILE_REPUTATION
//		cpa_client::PROFILE_TITLES
//		cpa_client::PROFILE_PROFESSIONS
//		cpa_client::PROFILE_APPEARANCE
//		cpa_client::PROFILE_COMPANIONS
//		cpa_client::PROFILE_MOUNTS
//		cpa_client::PROFILE_PETS
//		cpa_client::PROFILE_ACHIEVEMENTS
//		cpa_client::PROFILE_PROGRESSION
//
//	See: http://blizzard.github.com/api-wow-docs/#id3682404
//
//	Region constants are 
//		cpa_client::REGION_EU
//		cpa_client::REGION_US
//		cpa_client::REGION_KR
//		cpa_client::REGION_CN
//		cpa_client::REGION_TW
//
echo $client->get_profile( 
	"Sélénïa", 
	"medivh", 
	cpa_client::REGION_EU,
	array(
		cpa_client::PROFILE_ITEMS, 
		cpa_client::PROFILE_TALENTS, 
		cpa_client::PROFILE_PROFESSIONS
	)
);
//
//
//
?>