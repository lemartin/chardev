<?php
	include_once 'db.php';
	include_once 'user_data.php';
	include_once 'common.php';
	
	$ud = new user_data(1);
	
	//echo json_encode($ud->get_battlenet_profiles());
	
	try {
		$ud->add_battlenet_profile( "Aiijah", "Azshara", "eu" );
	}
	catch( Exception $e ) {
		echo $e;
		echo "Unable to add profile!";
	}
?>