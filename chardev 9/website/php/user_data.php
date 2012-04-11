<?php

require_once 'db.php';
require_once('cpa_client/cpa_client.php');
require_once('bnet_auth.php');
require_once('battlenet_profile.php');


class user_data {

	private $id;
	private $data;
	
	

	public function __construct( $id ) {
	
		if( ! $id ) {
			throw new Exception("Invalid UserID");
		}
	
		$this->id = (int)$id;
		
		$this->data = mysql_fetch_assoc(mysql_query(
			'SELECT * FROM chardev.`user` u LEFT JOIN chardev_user.`user_data` ud ON u.`userID` = ud.`UserID` WHERE u.`userID`='.(int)$id
		));
		
		$this->donation = mysql_fetch_assoc(mysql_query(
			'SELECT * FROM chardev.`donations` WHERE `userID`='.(int)$id
		));
		
		if( ! $this->data ) {
			throw new Exception("Invalid UserID");
		}
	}
	
	public function get_id () {
		return $this->id;
	}
	
	public function get_joined() {
		return $this->data['timestamp'];
	}
	
	public function get_name () {
		return $this->data['name'];
	}

	public function get_region () {
		return $this->data['Region'];
	}

	public function get_avatar () {
		return $this->data['Avatar'];
	}

	public function get_language () {
		return $this->data['Language'];
	}
	
	public function get_forum_signature() {
		return $this->data['ForumSignature'];
	}
	
	public function get_role() {
		return $this->data['role'];
	}
	
	public function is_admin() {
		return $this->data['role'] == 10;
	}
	
	public function has_donated() {
		return $this->donation && true;
	}
	
	public function get_battlenet_profiles () {
	
		$result = mysql_query('
			SELECT * FROM 
				chardev_user.`userbattlenetprofilerelation` ubnpr 
				INNER JOIN chardev_user.`battlenetprofile` bnp ON ubnpr.`battlenetprofileID` = bnp.`ID` 
			WHERE `UserID` ='.(int) $this->id
		);
	
		$profiles = array();;
		while( $record = mysql_fetch_assoc($result) ) {
			$profiles[] = array( 
				"Name" => $record['Name'],
				"Realm" => $record['Realm'],
				"Region" => $record['Region'],
				"CharacterRaceID" => (int)$record['CharacterRaceID'],
				"CharacterClassID" => (int)$record['CharacterClassID'],
				"Level" => (int)$record['Level'] 
			);
		}
		
		return $profiles;
	}

	public function add_battlenet_profile( $name, $realm, $region ) {

		try {
			$character = new battlenet_profile( $name, $realm, $region );
		}
		catch( Exception $e ) {
			throw new UnableToValidateProfileException( $name, $realm, $region, $e );
		}

		$result = mysql_query('
			SELECT * FROM 
				chardev_user.`userbattlenetprofilerelation`
			WHERE 
				`UserID` ='.(int) $this->id." AND 
				`battlenetprofileID` ='".(int)$character->get_cached_profile_id()."'"
		);
		echo mysql_error();
		$already_added = false;
		
		$character->write_to_cache();
		
		if( $record = mysql_fetch_assoc($result) ) {
			$already_added = true;		
		}
		else {
			$id = $character->get_cached_profile_id();
			mysql_query("INSERT INTO chardev_user.`userbattlenetprofilerelation` VALUES (".(int)$this->id.",".(int)$id.")");
		}
		
		if( $already_added ) {
			throw new ProfileAlreadyAddedException( $name, $realm, $region );
		}
	}
	
	public function remove_battlenet_profile( $name, $realm, $region ) {
		$result = mysql_query("
			DELETE FROM 
				chardev_user.`userbattlenetprofilerelation`
			WHERE 
				`UserID` =".(int) $this->id." AND 
				`battlenetprofileID` IN ( 
					SELECT `ID` FROM chardev_user.`battlenetprofile` WHERE
						`Name` ='".mysql_real_escape_string($name)."' AND
						`Realm` ='".mysql_real_escape_string($realm)."' AND
						`Region` ='".mysql_real_escape_string($region)."'
					)"
		);
	}
	
	public function set_language( $language ) {
		return $this->set_chardev_user_data( "Language", $language );
	}
	
	public function set_forum_signature( $signature ) {
		return $this->set_chardev_user_data( "ForumSignature", $signature );
	}
	
	public function set_region( $region ) {
		return $this->set_chardev_user_data( "Region", $region );
	}
	
	public function set_avatar( $avatar ) {
		return $this->set_chardev_user_data( "Avatar", $avatar );
	}
	
	private function set_chardev_user_data( $key, $value ) {
		$record = mysql_fetch_assoc(mysql_query(
			"SELECT `".$key."` 
			FROM chardev_user.`user_data` 
			WHERE `UserID`=".(int)$_SESSION['user_id'] 
		));
	
		if( !$record ) {
			mysql_query(
				"INSERT INTO chardev_user.`user_data` (`UserID`) VALUES (".(int)$_SESSION['user_id'].")"
			);
		}
	
		mysql_query( 
			"UPDATE chardev_user.`user_data` 
			SET `".$key."`='" . mysql_real_escape_string( $value ) . "' 
			WHERE `UserID`=".(int)$_SESSION['user_id'] 
		);
		
		$record = mysql_fetch_assoc(mysql_query(
			"SELECT `".$key."` 
			FROM chardev_user.`user_data` 
			WHERE `UserID`=".(int)$_SESSION['user_id'] 
		));
		
		return $record[$key];
	}
} 
class UnableToValidateProfileException extends Exception {
	private $msg;

	public function __construct( $name, $realm, $region, Exception $cause ) {
		$this->msg = "Unable to validate existance of given profile ({$name}, {$region}-{$realm})";
		parent::__construct( $this->msg, 0, $cause );
	}
	
	public function __toString() {
		return $this->msg;
	}
}
class ProfileAlreadyAddedException extends Exception {
	private $msg;
	
	public function __construct( $name, $realm, $region, Exception $cause = null ) {
		$this->msg = "The profile was already added ({$name}, {$region}-{$realm})";
		parent::__construct( $this->msg, 0, $cause );
	}
	
	public function __toString() {
		return $this->msg;
	}
}
?>