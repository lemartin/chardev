<?php

namespace chardev\profiles;

use chardev\backend\Constants;
use chardev\backend\data\CharacterClassData;
use chardev\backend\data\CharacterRaceData;
use chardev\backend\data\GlyphData;
use chardev\backend\data\ItemData;
use chardev\backend\data\SpellItemEnchantmentData;

class BattleNetProfile
{	
	private $region;
	
	public function __construct( $name, $realm, $region ) {

        require_once __DIR__ . '/../../../resources/BNET_KEYS.inc';
	
		$client = new CommunityPlatformClient( BNET_PRIVATE_KEY, BNET_PUBLIC_KEY );
		try {
			$json = $client->getProfile(
					$name,
					$realm,
					$region,
					array(
							CommunityPlatformClient::PROFILE_ITEMS,
							CommunityPlatformClient::PROFILE_TALENTS,
							CommunityPlatformClient::PROFILE_PROFESSIONS
					));
		}
		catch( \Exception $e ) {
			throw new UnableToCreateProfileException($name, $realm, $region, $e);
		}
	
		if( !$json ) {
			throw new UnableToCreateProfileException($name, $realm, $region);
		}

		$this->region = $region;	
		$this->data = json_decode($json);
	}
	
	public function getCharacterClassId() {
		return (int)$this->data->class;
	}
	public function getCharacterRaceId() {
		return (int)$this->data->race;
	}
	public function getLevel() {
		return (int)$this->data->level;
	}
	public function getName() {
    	return mb_convert_case ( $this->data->name, MB_CASE_TITLE );
	}
	public function getRealm() {
		return mb_convert_case ( $this->data->realm, MB_CASE_TITLE );
	}
	public function getRegion() {
		return $this->region;
	}
	public function getProfileData() {
		return $this->data;
	}
    
    public function toChardevProfile() {
    	$char = array();
    	$char[0] = array(
    		$this->getName(),
    		$this->getRealm(),
    		CharacterRaceData::getInstance()->fromId($this->getCharacterRaceId()),
    		CharacterClassData::getInstance()->fromId($this->getCharacterClassId()),
    		$this->getLevel()
    	);
    	
    	$char[1] = array();
    	foreach( $this->data->items as $key=>$itm ) {
    	
    		if( ! isset(Constants::$slotNameToId[$key]) ) {
    			continue;
    		}
    	
    		$prm = $itm->tooltipParams;
    	
    		$reforge = null;
    		if( isset($prm->reforge) ) {
    			$reforge_id = (int)$itm->tooltipParams->reforge;
    				
    			$reduced_id = (int)floor( ($reforge_id - 113) / 7 );
    			$reduced = Constants::$reforgableStats[$reduced_id];
    			$added = $reforge_id - 113 - $reduced_id * 7;
    			$added += $added >= $reduced_id ? 1 : 0 ;
    			$added = Constants::$reforgableStats[$added];
    			$reforge = array($reduced,$added);
    		}
    	
    		$id = ItemData::getInstance();
    		
    		$char[1][Constants::$slotNameToId[$key]] = array(
    			$id->fromId( isset($itm->id)  ? (int)$itm->id  : 0  ),
    			$id->fromId( isset($prm->gem0)  ? (int)$prm->gem0  : 0  ),
    			$id->fromId( isset($prm->gem1)  ? (int)$prm->gem1  : 0  ),
    			$id->fromId( isset($prm->gem2)  ? (int)$prm->gem2  : 0  ),
    			SpellItemEnchantmentData::getInstance()->fromId( isset($prm->enchant) ? (int)$prm->enchant : 0 ),
    			$reforge, // chardev reforge
    			isset($prm->suffix)  ? (int)$prm->suffix  : 0, // random props
    			isset($prm->tinker) ? array(SpellItemEnchantmentData::getInstance()->fromId($prm->tinker)) : null
    		);
    	}
    	
    	$char[2] = "000000";
    	$char[3] = array();
    	$char[4] = -1;
    	
    	$active_talents = isset($this->data->talents[0]->selected) && $this->data->talents[0]->selected ? $this->data->talents[0] : $this->data->talents[1];
    	 
    	if( $active_talents ) {
    	
	    	foreach( $active_talents->talents as $talent ) {
	    		$char[2][$talent->tier] = $talent->column + 1; 
	    	}
	    	
	    	if(isset($active_talents->spec)) {
	    		$char[4] = $active_talents->spec->order;
	    	}
	    	
// 	    	$prime_glyphs = $active_talents->glyphs->prime;
	    	$major_glyphs = $active_talents->glyphs->major;
	    	$minor_glyphs = $active_talents->glyphs->minor;
	    	
	    	$gd = GlyphData::getInstance();

	    	for( $i = 0; $i < count($major_glyphs); $i++ ) {
	    		$char[3][] = $gd->fromId((int)$major_glyphs[$i]->glyph);
	    	}
	    	for( $i = 0; $i < count($minor_glyphs); $i++ ) {
	    		$char[3][] = $gd->fromId((int)$minor_glyphs[$i]->glyph);
	    	}
    	}
    	
    	$primary_professions = $this->data->professions->primary;
    	$char[5] = array();
    	for( $i = 0; $i < count($primary_professions); $i++ ) {
    		$char[5][] = array(
    			$primary_professions[$i]->id,
    			$primary_professions[$i]->rank
    		);
    	}
    	
    	return $char;
    } 
}

?>