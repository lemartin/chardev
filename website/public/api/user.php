<?php
	use chardev\backend\UserDatabase;

use chardev\Session;

require_once '../../app/chardev/Autoloader.php';
	
	use chardev\Ajax;
	
	chardev\Session::startBackendSession();
/*	
	if( isset($_GET['language']) ) {
		set_user_settings("language",(int)$_GET['language']);	
	}
*/	
	$ud = null;
	
	try {
		$user = chardev\Session::getLoggedInUser();
		
		if( isset($_POST['UserId']) && isset($_POST['Password'])) {
			$loggedInUser = Session::getLoggedInUser();
			
			if( ! $loggedInUser || $loggedInUser->getId() != $_POST['UserId']) {
				throw new \Exception("You are not allowed to change this password!");
			}
			
			if( ! $_POST['Password'] ) {
				throw new \Exception("The received password was empty!");
			}
			
			UserDatabase::getInstance()->changePassword($_POST['UserId'], $_POST['Password']);
		}
		else if( isset($_POST['UserName']) && isset($_POST['Password'])) {
			
			$loggedInUser = Session::logIn($_POST['UserName'], $_POST['Password'], isset($_POST['Cookie']) ? true : false);
			
			echo json_encode(array(
					"session_id" => session_id(),
					"user_id" => $loggedInUser->getId(),
					"user_name" => $loggedInUser->getName(),
					"user_data" => $loggedInUser->getJsUserData()
			));
		}
		else {
			if( isset($_GET['ForumSignature']) ) {
				echo json_encode($user->setForumSignature($_GET['ForumSignature']));
			}
			else if( isset($_GET['Region']) ) {
				echo json_encode($user->setRegion($_GET['Region']));
			}
			else if( isset($_GET['Avatar']) ) {
				echo json_encode($user->setAvatar($_GET['Avatar']));
			}
			else if( isset($_GET['Language']) ) {
				echo json_encode($user->setLanguage($_GET['Language']));
			}
			else if( isset($_GET['BattleNetProfiles']) ) {
				$data = json_decode($_GET['BattleNetProfiles']);
				if( $data == null ) {
					Ajax::dieOnError("Invalid data object format!");
				}
				
				if( isset($data->addBattleNetProfile)) {
					$add = $data->addBattleNetProfile;
					try {
						$user->addBattlenetProfile( $add->Name, $add->Realm, $add->Region );
						
						echo json_encode($user->getBattlenetProfiles());
					}
					catch( Exception $e ) {
						Ajax::dieOnException($e);
					}
				}
				else if( isset($data->removeBattleNetProfile) ) {
					$add = $data->removeBattleNetProfile;
					try {
						$user->removeBattlenetProfile( $add->Name, $add->Realm, $add->Region );
						
						echo json_encode($user->getBattlenetProfiles());
					}
					catch( Exception $e ) {
						Ajax::dieOnException($e);
					}
				}
			}
		}
	}
	catch( Exception $e ) {
		Ajax::dieOnException($e);
	}
	?>