<?php
namespace chardev\backend;

class Constants
{
	const WARRIOR = 1;
	const PALADIN = 2;
	const HUNTER = 3;
	const ROGUE = 4;
	const PRIEST = 5;
	const DEATHKNIGHT = 6;
	const SHAMAN = 7;
	const MAGE = 8;
	const WARLOCK = 9;
	const MONK = 10;
	const DRUID = 11;
	
	const USE_CACHE = false;
	const STRICT = false;
	
	const ITEMS_PER_PAGE = 20;
	const SPELLS_PER_PAGE = 20;
	const PROFILES_PER_PAGE = 20;
	const SETS_PER_PAGE = 20;
	
	public static $classIdToSpellClass = array(1=>4, 2=>10, 3=>9, 4=>8, 5=>6, 6=>15, 7=>11, 8=>3, 9=>5, 10=>53, 11=>7);
	public static $slotToRandomPointsGroup = array(1=>0, 5=>0, 20=>0, 7=>0, 17=>0, 3=>1, 6=>1, 8=>1, 10=>1, 2=>2, 9=>2, 11=>2, 14=>2, 16=>2, 23=>2, 13=>3, 21=>3, 22=>3, 15=>4, 25=>4, 26=>4);
	public static $slotNameToId = array(
			"head" => 0,
			"neck" => 1,
			"shoulder" => 2,
			"back" => 3,
			"chest" => 4,
			"shirt" => 5,
			"tabard" => 6,
			"wrist" => 7,
			"hands" => 8,
			"waist" => 9,
			"legs" => 10,
			"feet" => 11,
			"finger1" => 12,
			"finger2" => 13,
			"trinket1" => 14,
			"trinket2" => 15,
			"mainHand" => 16,
			"offHand" => 17,
			"ranged" => 18
	);
	public static $reforgableStats = array(6,13,14,31,32,36,37,49);
}

?>