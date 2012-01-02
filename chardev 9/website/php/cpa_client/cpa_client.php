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
	
	const PROTOCOL_HTTP = "http";
	const PROTOCOL_HTTPS = "https";

	protected $public_key = null;
	protected $private_key = null;
	protected $protocol = cpa_client::PROTOCOL_HTTPS;

	public function __construct( $private_key, $public_key ) {
		$this->private_key = $private_key;
		$this->public_key = $public_key;
	}
	
	public function set_protocol( $protocol ) {
		switch( $protocol ) {
			case cpa_client::PROTOCOL_HTTP:
			case cpa_client::PROTOCOL_HTTPS:
				$this->protocol = $protocol;
				break;
			default:
				throw new Exception("Invalid protocol: ".$protocol."!");
		}
	}
	
	public function get_item( $itemID ) {
		
		if ( ! is_numeric($itemID) ) {
			throw new Exception('Invalid ItemID: ' . $itemID);
		}
	
		return $this->request( 
			$this->protocol.'://eu.battle.net', 
			'/api/wow/data/item/' . (int) $itemID,
			''
		);
	}
	
	public function get_realm_list( $region ) {
		
		$this->validate_region( $region );
	
		return $this->request( 
			$this->protocol.'://'.$region.'.battle.net', 
			'/api/wow/realm/status',
			''
		);
	}
	
	private function validate_region( $region ) {
		switch( $region ) {
			case cpa_client::REGION_EU: break;
			case cpa_client::REGION_US: break;
			case cpa_client::REGION_KR: break;
			case cpa_client::REGION_CN: break;
			case cpa_client::REGION_TW: break;
			default:
				throw new Exception("Illegal region: " . $region);
		}
	}
	
	public function get_profile( $name, $server, $region, $fields = null ) {
		
		$this->validate_region( $region );
		
		$fields_str = "";
		if( $fields != null ) {		
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
			$fields_str = '?fields=' . implode( ',', $fields );
		}
	
		return $this->request( 
			$this->protocol.'://' . $region . '.battle.net', 
			'/api/wow/character/' . 
				$this->encodeServer($server) . 
				'/' . 
				$this->encodeName($name),
			$fields_str
		);
	}
	
	private function encodeServer( $server ) {
		return urlencode(mb_strtolower(mb_ereg_replace("'","",mb_ereg_replace(" ","-",$server)),"UTF-8"));
	}
	
	private function encodeName( $name ) {
		return urlencode(mb_strtolower($name,"UTF-8"));
	}
	
	private function create_signature( $url, $method, $date_string ) {
		
		$string = $method . "\n" . $date_string . "\n" . $url .	"\n";

		return base64_encode(hash_hmac('sha1', $string, $this->private_key, true));
	}
	
	private function request( $host, $url, $query ) {
		if(  $this->private_key != null && $this->public_key != null ) {
			return $this->signed_request( $host, $url, $query );
		}
		else {
			return @file_get_contents(
				$host . $url . $query
			);
		}
	}
	
	private function signed_request( $host, $url, $query ) {
		$date_string = gmdate("D, d M Y H:i:s T");
	
		$signature = $this->create_signature( $url, "GET", $date_string );
		
		$opts = array(
			'http'=>array(
				'method'=>"GET",
				'header'=>"Date: " . $date_string . "\r\n" .
					"Authorization: BNET " . 
					$this->public_key . ":" . $signature . " \r\n"
		));

		$context = stream_context_create($opts);
		return @file_get_contents( $host . $url . $query, false, $context);
	}
}

?>