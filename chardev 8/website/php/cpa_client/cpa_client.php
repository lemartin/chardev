<?php

class cpa_client {

	const REGION_EU = 'eu';
	const REGION_US = 'us';
	const REGION_KR = 'kr';
	const REGION_CN = 'cn';
	const REGION_TW = 'tw';
	
	const PROFILE_GUILD = 'guild';
	const PROFILE_STATS = 'stats';
	const PROFILE_TALENTS = 'talents';
	const PROFILE_ITEMS = 'items';
	const PROFILE_REPUTATION = 'reputation';
	const PROFILE_TITLES = 'titles';
	const PROFILE_PROFESSIONS = 'professions';
	const PROFILE_APPEARANCE = 'appearance';
	const PROFILE_COMPANIONS = 'companions';
	const PROFILE_MOUNTS = 'mounts';
	const PROFILE_PETS = 'pets';
	const PROFILE_ACHIEVEMENTS = 'achievements';
	const PROFILE_PROGRESSION = 'progression';

	private $public_key = null;
	private $private_key = null;

	public function __construct( $private_key, $public_key ) {
		$this->private_key = $private_key;
		$this->public_key = $public_key;
	}
	
	public function get_item( $itemID ) {
		
		if ( ! is_numeric($itemID) ) {
			throw new Exception('Invalid ItemID: ' . $itemID);
		}
	
		return $this->request( 
			'http://eu.battle.net', 
			'/api/wow/data/item/' . (int) $itemID 
		);
	}
	
	public function get_profile( $name, $server, $region, $fields ) {
		
		switch( $region ) {
			case cpa_client::REGION_EU: break;
			case cpa_client::REGION_US: break;
			case cpa_client::REGION_KR: break;
			case cpa_client::REGION_CN: break;
			case cpa_client::REGION_TW: break;
			default:
				throw new Exception("Illegal region: " . $region);
		}
		
		for( $i = 0; $i < count($fields); $i++ ) {
			switch( $fields[$i] ) {
				case cpa_client::PROFILE_GUILD: break;
				case cpa_client::PROFILE_STATS: break;
				case cpa_client::PROFILE_TALENTS: break;
				case cpa_client::PROFILE_ITEMS: break;
				case cpa_client::PROFILE_REPUTATION: break;
				case cpa_client::PROFILE_TITLES: break;
				case cpa_client::PROFILE_PROFESSIONS: break;
				case cpa_client::PROFILE_APPEARANCE: break;
				case cpa_client::PROFILE_COMPANIONS: break;
				case cpa_client::PROFILE_MOUNTS: break;
				case cpa_client::PROFILE_PETS: break;
				case cpa_client::PROFILE_ACHIEVEMENTS: break;
				case cpa_client::PROFILE_PROGRESSION: break;
				default: 
					throw new Exception("Illegal profile field: " . $fields[$i]);
			}
		}
	
		return $this->request( 
			'http://' . $region . '.battle.net', 
			'/api/wow/character/' . 
				$this->encodeServer($server) . 
				'/' . 
				$this->encodeName($name) .
				'?fields=' . implode( ',', $fields )
		);
	}
	
	private function encodeServer( $server ) {
		return urlencode(mb_strtolower(str_replace(" ","-",$server),"UTF-8"));
	}
	
	private function encodeName( $name ) {
		return urlencode(mb_strtolower($name,"UTF-8"));
	}
	
	private function create_signature( $url, $method, $date_string ) {
		
		$string = $method + "\n" + $date_string + "\n" + $url + "\n";
	
		return hash_hmac('sha1', $this->private_key, $string);
	}
	
	private function request( $host, $url ) {
		if(  $this->private_key != null && $this->public_key != null ) {
			return $this->signed_request( $url );
		}
		else {
			return file_get_contents(
				$host . $url
			);
		}
	}
	
	private function signed_request( $host, $url ) {
		$date_string = date(DATE_RFC822);
	
		$signature = $this->create_signature( $url, "GET", $date_string );
		
		$opts = array(
			'http'=>array(
				'method'=>"GET",
				'header'=>"Date: " . $date_string . "\r\n" .
					"Authorization: BNET " . $this->public_key . ":" . $signature . " \r\n"
		));

		$context = stream_context_create($opts);

		return file_get_contents( $host . $url, false, $context);
	}
}

?>