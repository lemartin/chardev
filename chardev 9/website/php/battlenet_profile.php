<?php

require_once('cpa_client/cpa_client.php');
require_once('bnet_auth.php');

class battlenet_profile {
	private $character_race;
	private $character_class;
	private $level;
	private $name, $realm, $region;
	
	private $profile;
	
	public function __construct( $name, $realm, $region ) {
		
		$client = new cpa_client( BNET_PRIVATE_KEY, BNET_PUBLIC_KEY );
		try {
			$json = $client->get_profile( 
				$name, 
				$realm, 
				$region,
				array(
					cpa_client::PROFILE_ITEMS, 
					cpa_client::PROFILE_TALENTS, 
					cpa_client::PROFILE_PROFESSIONS
			));
		}
		catch( Exception $e ) {
			throw new UnableToCreateProfileException($name, $realm, $region, $e);
		}
		
		if( !$json ) {
			throw new UnableToCreateProfileException($name, $realm, $region);
		}
		
		$this->name = $name;
		$this->realm = $realm;
		$this->region = $region;
		
		$this->init( json_decode($json) );
	}
	
	public function write_to_cache() {
		$id = $this->get_cached_profile_id();
		
		if( $id != 0 ) {
			$action_str = "REPLACE";
			$id_str = (int)$id;
		}
		else {
			$action_str = "INSERT";
			$id_str = "NULL";
		}
		
		mysql_query($action_str." INTO chardev_user.`battlenetprofile` VALUES (".
			"'".$id_str."',".
			"'".mysql_real_escape_string($this->name)."',".
			"'".mysql_real_escape_string($this->realm)."',".
			"'".mysql_real_escape_string($this->region)."',".
			"'".mysql_real_escape_string($this->character_race) ."',".
			"'".mysql_real_escape_string($this->character_class) ."',".
			"'".mysql_real_escape_string($this->level) ."',".
			"'".mysql_real_escape_string(serialize($this->profile)) ."'".
		")");
		
		$e = mysql_error();
		if( $e ) {
			throw new Exception($e);
		}
	}
	
	public function is_cached() {
		return $this->get_cached_profile_id() > 0;
	}
	
	public function get_cached_profile_id() {
		$result = mysql_query("
			SELECT * FROM chardev_user.`battlenetprofile` WHERE 
				`Name` LIKE '".mysql_real_escape_string($this->name)."' AND
				`Realm` LIKE '".mysql_real_escape_string($this->realm)."' AND
				`Region` LIKE '".mysql_real_escape_string($this->region)."'
			"
		);
		echo mysql_error();
		
		if( $record = mysql_fetch_assoc($result) ) {
			return (int)$record['ID'];
		}
		else {
			return 0;
		}
	}
	
	private function init( $profile ) {
		$this->profile = $profile;
	
		$this->character_race = (int)$profile->race;
		$this->character_class = (int)$profile->class;
		$this->level = (int)$profile->level;
	}
	
	public function get_character_class() {
		return $this->character_class;
	}
	public function get_character_race() {
		return $this->character_race;
	}
	public function get_level() {
		return $this->level;
	}
}


class UnableToCreateProfileException extends Exception {

	private $name, $realm, $region, $msg;

	public function __construct( $name, $realm, $region, Exception $cause = null ) {
		$this->name = $name;
		$this->realm = $realm;
		$this->region = $region;
		$this->msg = "Unable to create profile for ({$name}, {$region}-{$realm})";
	
		parent::__construct( $this->msg, 0, $cause );
	}
	public function __toString() {
		return $this->msg;
	}
	public function get_name() { return $this->name;}
	public function get_realm() { return $this->realm;}
	public function get_region() { return $this->region;}
}
?>