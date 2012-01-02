<?php
    session_start();
	require_once '../../db.php';
	require_once '../../common.php';
	require_once '../../user_data.php';
	require_once '../../ajax_response.php';

/*	
	if( isset($_GET['language']) ) {
		set_user_settings("language",(int)$_GET['language']);	
	}
*/	
	$ud = null;
	
	try {
		$ud = new user_data((int)$_SESSION['user_id']);
		
		if( isset($_GET['ForumSignature']) ) {
			echo json_encode($ud->set_forum_signature($_GET['ForumSignature']));
		}
		else if( isset($_GET['Region']) ) {
			echo json_encode($ud->set_region($_GET['Region']));
		}
		else if( isset($_GET['Avatar']) ) {
			echo json_encode($ud->set_avatar($_GET['Avatar']));
		}
		else if( isset($_GET['Language']) ) {
			echo json_encode($ud->set_language($_GET['Language']));
		}
		else if( isset($_GET['BattleNetProfiles']) ) {
			$data = json_decode($_GET['BattleNetProfiles']);
			if( $data == null ) {
				ajax_response::die_on_error("Invalid data object format!");
			}
			
			if( isset($data->addBattleNetProfile)) {
				$add = $data->addBattleNetProfile;
				try {
					$ud->add_battlenet_profile( $add->Name, $add->Realm, $add->Region );
					
					echo json_encode($ud->get_battlenet_profiles());
				}
				catch( Exception $e ) {
					ajax_response::die_on_exception($e);
				}
			}
			else if( isset($data->removeBattleNetProfile) ) {
				$add = $data->removeBattleNetProfile;
				try {
					$ud->remove_battlenet_profile( $add->Name, $add->Realm, $add->Region );
					
					echo json_encode($ud->get_battlenet_profiles());
				}
				catch( Exception $e ) {
					ajax_response::die_on_exception($e);
				}
			}
		}
	}
	catch( Exception $e ) {
		ajax_response::die_on_exception($e);
	}
?>