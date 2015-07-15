<?php
namespace chardev\profiles;

/**
 * Implementation of a client using the Blizzard Community Platform API ({@link
 * http://blizzard.github.com/api-wow-docs/}) for retrieving battle.net
 * character profiles for WoW.
 *
 * @author Martin Waßmann
 */
class CommunityPlatformClient
{
	//
	// Region of the character profile
	//
	/**
	 * Europe
	 *
	 * @var string
	 */
	const REGION_EU = 'eu';
	
	/**
	 * US and Oceanic
	 *
	 * @var string
	 */
	const REGION_US = 'us';
	
	/**
	 * Korea
	 *
	 * @var string
	 */
	const REGION_KR = 'kr';
	
	/**
	 * China
	 *
	 * @var string
	 */
	const REGION_CN = 'cn';
	
	/**
	 * Taiwan
	 *
	 * @var string
	 */
	const REGION_TW = 'tw';
	//
	// Data to retrieve
	//
	/**
	 * Current guild - A summary of the guild that the character belongs to.
	 * If
	 * the character does not belong to a guild and this field is requested,
	 * this field will not be exposed.
	 *
	 * @var string
	 */
	const PROFILE_GUILD = 'guild';
	
	/**
	 * Stats - A map of character attributes and stats.
	 *
	 * @var string
	 */
	const PROFILE_STATS = 'stats';
	
	/**
	 * Talents - A list of talent structures.
	 *
	 * @var string
	 */
	const PROFILE_TALENTS = 'talents';
	
	/**
	 * Equipped items - A list of items equipted by the character.
	 * Use of this
	 * field will also include the average item level and average item level
	 * equipped for the character.
	 *
	 * @var string
	 */
	const PROFILE_ITEMS = 'items';
	
	/**
	 * Gained reputation - A list of the factions that the character has an
	 * associated reputation with.
	 *
	 * @var string
	 */
	const PROFILE_REPUTATION = 'reputation';
	
	/**
	 * Gained titles - A list of the titles obtained by the character including
	 * the currently selected title.
	 *
	 * @var string
	 */
	const PROFILE_TITLES = 'titles';
	
	/**
	 * Trained professions - A list of the character's professions.
	 * It is
	 * important to note that when this information is retrieved, it will also
	 * include the known recipes of each of the listed professions.
	 *
	 * @var string
	 */
	const PROFILE_PROFESSIONS = 'professions';
	
	/**
	 * Character appearance - A map of values that describes the face, features
	 * and helm/cloak display preferences and attributes.
	 *
	 * @var string
	 */
	const PROFILE_APPEARANCE = 'appearance';
	
	/**
	 * Vanity pets - A list of all of the non-combat pets obtained by the
	 * character.
	 *
	 * @var string
	 */
	const PROFILE_COMPANIONS = 'companions';
	
	/**
	 * Mounts - A list of all of the mounts obtained by the character.
	 *
	 * @var string
	 */
	const PROFILE_MOUNTS = 'mounts';
	
	/**
	 * Combat pets - A list of all of the combat pets obtained by the character.
	 *
	 * @var string
	 */
	const PROFILE_PETS = 'pets';
	
	/**
	 * Earned achievements - A map of achievement data including completion
	 * timestamps and criteria information.
	 *
	 * @var string
	 */
	const PROFILE_ACHIEVEMENTS = 'achievements';
	
	/**
	 * PvE progress - A list of raids and bosses indicating raid progression and
	 * completedness.
	 *
	 * @var string
	 */
	const PROFILE_PROGRESSION = 'progression';
	
	/**
	 * PvP info - A map of pvp information including arena team membership and
	 * rated battlegrounds information.
	 *
	 * @var string
	 */
	const PROFILE_PVP = 'pvp';
	
	/**
	 * Completed quests - A list of quests completed by the character.
	 *
	 * @var string
	 */
	const PROFILE_QUESTS = 'quests';
	//
	// Protocols to use
	//
	/**
	 * HTTP
	 *
	 * @var string
	 */
	const PROTOCOL_HTTP = "http";
	
	/**
	 * HTTPS - default
	 *
	 * @var string
	 */
	const PROTOCOL_HTTPS = "https";
	
	/**
	 * Public key for signed requests
	 *
	 * @var string
	 */
	protected $publicKey = null;
	
	/**
	 * Private key for signed requests
	 *
	 * @var string
	 */
	protected $privateKey = null;
	
	/**
	 * Protocol for requests, HTTPS is default
	 *
	 * @var string
	 */
	protected $protocol = self::PROTOCOL_HTTPS;
	
	/**
	 * Creates a new instance
	 *
	 * @param $privateKey string
	 *       	 Private key to use for signed requests or <code>null</code> to
	 *       	 use unsigned requests
	 * @param $publicKey string
	 *       	 Public key to use or <code>null</code> to use unsigned
	 *       	 requests
	 */
	public function __construct($privateKey, $publicKey)
	{
		$this->privateKey = $privateKey;
		$this->publicKey = $publicKey;
	}
	
	/**
	 * Sets the protocol for requests to armory, https is default.
	 *
	 * Protocols are (case-sensitive): http, https
	 * Class constants: PROTOCOL_HTTP, PROTOCOL_HTTPS
	 *
	 * @param $protocol string       	
	 * @throws \Exception
	 */
	public function setProtocol($protocol)
	{
		switch ($protocol)
		{
			case self::PROTOCOL_HTTP :
			case self::PROTOCOL_HTTPS :
				$this->protocol = $protocol;
				break;
			default :
				throw new \Exception ( "Invalid protocol: " . $protocol . "!" );
		}
	}
	
	/**
	 * Returns the item identified by given ID as JSON encoded ITEM.
	 *
	 * @param $itemId int
	 * @throws \InvalidArgumentException If the ID is lower than or equal to
	 *         zero
	 * @return string JSON encoded ITEM
	 */
	public function getItem($itemId)
	{
		
		if (( int ) $itemId < 1)
		{
			throw new \InvalidArgumentException ( 'Invalid item ID: ' . $itemId );
		}
		
		return $this->request ( $this->protocol . '://eu.battle.net', '/api/wow/item/' . ( int ) $itemId, '' );
	}

    /**
     * Retrieves the quest given by its ID as JSON
     *
     * @param $questId int
     * @return string JSON encoded quest
     * @throws \InvalidArgumentException if the quest id is lower or equal to 0
     */
    public function getQuest($questId) {
        if (( int ) $questId < 1)
        {
            throw new \InvalidArgumentException ( 'Invalid quest ID: ' . $questId );
        }

        return $this->request ( $this->protocol . '://eu.battle.net', '/api/wow/quest/' . ( int ) $questId, '' );
    }
	
	/**
	 * Returns a list of all available realms for a given region
	 *
	 * Regions are (case-sensitve): us, eu, kr, cn, tw
	 * Class constants: REGION_US, REGION_EU, REGION_KR, REGION_CN, REGION_TW
	 *
	 * @param $region string
	 *       	 Two letter region identifier
     * @return string
     */
	public function getRealmList($region)
	{
		$this->validateRegion ( $region );
		
		return $this->request ( $this->protocol . '://' . $region . '.battle.net', '/api/wow/realm/status', '' );
	}
	
	/**
	 * Validates given region
	 *
	 * @param $region string
	 * @throws \Exception If given region is invalid
	 */
	private function validateRegion($region)
	{
		switch ($region)
		{
			case self::REGION_EU :
				break;
			case self::REGION_US :
				break;
			case self::REGION_KR :
				break;
			case self::REGION_CN :
				break;
			case self::REGION_TW :
				break;
			default :
				throw new \Exception ( "Illegal region: " . $region );
		}
	}
	
	/**
	 * Retrieves the character profile identified by character name, realm and
	 * region.
	 * By setting the fields parameter you may specify which data is retrieved
	 * along with it.
	 *
	 * For available fields see the class constants PROFILE_* and their
	 * description or visit {@link http://blizzard.github.com/api-wow-docs/}.
	 *
	 * @param $name string
	 *       	 Character name
	 * @param $realm string
	 *       	 Realm
	 * @param $region string
	 *       	 Region
	 * @param $fields array|null
	 *       	 Data to retrieve
	 * @throws \Exception
	 * @return object The requested character profile
	 */
	public function getProfile($name, $realm, $region, $fields = null)
	{
		$this->validateRegion ( $region );
		
		if( mb_strlen($name) < 2 || mb_strlen($realm) < 2 ) {
			throw new \Exception("Invalid inputs: name or server too short! (name:{$name}, server:{$realm})");
		} 
		
		$fields_str = "";
		if ($fields != null)
		{
			for($i = 0; $i < count ( $fields ); $i ++)
			{
				switch ($fields [$i])
				{
					case self::PROFILE_GUILD :
						break;
					case self::PROFILE_STATS :
						break;
					case self::PROFILE_TALENTS :
						break;
					case self::PROFILE_ITEMS :
						break;
					case self::PROFILE_REPUTATION :
						break;
					case self::PROFILE_TITLES :
						break;
					case self::PROFILE_PROFESSIONS :
						break;
					case self::PROFILE_APPEARANCE :
						break;
					case self::PROFILE_COMPANIONS :
						break;
					case self::PROFILE_MOUNTS :
						break;
					case self::PROFILE_PETS :
						break;
					case self::PROFILE_ACHIEVEMENTS :
						break;
					case self::PROFILE_PROGRESSION :
						break;
					default :
						throw new \Exception ( "Illegal profile field: " . $fields [$i] );
				}
			}
			$fields_str = '?fields=' . implode ( ',', $fields );
		}
		
		$data = $this->request ( $this->protocol . '://' . $region . '.battle.net', '/api/wow/character/' . $this->encodeRealm ( $realm ) . '/' . self::encodeName ( $name ), $fields_str );
		
		return $data;
	}
	
	/**
	 * Encodes a realm name.
	 * Essentially that means stripping all single quotes, replacing spaces
	 * by hyphens and using urlencode.
	 *
	 * @param
	 *       	 string realm Realm name to encode
	 * @return string Encoded realm name
	 *        
	 */
	public static function encodeRealm($realm)
	{
		$realm = mb_ereg_replace ( '\s*\(Português\)', "-portugues", $realm, "i" );
		
		return urlencode ( mb_strtolower ( mb_ereg_replace ( "'", "", mb_ereg_replace ( " ", "-", $realm ) ), "UTF-8" ) );
	}
	
	/**
	 * Encodes a character name by converting it to lower case and using
	 * urlencode.
	 *
	 * @param $name string
	 *       	 Character name to encode
	 * @return string Encoded character name
	 */
	public static function encodeName($name)
	{
		return urlencode ( mb_strtolower ( $name, "UTF-8" ) );
	}
	
	/**
	 * Creates a signature by hashing a string containing the date and requested
	 * url with the private key.
	 *
	 * @param string $url Requested URL
	 * @param string $method HTTP method to use
	 * @param string $dateString Date string
     * @return string
     */
	private function createSignature($url, $method, $dateString)
	{
		
		$string = $method . "\n" . $dateString . "\n" . $url . "\n";
		
		return base64_encode ( hash_hmac ( 'sha1', $string, $this->privateKey, true ) );
	}
	
	/**
	 * Requests 
	 * 
	 * @param string $host
	 * @param string $url
	 * @param string $query
     * @return string
	 */
	private function request($host, $url, $query)
	{
		if ($this->privateKey != null && $this->publicKey != null)
		{
			return $this->signedRequest ( $host, $url, $query );
		} else
		{
			return @file_get_contents ( $host . $url . $query );
		}
	}
	
	private function signedRequest($host, $url, $query)
	{
		$dateString = gmdate ( "D, d M Y H:i:s T" );
		
		$signature = $this->createSignature ( $url, "GET", $dateString );
		
		$opts = array ('http' => array ('method' => "GET", 'header' => "Date: " . $dateString . "\r\n" . "Authorization: BNET " . $this->publicKey . ":" . $signature . " \r\n" ) );
		
		$context = stream_context_create ( $opts );

		return @file_get_contents ( $host . $url . $query, false, $context );
	}
}

?>