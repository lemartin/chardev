<?php 

include_once 'error.php';

require_once 'bnet_auth.php';
require_once 'cpa_client/cpa_client.php';
require_once 'user_data.php';

define("MAX_RECORDS",20);
define("MAX_RECORDS_STAT_WEIGHTS",8);
define("WOWREFORGE_STORAGE_TIMEOUT", 86400);

define("NUMERIC",0);
define("STRING",1);
define("EQ",1<<0,true);
define("NE",1<<1,true);
define("GE",1<<2,true);
define("LE",1<<3,true);
define("GT",1<<4,true);
define("LT",1<<5,true);
define("BA",1<<6,true);
define("BO",1<<7,true);
define("BX",1<<8,true);
define("LIKE",1<<9,true);
define("NLIK",1<<10,true);
define("WLIKE",1<<11,true);
define("WNLIK",1<<12,true);
define("BNA",1<<13,true);
define("BNO",1<<14,true);
define("BNX",1<<15,true);
define("IN",1<<16,true);
define("NIN",1<<17,true);
define("BTW",1<<18,true);

define('MAX_RETRIES',2);

$race_name_to_id = array(
	"human" => 1,
	"orc" => 2,
	"dwarf" => 3,
	"night-elf" => 4,
	"forsaken" => 5,
	"tauren" => 6,
	"gnome" => 7,
	"troll" => 8,
	"goblin" => 9,
	"blood-elf" => 10,
	"draenei" => 11,
	"worgen" => 22
);

$class_name_to_id = array(
	"warrior" => 1,
	"paladin" => 2,
	"hunter" => 3,
	"rogue" => 4,
	"priest" => 5,
	"death-knight" => 6,
	"shaman" => 7,
	"mage" => 8,
	"warlock" => 9,
	"druid" => 11
);

$convert_battlenet_slot = array (
		0 => 0,
		1 => 1,
		2 => 2,
		14 => 3,
		4 => 4,
		3 => 5,
		18 => 6,
		8 => 7,
		9 => 8,
		5 => 9,
		6 => 10,
		7 => 11,
		10 => 12,
		11 => 13,
		12 => 14,
		13 => 15,
		15 => 16,
		16 => 17,
		17 => 18,
);

$g_error = "";
$g_operator_to_mysql = array(
	1=>"=",
	2=>"!=",
	4=>">=",
	8=>"<=",
	16=>">",
	32=>"<",
	64=>"&",
	128=>"|",
	256=>"^",
	512=>" LIKE ",
	1024=>" NOT LIKE ",
	2048=>" LIKE ",
	4096=>" NOT LIKE "
);
$g_color = array("#999999","#FFFFFF","#00DD00","#4890C0","#AA66DD","#DD6600","#E5CC80","#E5CC80");
/*
$g_list_color = array("#999999","#FFFFFF","#00DD00","#3366CC","#AA66DD","#DD6600","#E5CC80","#E5CC80");
$g_dark_color = array("#999999","#EEEEEE","#408040","#3366CC","#9060C0","#DD6600","#F0E090","#F0E090");
*/
$g_armor_coefficient = array(
	1 => 0.13,
	3 => 0.12,
	5 => 0.16,
	6 => 0.09,
	7 => 0.14,
	8 => 0.11,
	9 => 0.07,
	10=> 0.10,
	16=> 0.08,
	20=> 0.16
);

$g_race_to_skill = array(
	1=>754,
	2=>125,
	3=>101,
	4=>126,
	5=>220,
	6=>124,
	7=>753,
	8=>733,
	9=>790,
	10=>756,
	11=>760,
	22=>789
);

$g_class_to_skill = array(
	1=>803,
	2=>800,
	3=>795,
	4=>797,
	5=>804,
	6=>796,
	7=>801,
	8=>799,
	9=>802,
	11=>798
);

$g_class_to_spell_class = array(
	1=>4,
	2=>10,
	3=>9,
	4=>8,
	5=>6,
	6=>15,
	7=>11,
	8=>3,
	9=>5,
	11=>7
);

$reforgable_stats = array(6,13,14,31,32,36,37,49);

$classToSpellClass = array(	4,	10,	9,	8,	6,	15,	11,	3,	5,	0,	7);


$g_slot_to_rnd_pts_grp = array(
	1=>0,
	5=>0,
	20=>0,
	7=>0,
	17=>0,
	3=>1,
	6=>1,
	8=>1,
	10=>1,
	2=>2,
	9=>2,
	11=>2,
	14=>2,
	16=>2,
	23=>2,
	13=>3,
	21=>3,
	22=>3,
	15=>4,
	25=>4,
	26=>4
);

$g_slot_name_to_chardev_slot_id = array(
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

define( "USE_CACHE", /*isset($_SERVER['HTTP_HOST']) && $_SERVER['HTTP_HOST']!="127.0.0.1"*/ true ,true );
define("DAYS_TILL_CACHE_INVALIDATION",1,true);

function get_redirect() {
	return htmlspecialchars(
		isset($_POST['redirect_url'])?
			$_POST['redirect_url']:
			(isset($_GET['o'])||isset($_GET['rs'])||isset($_GET['r'])||isset($_GET['rp'])||isset($_GET['login'])?
				'':
				$_SERVER['QUERY_STRING']));
}

function shorten($s,$l)
{
	return (mb_strlen($s)>$l?mb_substr($s,0,$l-3)."...":$s);
}

function get_spell_icon( $spellIconID ) {
	if( !$spellIconID || $spellIconID <= 0 ) {
		return null;
	}
	
	$stmt = mysql_db_query(
		$GLOBALS['g_game_db'],
		"SELECT * FROM `spellicon` WHERE `ID` = ".(int)$spellIconID,
		$GLOBALS['g_db_con']
	);
	
	$record = mysql_fetch_assoc($stmt);
	
	$icon = null;
	if( $record ) {
		$icon = strtolower(str_replace(' ','',str_ireplace('interface\\icons\\','',$record['Icon'])));
	}
	return $icon;
}

function get_gem_properties($id) {
	$stmt = mysql_db_query(
		$GLOBALS['g_game_db'],
		"SELECT * FROM `gemproperties` WHERE `ID` = ".(int)$id,
		$GLOBALS['g_db_con']
	);
	$record = mysql_fetch_assoc($stmt);
		
	if( $record && $record['SpellItemEnchantmentID'] ) {
		return array(
			get_spell_item_enchantment( $record['SpellItemEnchantmentID']),
			(int)$record['MinItemLevel']
		);
	}
	return null;
}

function get_gt_spell_scaling() {
	$stmt = mysql_db_query(
		$GLOBALS['g_game_db'],
		"SELECT * FROM `gtspellscaling` order by `ID` asc",
		$GLOBALS['g_db_con']
	);
	
	$gtSpellScaling = array();
	
	while (($record = mysql_fetch_assoc($stmt))) {
		$gtSpellScaling[(int)$record['ID']] = (float)$record['Value'];
	}
	
	return $gtSpellScaling;
}

function get_cached( $id, $table, &$cache_fail ) {
	$cache_fail = true;
	$cached = null;
	if( USE_CACHE ) {
		$stmt = mysql_db_query(
			$GLOBALS['g_game_db'],
			"SELECT * FROM `".$table."` WHERE `ID` = '".(int)$id."' AND `Date` > DATE_SUB(NOW(),INTERVAL ".DAYS_TILL_CACHE_INVALIDATION." DAY)",
			$GLOBALS['g_db_con']
		);
		$record = mysql_fetch_assoc($stmt);
		
		if( $record ) {
			$cache_fail = false;
			$cached = unserialize($record['Serialized']);
			if( $cached == null ) {
				$cache_fail = true;
			}
		}
	}
	return $cached;
}

function set_cache( $id, $table, $value ) {
	mysql_db_query(
		$GLOBALS['g_game_db'],
		"REPLACE INTO `".$table."` VALUES (".(int)$id.",'".mysql_real_escape_string(serialize($value))."',NOW())",
		$GLOBALS['g_db_con']
	);
}

function get_item_sub_class_name( $item_class, $item_sub_class ) {
	$stmt = mysql_db_query(
		$GLOBALS['g_game_db'],
		"SELECT * FROM `itemsubclass` WHERE `ItemClass` = ".(int)$item_class." AND `ItemSubClass` = ".(int)$item_sub_class,
		$GLOBALS['g_db_con']
	);
	$record = mysql_fetch_assoc($stmt);
		
	if( $record ) {
		return array($record['Name'], $record['NameLong']);
	}
	return null;
}

function get_item_icon( $item_display_info_id ) {
	$stmt = mysql_db_query(
		$GLOBALS['g_game_db'],
		"SELECT * FROM `itemdisplayinfo` WHERE `ID` = ".(int)$item_display_info_id,
		$GLOBALS['g_db_con']
	);
	$record = mysql_fetch_assoc($stmt);
		
	if( $record ) {
		return strtolower(str_replace(' ','',$record['Icon']));
	}
	return null;
}

function get_set( $id ) {
	if( !is_numeric($id) || $id <= 0 ) {
		return null;
	}
	$stmt = mysql_db_query(
		$GLOBALS['g_game_db'],
		"SELECT * FROM `itemset` WHERE `ID` = ".(int)$id,
		$GLOBALS['g_db_con']
	);
	$record = mysql_fetch_assoc($stmt);
	$set = array();	
	if( $record ) {
		$count = 0;
		
		$set[0] = (int)$record['ID'];
		$set[1] = $record['Name'];
		for( $i = 0; $i < 10; $i++ ) {
			$item_id = $record['ItemID'.($i+1)];
			$set[2][$i] = (int)$item_id;
			if( $item_id > 0 ) {
				$count ++;
			}
		}
		for( $i = 0; $i < 8; $i++ ) {
			$spell_id = $record['SpellID'.($i+1)];
			$set[3][$i] = ( $spell_id > 0 ? get_spell($spell_id) : null );
			$set[4][$i] = (int)$record['required'.($i+1)];
		}
		$set[5] = (int)$count;
		
		$item_stmt = mysql_db_query(
			$GLOBALS['g_game_db'],
			"SELECT GROUP_CONCAT(`Name".$GLOBALS['g_table_suffix']."`) as name, InventorySlot FROM `item_sparse` s LEFT JOIN ".$GLOBALS['g_static_db'].".`chardev_item_stats` cis ON s.`ID`=cis.`ItemID` WHERE `ItemSetID` = ".(int)$id." GROUP BY `InventorySlot`",
			$GLOBALS['g_db_con']
		);
		$set[6] = array();
		// Gladiator Set Name Fix
		while($result_item = mysql_fetch_assoc($item_stmt))
		{
			$arr = explode(',', $result_item['name']);
			if(count($arr)>1)
			{
				$name = "";
				
				$word = explode(' ', $arr[0]);
				for($j=0;$j<count($word);$j++)
				{
					$keep = true;
					
					for($i=1;$i<count($arr);$i++)
					{
						$cmp = explode(' ', $arr[$i]);
						$found = false;
						for($h=0;$h<count($cmp);$h++)
						{
							if( strcasecmp($cmp[$h], $word[$j]) === 0 )
							{
								$found = true;;
							}
						}
						if( $found )
						{
							$keep = true;
						}
						else
						{
							$keep = false;
							break;
						}
					}
					if($keep)
					{
						$name .= ($name?" ":"").$word[$j];
					}
				}
				
				if(!$name)
				{
					$name = $arr[0];
				}
			}
			else
			{
				$name = $arr[0];	
			}
			$set[6][] = array(
				(int)$result_item['InventorySlot'],
				preg_replace('/^(.*)of$/i', '\1', $name)
			);
		}
		
		return $set;
	}
	return null;
}

function get_faction_name( $faction_id ) {
	$stmt = mysql_db_query(
		$GLOBALS['g_game_db'],
		"SELECT * FROM `faction` WHERE `ID` = ".(int)$faction_id,
		$GLOBALS['g_db_con']
	);
	$record = mysql_fetch_assoc($stmt);
	
	if( $record ) {
		return $record['Name'];
	}
	else {
		return "";
	}
}

function get_gem( $gem_properties_id ) {
	$record = mysql_fetch_assoc(mysql_db_query(
		$GLOBALS['g_game_db'],
		"SELECT i.`ID` as ID FROM `item_sparse` i INNER JOIN `gemproperties` gp ON i.`GemPropertiesID` = gp.`ID` WHERE gp.`ID`=".$gem_properties_id,
		$GLOBALS['g_db_con']
	));
	
	if( $record ) {
		return get_item( (int)$record['ID'] );
	}
	return null;
}

function get_item( $item_id ) {
	if( !$item_id || !is_numeric($item_id) || $item_id <= 0 ) {
		return null;
	}
	$item = null;
	$cache_fail = false;
	$item = get_cached($item_id,"chardev_item_cache",$cache_fail);

	if( $cache_fail ) {
		$stmt = mysql_db_query(
			$GLOBALS['g_game_db'],
			"SELECT * FROM `item_sparse` s INNER JOIN `item` i ON i.`ID` = s.`ID` LEFT JOIN ".$GLOBALS['g_static_db'].".`chardev_item_stats` cis ON cis.`ItemID` = i.`ID` WHERE s.`ID` = ".(int)$item_id,
			$GLOBALS['g_db_con']
		);
		
		$record = mysql_fetch_assoc($stmt);
		
		if( $record ) {
			$item[0] = (int)$record['ID'];
			$item[1] = (int)$record['Quality'];
			$item[2] = (int)$record['ItemClass'];
			$item[3] = (int)$record['ItemSubClass'];
			$item[4] = (int)$record['InventorySlot'];
			$item[5] = (int)$record['ChrClassMask'];
			$item[6] = (int)$record['Level'];
			$item[7] = (int)$record['RequiredCharacterLevel'];
			$item[8] = (int)$record['RequiredSkillLineID'];
			$item[9] = (int)$record['RequiredSkillLineLevel'];
			$item[10] = (int)$record['RequiredFactionID'];
			$item[11] = (int)$record['RequiredFactionReputation'];
			$item[12] = (int)$record['MaximumStackSize'];
			
			$item[13] = array(); 
			for( $i = 1; $i <= 10; $i++ ) {
				if( $record['Stat'.$i] > 0 ) {
					$item[13][$i-1] = array(
						(int)$record['Stat'.$i],
						(int)$record['StatValue'.$i]
					);
				}
				else {
					$item[13][] = null;
				}
			}
			$item[14] = (int)$record['Delay'];
			
			$item[15] = array();
			for( $i = 1; $i <= 5; $i++ ) {
				$item[15][] = get_spell($record['SpellID'.$i]);
			}
			
			//$item[16] = (int)$record['Cooldown'];
			$item[17] = (int)$record['Binds'];
			$item[18] = $record['Name'.$GLOBALS['g_table_suffix']] ? $record['Name'.$GLOBALS['g_table_suffix']] : $record['Name'];
			$item[19] = get_set((int)$record['ItemSetID']);
			$item[20] = -1;//(int)$record['Durability'];
			$item[21] = array( 
				(int)$record['SocketColor1'],
				(int)$record['SocketColor2'],
				(int)$record['SocketColor3']
			);
			$item[22] = (int)$record['SocketBonusID'] > 0 ? get_spell_item_enchantment( (int)$record['SocketBonusID'] ) : null;
			$item[23] = get_item_icon($record['ItemDisplayInfoID']);
			$item[24] = get_item_sub_class_name((int)$record['ItemClass'],(int)$record['ItemSubClass']);
			$item[25] = (int)$record['TypeMask'];
			$item[26] = (int)$record['BuyPrice'];
			$item[27] = (int)$record['SellPrice'];
			
			$item[28] = (int)$record['Armor'];
			
			$item[29] = (bool)(int)$record['Unique'];
			$item[30] = ( (int)$record['RequiredFactionID'] > 0 ? get_faction_name($record['RequiredFactionID']) : "" );
			$item[31] = array();
			$item[32] = array();
			$item[33] = array();
			$item[34] = array();
			$item[35] = array();
		
			for( $i = 1; $i <= 5; $i++ ) {
				$item[31][] = (int)$record['SpellTrigger'.$i];
				$item[32][] = (int)$record['SpellCharges'.$i];
				$item[33][] = (int)$record['SpellCooldown'.$i];
				$item[34][] = (int)$record['SpellCategoryID'.$i];
				$item[35][] = (int)$record['SpellCategoryCooldown'.$i];
			}
			$item[36] = (int)$record['GemPropertiesID'] > 0 ? get_gem_properties( (int)$record['GemPropertiesID'] ) : null;
			$item[37] = $record['Description'.$GLOBALS['g_table_suffix']] ? $record['Description'.$GLOBALS['g_table_suffix']] : $record['Description'];
			$item[38] = (float)$record['DPS'];
			$item[39] = (float)$record['MinDamage'];
			$item[40] = (float)$record['MaxDamage'];
			
			
			$item[41] = null;
			
			if( (int)$record['RandomPropertiesID'] > 0 ) {
				$item[41] = array();
				$rp_result = mysql_query(
					"SELECT * ".
						"FROM ".$GLOBALS['g_game_db'].".`itemrandomproperties` irp ".
						"INNER JOIN ".$GLOBALS['g_static_db'].".`chardev_random_properties` crp ON irp.`ID` = crp.`ItemRandomPropertiesID` ".
						"WHERE crp.`ID`=".((int)$record['RandomPropertiesID'])
				);
				echo mysql_error();
				while( $random_prop = mysql_fetch_assoc($rp_result) ) {
					$item[41][] = array(
						(int)$random_prop['ItemRandomPropertiesID'],
						(string)$random_prop['Name'],
						get_spell_item_enchantment((int)$random_prop['SpellItemEnchantmentID1']),
						get_spell_item_enchantment((int)$random_prop['SpellItemEnchantmentID2']),
						get_spell_item_enchantment((int)$random_prop['SpellItemEnchantmentID3']),
						get_spell_item_enchantment((int)$random_prop['SpellItemEnchantmentID4']),
						get_spell_item_enchantment((int)$random_prop['SpellItemEnchantmentID5'])
					);
				}
				mysql_free_result($rp_result);
			}
			
			$item[42] = null;
			if ( (int)$record['RandomSuffixID'] > 0 ) {
				$item[42] = array();
				$suffix_result = mysql_db_query(
					$GLOBALS['g_static_db'],
					"SELECT * FROM `chardev_random_suffix` WHERE `ID` = ".(int)$record['RandomSuffixID'],
					$GLOBALS['g_db_con']
				);
				while($scalingRecord = mysql_fetch_assoc($suffix_result)) {
					$item[42][] = get_random_suffix((int)$scalingRecord['ItemRandomSuffixID'],(int)$record['Level'],(int)$record['Quality'],(int)$record['InventorySlot']);
				}
			}
			
			$item[43] = null;
			if( (int)$record['ScalingStatDistributionID'] > 0 ) {
				$scalingRecord = mysql_fetch_assoc(mysql_db_query(
					$GLOBALS['g_game_db'],
					"SELECT * FROM `scalingstatdistribution` WHERE `ID` = ".(int)$record['ScalingStatDistributionID'],
					$GLOBALS['g_db_con']
				));
				$item[43] = array();
				for( $i=1; $i<=10; $i++ ) {
					$item[43][$i-1] = $scalingRecord['Stat'.$i];
					$item[43][$i+9] = $scalingRecord['Coefficient'.$i];
				} 
				$item[43][20] = $scalingRecord['MinLevel'];
				$item[43][21] = $scalingRecord['MaxLevel'];
			}
			$item[44] = (int)$record['TypeMask2'];
			$item[45] = (float)$record['DamageRange'];
			$item[46] = (float)$record['QuestID'];
			$item[47] = (float)$record['LimitCategory'];
			$item[48] = (float)$record['LimitCategoryMultiple'];
			$item[49] = (float)$record['ChrRaceMask'];
		}
		
		set_cache($item_id,"chardev_item_cache",$item);
	}
	return $item;
}

function get_random_suffix( $id, $item_level,$quality,$inventory_slot ) {
	
	$record = mysql_fetch_assoc(mysql_db_query(
		$GLOBALS['g_game_db'],
		"SELECT * FROM itemrandomsuffix WHERE ID = ".$id,
		$GLOBALS['g_db_con']
	));
	$points = mysql_fetch_assoc(mysql_db_query(
		$GLOBALS['g_game_db'],
		"SELECT PointsQuality".$quality."Group".$GLOBALS['g_slot_to_rnd_pts_grp'][$inventory_slot]." as Points FROM randproppoints WHERE ID = ".$item_level,
		$GLOBALS['g_db_con']
	));
	
	$arr = array($id,$record['Name']);
	
	for($i=1;$i<=5;$i++) {
		if((int)$record['SpellItemEnchantmentID'.$i]) {
			$arr[$i+1] = array(
				floor((int)$points['Points'] * (int)$record['Coefficient'.$i] / 10000),
				get_spell_item_enchantment((int)$record['SpellItemEnchantmentID'.$i])
			);
		}
		else {
			$arr[$i+1] = null;
		}
	}
	return $arr;
}

function get_armor( $item_class, $item_sub_class, $item_slot,  $item_level, $item_quality  )
{
	$armor = 0;
	if( $item_class == 4 ) {
		if( isset($GLOBALS["g_armor_coefficient"][$item_slot]) && $item_sub_class > 0 && $item_sub_class <= 4 ) 
		{		
			$armor_stmt = mysql_db_query(
				$GLOBALS['g_game_db'],
				"SELECT t.`".(int)$item_sub_class."` * q.`".(int)$item_quality."` AS base FROM `itemarmortotal` t, `itemarmorquality` q WHERE q.`ID` = t.`ID` AND q.`ID` = ".(int)$item_level,
				$GLOBALS['g_db_con']
			);
			$armor_record = mysql_fetch_assoc($armor_stmt);
			if( $armor_record ) 
			{
				$armor = (int)round($GLOBALS["g_armor_coefficient"][$item_slot] * (float)$armor_record['base']);
			}
			mysql_free_result($armor_stmt);
			return $armor;
		}
		else if( $item_sub_class == 6 )
		{
			$armor_stmt = mysql_db_query(
				$GLOBALS['g_game_db'],
				"SELECT `".(int)$item_quality."` AS armor FROM `itemarmorshield` s WHERE s.`ID` = ".$item_level,
				$GLOBALS['g_db_con']
			);
			$armor_record = mysql_fetch_assoc($armor_stmt);
			if( $armor_record ) 
			{
				$armor = (int)round((float)$armor_record['armor']);
			}
			mysql_free_result($armor_stmt);
			return $armor;
		}
	}
	return 0;
}

function get_spell( $spell_id, &$spell_list = null ) {
	if( !$spell_id || !is_numeric($spell_id) || $spell_id <= 0 ) {
		return null;
	}
	$spell = null;
	$cache_fail = false;
	$resolve = $spell_list == null;
	
	$spell = get_cached($spell_id,"chardev_spell_cache",$cache_fail);
	
	if( $cache_fail ) {
		$stmt = mysql_db_query(
			$GLOBALS['g_game_db'],
			"SELECT * FROM `spell` WHERE `ID` = ".(int)$spell_id,
			$GLOBALS['g_db_con']
		);
		
		$record = mysql_fetch_assoc($stmt);
		
		if( $record ) {
			$spell = array();
			$spell[0] = (int)$record['ID'];
			$spell[1] = $record['Name'];
			$spell[2] = $record['Description'];
			$spell[3] = get_spell_icon($record['SpellIconID']);
			// SpellDuration
			$spellduration = 0;
			if( $record['SpellDurationID'] ) {
				$join_result = mysql_db_query(
					$GLOBALS['g_game_db'],
					"SELECT * FROM `spellduration` WHERE `ID` = ".(int)$record['SpellDurationID'],
					$GLOBALS['g_db_con']
				);
				if( ($joinRecord = mysql_fetch_assoc($join_result)) ) {
					$spellduration = (int)$joinRecord['Duration'];
				}
				mysql_free_result( $join_result );
			}
			$spell[4] = $spellduration;
			// SpellRange
			$spellrange = null;
			if( $record['SpellRangeID'] ) {
				$join_result = mysql_db_query(
					$GLOBALS['g_game_db'],
					"SELECT * FROM `spellrange` WHERE `ID` = ".(int)$record['SpellRangeID'],
					$GLOBALS['g_db_con']
				);
				if( ($joinRecord = mysql_fetch_assoc($join_result)) ) {
					$spellrange = array(
						(float)$joinRecord['MinimumHostile'],
						(float)$joinRecord['MaximumHostile'],
						(float)$joinRecord['MinimumFriendly'],
						(float)$joinRecord['MaximumFriendly']
					);
				}
				mysql_free_result( $join_result );
			}
			$spell[5] = $spellrange;
			// SpellPower
			$spellpower = null;
			if( $record['SpellPowerID'] ) {
				$join_result = mysql_db_query(
					$GLOBALS['g_game_db'],
					"SELECT * FROM `spellpower` WHERE `ID` = ".(int)$record['SpellPowerID'],
					$GLOBALS['g_db_con']
				);
				if( ($joinRecord = mysql_fetch_assoc($join_result)) ) {
					$spellpower = array(
						(float)$joinRecord['Absolute'],
						(float)$joinRecord['Percent'],
					);
				}
				mysql_free_result( $join_result );
			}
			$spell[6] = $spellpower;
			// EnergyType
			$spell[7] = (int)$record['EnergyType'];
			// SpellCastTimes
			$spellcasttime = 0;
			if( $record['SpellCastTimesID'] ) {
				$join_result = mysql_db_query(
					$GLOBALS['g_game_db'],
					"SELECT * FROM `spellcasttimes` WHERE `ID` = ".(int)$record['SpellCastTimesID'],
					$GLOBALS['g_db_con']
				);
				if( ($joinRecord = mysql_fetch_assoc($join_result)) ) {
					$spellcasttime = (int)$joinRecord['Time'];
				}
				mysql_free_result( $join_result );
			}
			$spell[8] = $spellcasttime;
			// SpellCooldowns
			$spellcooldown = null;
			if( $record['SpellCooldownsID'] ) {
				$join_result = mysql_db_query(
					$GLOBALS['g_game_db'],
					"SELECT * FROM `spellcooldowns` WHERE `ID` = ".(int)$record['SpellCooldownsID'],
					$GLOBALS['g_db_con']
				);
				if( ($joinRecord = mysql_fetch_assoc($join_result)) ) {
					$spellcooldown = array(
						(int)$joinRecord['Spell'],
						(int)$joinRecord['Category'],
						(int)$joinRecord['Global']
					);
				}
				mysql_free_result( $join_result );
			}
			$spell[9] = $spellcooldown;
			// SpellEffect
			$spelleffects = array(null,null,null);
			$join_result = mysql_db_query(
				$GLOBALS['g_game_db'],
				"SELECT * FROM `spelleffect` WHERE `SpellID` = ".(int)$record['ID']." ORDER BY `Index` ASC",
				$GLOBALS['g_db_con']
			);
			
			while( ($joinRecord = mysql_fetch_assoc($join_result)) ) {
				$proc_spell = null;
				
				if( (int)$joinRecord['Effect'] == 42 || (int)$joinRecord['Effect'] == 23 ) {
					$load_proc_spell = true;
					$proc_spell_id = (int)$joinRecord['f22'];

					if( $spell_list == null ) {
						$spell_list = array();
					}
					
					$spell_list[(int)$record['ID']] = null;
					
					foreach( $spell_list as $id => $s ) {
						if( $id == $proc_spell_id ) {
							$load_proc_spell = false;
						}
					}
					
					if( $load_proc_spell ) {
						$spell_list[$proc_spell_id] = get_spell( $proc_spell_id, $spell_list );
					}
				}
				$spelleffects[(int)$joinRecord['Index']] = array(
					(int)$joinRecord['ProcValue'],
					(int)$joinRecord['Aura'],
					(int)$joinRecord['Effect'],
					(int)$joinRecord['Period'],
					(int)$joinRecord['Value'],
					(int)$joinRecord['Targets'],
					(float)$joinRecord['Coefficient'],
					(int)$joinRecord['Dice'],
					( (int)$joinRecord['Aura'] == 53 ? get_spell_item_enchantment((int)$joinRecord['SecondaryEffect']) : (int)$joinRecord['SecondaryEffect']),
					(int)$joinRecord['UsedStat'],
					(int)$joinRecord['ProcChance'],
					(int)$joinRecord['LevelModifier'],
					(int)$joinRecord['f22'],
					(int)$joinRecord['ID']
				);
				//TODO complete array, make sense of columns
			}
			mysql_free_result( $join_result );
			
			$spell[10] = $spelleffects;
			// SpellScaling
			$spellscaling = null;
			if( $record['SpellScalingID'] ) {
				$join_result = mysql_db_query(
					$GLOBALS['g_game_db'],
					"SELECT * FROM `spellscaling` WHERE `ID` = ".(int)$record['SpellScalingID'],
					$GLOBALS['g_db_con']
				);
				if( ($joinRecord = mysql_fetch_assoc($join_result)) ) {
					$spellscaling = array(
						(int)$joinRecord['CastTimeStart'],
						(int)$joinRecord['CastTimeEnd'],
						(int)$joinRecord['Intervals'],
						(int)$joinRecord['Distribution'],
						array(
							(float)$joinRecord['Coefficient1'],
							(float)$joinRecord['Coefficient2'],
							(float)$joinRecord['Coefficient3']
						),
						array(
							(float)$joinRecord['Dice1'],
							(float)$joinRecord['Dice2'],
							(float)$joinRecord['Dice3']
						),
					);
					// TODO complete array, make sense of columns
				}
				mysql_free_result( $join_result );
			}
			$spell[11] = $spellscaling;
			//
			//	Parsed description
			//
			$chardev_spellinfo_result = mysql_db_query(
				$GLOBALS['g_static_db'],
				"SELECT * FROM `chardev_spellinfo` WHERE `SpellID` = ".(int)$record['ID'],
				$GLOBALS['g_db_con']
			);
			$chardev_spellinfo = mysql_fetch_assoc($chardev_spellinfo_result);
			$spell[12] = $chardev_spellinfo['Description'.$GLOBALS['g_table_suffix']];
			$spell[13] = (int)$chardev_spellinfo['Scalable'] ? true : false;
			//
			// SpellShapeShift
			//
			$spellshapeshift = null;
			if( $record['SpellShapeshiftID'] ) {
				$join_result = mysql_db_query(
					$GLOBALS['g_game_db'],
					"SELECT * FROM `spellshapeshift` WHERE `ID`=".(int)$record['SpellShapeshiftID'],
					$GLOBALS['g_db_con']
				);
				if( ($joinRecord = mysql_fetch_assoc($join_result)) ) {
					$spellshapeshift = array( 
						(int)$joinRecord['f2'],
						(int)$joinRecord['f3'],
						(int)$joinRecord['SpellShapeshiftFormID'], 
						(int)$joinRecord['f5'],
						(int)$joinRecord['f6']
					);
				}				
				mysql_free_result( $join_result );
			}
			$spell[14] = $spellshapeshift;
			//spellequippeditems
			$spellequippeditems = null;
			if( $record['SpellEquippedItemsID'] ) {			
				$join_result = mysql_db_query(
					$GLOBALS['g_game_db'],
					"SELECT * FROM `spellequippeditems` WHERE `ID`=".(int)$record['SpellEquippedItemsID'],
					$GLOBALS['g_db_con']
				);
				if( ($joinRecord = mysql_fetch_assoc($join_result)) ) {
					$spellequippeditems = array( 
						(int)$joinRecord['ItemClassID'],
						(int)$joinRecord['InventorySlotMask'],
						(int)$joinRecord['ItemSubClassMask'],
					);
				}
				mysql_free_result( $join_result );
			}
			$spell[15] = $spellequippeditems;
			$spell[16] = array(
				(int)$record['Type0'],
				(int)$record['Type1'],
				(int)$record['Type2'],
				(int)$record['Type3'],
				(int)$record['Type4'],
				(int)$record['Type5'],
				(int)$record['Type6'],
				(int)$record['Type7'],
				(int)$record['Type8'],
				(int)$record['Type9'],
			);
			
			$spell[17] = null;
			if(  $spell_list && $resolve ) {
				$spell[17] = array();
				foreach( $spell_list as $id => $s ) {
					if( $s ) {
						$spell[17][] = $s;
					}
				}
			}
			
			$spellauraoptions = null; 
			if( $record['SpellAuraOptionsID'] ) {			
				$join_result = mysql_db_query(
					$GLOBALS['g_game_db'],
					"SELECT * FROM `spellauraoptions` WHERE `ID`=".(int)$record['SpellAuraOptionsID'],
					$GLOBALS['g_db_con']
				);
				if( ($joinRecord = mysql_fetch_assoc($join_result)) ) {
					$spellauraoptions = array( 
						(int)$joinRecord['Stacks'],
						(int)$joinRecord['ProcRate'],
						(int)$joinRecord['ProcCharges'],
					);
				}
				mysql_free_result( $join_result );
			}
			$spell[18] = $spellauraoptions;
			
			$classoptions = null;
			
			if( $record['SpellClassOptionsID'] ) {			
				$join_result = mysql_db_query(
					$GLOBALS['g_game_db'],
					"SELECT * FROM `spellclassoptions` WHERE `ID`=".(int)$record['SpellClassOptionsID'],
					$GLOBALS['g_db_con']
				);
				if( ($joinRecord = mysql_fetch_assoc($join_result)) ) {
					$classoptions = array( 
						(int)$joinRecord['SpellClassID']
					);
				}
				mysql_free_result( $join_result );
			}
			$spell[19] = $classoptions;
			
			$spell[20] = (int)$chardev_spellinfo['ElixirMask'];
			
			//
			//
			//
			mysql_free_result($chardev_spellinfo_result);
		}
		mysql_free_result($stmt);
		set_cache($spell_id,"chardev_spell_cache",$spell);
	}
	return $spell;
}

function get_spell_item_enchantment_condition( $id ) 
{
	if( !$id || !is_numeric($id) || $id <= 0 ) {
		return null;
	}
	$condition = null;
	
	
	$stmt = mysql_db_query(
		$GLOBALS['g_game_db'],
		"SELECT * FROM `spellitemenchantmentcondition` WHERE `ID` = ".(int)$id,
		$GLOBALS['g_db_con']
	);
	
	$record = mysql_fetch_assoc($stmt);
	
	$condition = array();
	if($record) {
		$condition[0] = (int)$record['ID'];
		$condition[1] = array();
		$condition[2] = array();
		$condition[3] = array();
		$condition[4] = array();
		for( $i = 0; $i < 5; $i++ ) {
			$condition[1][$i] = (int)$record['Color'.($i+1)];
			$condition[2][$i] = (int)$record['Comparator'.($i+1)];
			$condition[3][$i] = (int)$record['CompareColor'.($i+1)];
			$condition[4][$i] = (int)$record['Value'.($i+1)];
		}
	}
	mysql_free_result($stmt);
	return $condition;
}

function get_spell_item_enchantment( $id ) 
{
	if( !$id || !is_numeric($id) || $id <= 0 ) {
		return null;
	}
	$enchant = null;
	$cache_fail = false;
	
	$enchant = get_cached($id,"chardev_spellitemenchantment_cache",$cache_fail);

	if( $cache_fail ) {
		$stmt = mysql_db_query(
			$GLOBALS['g_game_db'],
			"SELECT * FROM `spellitemenchantment` WHERE `ID` = ".(int)$id,
			$GLOBALS['g_db_con']
		);
		
		$record = mysql_fetch_assoc($stmt);
		
		if( $record ) {
			$enchant[0] = (int)$record['ID'];
			
			$enchant[1] = array();
			$enchant[2] = array();
			$enchant[3] = array();
			$enchant[4] = array();
			for( $i = 0; $i < 3; $i++ ) {
				$enchant[1][$i] = (int)$record['Type'.($i+1)];
				$enchant[2][$i] = (int)$record['Value'.($i+1)];
				$enchant[3][$i] = (int)$record['SpellID'.($i+1)];
				$enchant[4][$i] = (int)$record['SpellID'.($i+1)] > 0 && ( $record['Type'.($i+1)] == 3 || $record['Type'.($i+1)] == 7 || $record['Type'.($i+1)] == 1 ) ? get_spell((int)$record['SpellID'.($i+1)]) : null;
			}
			$enchant[5] = $record['Description'];
			$enchant[6] = ( (int)$record['SpellItemEnchantmentConditionID'] > 0 ? get_spell_item_enchantment_condition($record['SpellItemEnchantmentConditionID']) : null );
			$enchant[7] = (int)$record['RequiredSkillLineID'] > 0 ? get_skill_line((int)$record['RequiredSkillLineID']) : null;
			$enchant[8] = (int)$record['RequiredSkillLineLevel'];
			$enchant[9] = (int)$record['RequiredCharacterLevel'];
			$enchant[10] = (int)$record['EnchantSlot'];
			
		}
		mysql_free_result($stmt);
		set_cache($id,"chardev_spellitemenchantment_cache",$enchant);
	}
	return $enchant;
}

function get_talents($id) {
	$mask = 1 << ((int)$id - 1);
	$cache_fail = false;
	$talents = null;
	
	$talents = get_cached($mask,"chardev_talents_cache",$cache_fail);
	
	if( $cache_fail ) {
			
		$stmt = mysql_db_query(
			$GLOBALS['g_game_db'],
			"SELECT * FROM `talenttab` WHERE `ClassMask`=".(int)$mask." ORDER BY `Index` asc" ,
			$GLOBALS['g_db_con']
		);
		
		$talents = array();
		$treeIndex = 0;
		
		while( ( $record = mysql_fetch_assoc($stmt))  ) {
			$talents[$treeIndex] = array();
			$talents[$treeIndex][0] = $record['Name'];
			$talents[$treeIndex][1] = $record['Description'];
			$talents[$treeIndex][2] = get_spell_icon($record['SpellIconID']);
			$talents[$treeIndex][3] = array();
			
			$talentIndex = 0;
			$done = array();
			
			$talent_stmt = mysql_db_query(
				$GLOBALS['g_game_db'],
				"SELECT * FROM `talent` WHERE `TalentTabID` = ".(int)$record['ID']." ORDER BY `Row` asc, `Col` asc, `ID` desc" ,
				$GLOBALS['g_db_con']
			);
			
			while( ($talent_record = mysql_fetch_assoc($talent_stmt)) ) {
			
				//
				// eliminate obsolete but still existing talents
				// they could overwrite the correct talent elsewise
				// and cause quite some problems due to non existant
				// spells
				$row = (int)$talent_record['Row'];
				$col = (int)$talent_record['Col'];
				if( isset($done[$row]) ) {
					if( isset($done[$row][$col]) ) {
						continue;
					}
					else {
						$done[$row][$col] = true;
					}
				}
				else {
					$done[$row] = array();
					$done[$row][$col] = true;
				}
			
				$talents[$treeIndex][3][$talentIndex] = array(
					(int)$talent_record['ID'],
					(int)$talent_record['Row'],
					(int)$talent_record['Col'],
					array(
						get_spell((int)$talent_record['SpellID1']),
						get_spell((int)$talent_record['SpellID2']),
						get_spell((int)$talent_record['SpellID3']),
						get_spell((int)$talent_record['SpellID4']),
						get_spell((int)$talent_record['SpellID5'])
					),
					array (
						(int)$talent_record['RequiredTalentID1'],
						(int)$talent_record['RequiredTalentID2'],
						(int)$talent_record['RequiredTalentID3']	
					),
					array(
						(int)$talent_record['PetMask0'],
						(int)$talent_record['PetMask1']
					)
				);
				$talentIndex++;
			}
			$talents[$treeIndex][4] = array(
				get_spell((int)$record['MasterySpellID1']),
				get_spell((int)$record['MasterySpellID2'])
			);
			
			$talent_spells_stmt = mysql_db_query(
				$GLOBALS['g_game_db'],
				"SELECT `SpellID` FROM `talenttreeprimaryspells` tps WHERE `TalentTabID` = ".(int)$record['ID'],
				$GLOBALS['g_db_con']
			);
			$talents[$treeIndex][5] = array();
			while( ($talent_spells_record = mysql_fetch_assoc($talent_spells_stmt)) ) {
				$talents[$treeIndex][5][] = get_spell($talent_spells_record['SpellID']);
			}
			
			$treeIndex++;
		}
		if( $treeIndex == 0 ){
			$talents = null;
		}
		
		set_cache($mask,"chardev_talents_cache",$talents);
	}
	return $talents;
}

function parse_string_argument( &$where, $operator, $value, $column ) 
{
	$op_str = $GLOBALS['g_operator_to_mysql'][$operator];
	
	if( ($operator&(LIKE|NLIK|WLIKE|WNLIK)) == 0 ) {
		$GLOBALS['g_error'] = "Invalid operator: ".$op_str;
		return;
	}
	if( ($operator&(WLIKE|WNLIK)) != 0 ) {
		$tmp = explode(" ",$value);
		foreach( $tmp as $word ) {
			$where .= ( $where?" AND ":"" ) . $column . $op_str . "'%".mysql_real_escape_string($word)."%'";
		}
	}
	else {
		$where .= ( $where?" AND ":"" ) . $column . $op_str . "'%".mysql_real_escape_string($value)."%'";
	}
}

function parse_numeric_argument( &$where, $operator, $value, $column ) 
{
	$str = "";
	
	if( ($operator&(LIKE|NLIK|WLIKE|WNLIK)) != 0 ) {
		$GLOBALS['g_error'] = "Invalid operator: ".$GLOBALS['g_operator_to_mysql'][$operator];
		return;
	}
	if( ($operator&(BA|BO|BX|BNA|BNO|BNX)) != 0 ) {
		$str = " ((1<<". $column . ") " . $GLOBALS['g_operator_to_mysql'][$operator] . "'".mysql_real_escape_string( $value )."')";
	}
	else if(($operator&(IN|NIN)) != 0 ) {
		//TODO implement me!
		$GLOBALS['g_error'] = "Not yet implemented!";
	}
	else if(($operator&(BTW)) != 0 ) {
		//TODO implement me!
		$tmp = explode('-',$value);
		
		if( $tmp[0] ) {
			$str .= $column . '>=' . "'".mysql_real_escape_string( (float)$tmp[0] )."' ";
		}
		if( $tmp[1] ) {
			$str .= ( $str ? " AND " : "" ) . $column . '<=' . "'".mysql_real_escape_string( (float)$tmp[1] )."'" ;
		}
		
		$str = $str ? "(".$str.")" : "";
	}
	else {
		$str = "(" . $column . $GLOBALS['g_operator_to_mysql'][$operator] . "'".mysql_real_escape_string( $value )."')";
	}
	if( $str ) {
		$where .= ( $where?" AND ":"" ) . $str ;
	}
}

function parse_binary_argument( &$where, $operator, $value, $column, $notRequired = false ) 
{
	$op_str = $GLOBALS['g_operator_to_mysql'][$operator];
	$str = "";
	
	if( ($operator&(LIKE|NLIK|WLIKE|WNLIK)) != 0 ) {
		$GLOBALS['g_error'] = "Invalid operator: ".$op_str;
		return;
	}
	if( ($operator&(BA|BO|BX|BNA|BNO|BNX)) != 0 ) {
		//TODO <= 0 ?
		$str = " (". $column . " " . $op_str . "'".mysql_real_escape_string( $value ). "'" . ( $notRequired ? " OR ". $column . " <= '0'" : "" ) .  ")";
	}
	else {
		$GLOBALS['g_error'] = "Not yet implemented!";
	}
	
	$where .= ( $where?" AND ":"" ) . $str ;
}

function parse_arguments( $arguments, &$matches) {
	preg_match_all("/(?:^|;)([\w]+)\.(eq|ne|ge|le|lt|gt|ba|bo|bx|bna|bno|bnx|like|nlik|wlike|wnlik|in|nin|btw)\.([^;]+)/",$arguments,$matches,PREG_SET_ORDER);
}

function parse_order( $order, $map ) {
	$matches = array();
	$orderClause = "";
	preg_match_all("/(?:^|;)([\w]*)\.(?:(asc)|(desc))/",$order,$matches,PREG_SET_ORDER);
	
	for( $i=0; $i<count($matches); $i++ ) {
		if( isset($map[$matches[$i][1]])) {
			$orderClause .= ($orderClause ? ", " : "") . $map[$matches[$i][1]] . ( $matches[$i][2] ? " ASC" : " DESC" );
		}
	}
	
	return $orderClause;
}

function parse_flags( $flags, &$matches ) {
	preg_match_all("/(?:^|;)(!?)(\w+)/",$flags,$matches,PREG_SET_ORDER);
}

function get_spells( $arguments, $flags, $order, $page ) {
	$page = $page < 1 ? 1 : $page;
	$joinSpellRange = false;
	$joinEquippedItems = false;
	$is_enchant = false;
	$where = "";
	$spells = array();
	$orderClause = "";
	// arguments
	parse_arguments( $arguments, $matches );
	foreach($matches as $match) {
		$operator = constant($match[2]);
		switch( $match[1] ) {
			case "maxrange":
				$joinSpellRange = true;
				parse_numeric_argument($where,$operator,$match[3],"sr.MaximumHostile");
				break;
			case "name":
				parse_string_argument($where,$operator,$match[3],"s.Name");
				break;
			case "description":
				parse_string_argument($where,$operator,$match[3],"s.Description");
				break;
			case "slot":
				$joinEquippedItems = true;
				parse_binary_argument($where,$operator,$match[3],"sei.`InventorySlotMask`",true);
				break;
			case "itemclass":
				$joinEquippedItems = true;
				parse_numeric_argument($where,$operator,$match[3],"sei.`ItemClassID`",true);
				break;
			case "itemsubclass":
				$joinEquippedItems = true;
				parse_binary_argument($where,$operator,$match[3],"sei.`ItemSubClassMask`",true);
				break;
			case "itemclasssubclasscombined":
				if( $operator != EQ ) {
					$GLOBALS["g_error"] = "Operator ".$match[2]." is not supported";
				}
				
				$joinEquippedItems = true;
				$arr = explode( ".", $match[3] );
				
				if( count($arr) != 2 ) {
					$GLOBALS["g_error"] = "Value ".$match[3]." is invalid";
				}
				
				$where .= ( $where?" AND ":"" ) ."((sei.`ItemSubClassMask`&" .(1<<(int)$arr[1]). ") != 0 OR sei.`ItemSubClassMask`=0) AND sei.`ItemClassID`=".(int)$arr[0];
				
				break;
			case "isenchant":
				if( $operator != EQ ) {
					$GLOBALS["g_error"] = "Operator ".$match[2]." is not supported";
				}
				else {
					if((int)$match[3] == 1) {
						$is_enchant = true;
					}
				}
				break;
			case "enchantchrlevel":
				$is_enchant = true;
				parse_numeric_argument($where,$operator,$match[3],"sie.`RequiredCharacterLevel`",true);
				break;
			default:
				//echo "unknown argument: ".$match[1];
				break;
		}
	}
// order
	$orderClause = parse_order( $order, array( "id" => "s.`ID` ", "name" => "s.`Name` ", "enchantchrlevel" => "sie.`RequiredCharacterLevel` " ));
	
	if( $is_enchant ) {
		$orderClause .= ($orderClause?",":"") . "s.`ID` DESC";
	}
	
	$query = "SELECT SQL_CALC_FOUND_ROWS s.`ID` as ID FROM ".
		"`spell` s".
		($joinSpellRange?					" INNER JOIN `spellrange` 				sr 		ON sr.`ID` = s.`SpellRangeID`":"").
		($joinEquippedItems?				" INNER JOIN `spellequippeditems` 		sei 	ON sei.`ID` = s.`SpellEquippedItemsID`":"").
		($is_enchant?						" INNER JOIN ".$GLOBALS['g_static_db'].".`chardev_enchant_spell` 	ces 	ON s.`ID` = ces.`SpellID`".
											" INNER JOIN `spelleffect` 				se 		ON se.`SpellID` = s.`ID`".
											" INNER JOIN `spellitemenchantment` 	sie 	ON sie.`ID` = se.`SecondaryEffect`":"").
		($where?" WHERE ".$where:"").
		( $orderClause ? " ORDER BY ".$orderClause : "" ).
		" LIMIT ".MAX_RECORDS *($page-1).",".MAX_RECORDS;
		
	$stmt = mysql_db_query(
		$GLOBALS['g_game_db'],
		$query,
		$GLOBALS['g_db_con']
	);
	
	$found = mysql_fetch_assoc(mysql_db_query(
		$GLOBALS['g_game_db'],
		"SELECT FOUND_ROWS() AS rows",
		$GLOBALS['g_db_con']
	));
	
	$spells[0] = array((int)$found['rows'], MAX_RECORDS);
	while( ($record = mysql_fetch_assoc($stmt)) ) {
		$spells[] = get_spell($record['ID']);
	}
	
	return $spells;
}

function get_profiles( $arguments, $flags, $order, $page ) {
	$page = $page < 1 ? 1 : $page;
	$where = "";
	$orderClause = "";
	$showDeleted = false;
	$profiles = array();
	$user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : 0;
	// arguments
	parse_arguments( $arguments, $matches );
	foreach($matches as $match) {
		$operator = constant($match[2]);
		switch( $match[1] ) {
			case "ismine":
				if( $user_id == 0 ) {
					break;
				}
				else if( $operator != EQ ) {
					$GLOBALS["g_error"] = "Operator ".$match[2]." is not supported";
				}
				else {
					$where .= ( $where ? " AND " : "" ) . ( (int)$match[3] == 0 ? " NOT " : "" ) .  "( `UserID` = '".mysql_real_escape_string($_SESSION['user_id'])."' )";
				}
				break;
			case "showdeleted":
				if( $operator != EQ ) {
					$GLOBALS["g_error"] = "Operator ".$match[2]." is not supported";
				}
				else {
					if( (int)$match[3] == 0 ) {
						$showDeleted = false;
					}
					else {
						$showDeleted = true;
					}
				}
				break;
			case "lvl":
				parse_numeric_argument($where,$operator,$match[3],"`Level`");
				break;
			default:
				echo "unknown argument: ".$match[1];
				break;
		}
	}
	// order
	$orderClause = parse_order( $order, array( "time" => "`Timestamp`", "id" => "`ID`") );
	
	$query = "SELECT SQL_CALC_FOUND_ROWS * FROM `chardev_characters` WHERE ".(!$showDeleted?" `Deleted`='0' AND ":"")." `History` = 0 " . ($where?" AND ".$where:"") . ( $orderClause ? " ORDER BY ".$orderClause : "" ) . " LIMIT ".MAX_RECORDS *($page-1).",".MAX_RECORDS;
//echo htmlspecialchars($arguments);
//	echo ($query);
	$stmt = mysql_db_query(
		$GLOBALS['g_profile_db'],
		$query,
		$GLOBALS['g_db_con']
	);
	
	$found = mysql_fetch_assoc(mysql_db_query(
		$GLOBALS['g_profile_db'],
		"SELECT FOUND_ROWS() AS rows",
		$GLOBALS['g_db_con']
	));
	
	$profiles[0] = array($found['rows'], MAX_RECORDS);
	while( ($record = mysql_fetch_assoc($stmt)) ) {
		$profiles[] = array(
			(int)$record['ID'],
			(int)$record['UserID'],
			(string)$record['Name'],
			(string)$record['Description'],
			(int)$record['ChrRaceID'],
			(int)$record['ChrClassID'],
			(int)$record['Level'],
			date("D, d M Y g:ia",(int)$record['Timestamp'])
		);
	}
	return $profiles;
}

$stat_to_column_name = array( 
	4=>"Strength",
	3=>"Agility",
	7=>"Stamina",
	5=>"Intellect",
	6=>"Spirit",
	13=>"DodgeRating",
	14=>"ParryRating",
	15=>"BlockRating",
	31=>"HitRating",
	32=>"CritRating",
	35=>"ResilienceRating",
	36=>"HasteRating",
	37=>"ExpertiseRating",
	38=>"AttackPower",
	45=>"SpellPower",
	49=>"MasteryRating"
);

function get_sets( $arguments, $flags, $order, $page, $weights ) {
	
	parse_arguments( $arguments, $matches );
	foreach($matches as $match) {
		$operator = constant($match[2]);
		switch( $match[1] ) {
			case "name":
				parse_string_argument($where,$operator,$match[3],"s.`Name`");
				break;
			case "ilvl":
				parse_numeric_argument($where,$operator,$match[3],"cis.`MinItemLevel`");
				break;
			case "reqlvl":
				parse_numeric_argument($where,$operator,$match[3],"cis.`MinRequiredCharacterLevel`");
				break;
		}
	}
	
	$orderClause = parse_order($order, array(
		"setid"=>"s.`ID`",
		"ilvl"=>"cis.`MinItemLevel`",
		"name"=>"s.`Name`",
		"reqlvl"=>"cis.`MinRequiredCharacterLevel`",
	));

	$query = "SELECT SQL_CALC_FOUND_ROWS 
			`ID`,
			`Name`,
			cis.`MinItemLevel`,
			cis.`MaxItemLevel`,
			cis.`MinRequiredCharacterLevel`,
			cis.`MaxRequiredCharacterLevel`,
			cis.`MinQuality`,
			cis.`MaxQuality`,
			`ItemID1`, 
			`ItemID2`, 
			`ItemID3`, 
			`ItemID4`, 
			`ItemID5`, 
			`ItemID6`, 
			`ItemID7`, 
			`ItemID8`, 
			`ItemID9`, 
			`ItemID10` ".
		"FROM `itemset` s INNER join chardev_cataclysm_static.`chardev_itemset_stats` cis ON cis.`ItemSetID` = s.`ID` ".
		( $where ? " WHERE ". $where : '' ) .
		($orderClause ? " ORDER BY ".$orderClause : "").
		" LIMIT ".MAX_RECORDS *($page-1).",".MAX_RECORDS;
	
	$result = mysql_db_query(
		$GLOBALS['g_game_db'],
		$query,
		$GLOBALS['g_db_con']
	);
	
	$found = mysql_fetch_assoc(mysql_db_query(
		$GLOBALS['g_game_db'],
		"SELECT FOUND_ROWS() AS rows",
		$GLOBALS['g_db_con']
	));
	
	$n = 0;
	$sets = array();
	$sets[$n++] = array((int)$found['rows'], (int)MAX_RECORDS);
	while( ($record = mysql_fetch_assoc($result)) ) {
		$sets[$n] = array( 
			(int)$record['ID'], 
			$record['Name'], 
			(int)$record['MinItemLevel'], 
			(int)$record['MaxItemLevel'], 
			(int)$record['MinRequiredCharacterLevel'], 
			(int)$record['MaxRequiredCharacterLevel'], 
			(int)$record['MinQuality'], 
			(int)$record['MaxQuality'], 
			array()
		);
		for( $i = 0; $i < 10; $i++ ) {
			if( (int)$record['ID'] ) {
				$sets[$n][8][] = get_item($record['ItemID'.($i+1)]);
			}
			else {
				$sets[$n] = null;
			}
		}
		$n++;
	}
	return $sets;
}

function get_items( $arguments, $flags, $order, $page, $weights ) {
	$page = $page < 1 ? 1 : $page;
	$where = "";
	$orderClause = "";
	$items = array();
	$join_gem_properties = false;

	$weightedScore = "(0";
	if( $weights ) {
		foreach( $weights as $k => $v ) {
			if( isset($GLOBALS['stat_to_column_name'][$k]) ) {
				$weightedScore .= "+(cis.`".$GLOBALS['stat_to_column_name'][$k]."`*".((float)$v).")";
			}
		}
	}
	$weightedScore .= ")";
	
	// arguments
	parse_arguments( $arguments, $matches );
	foreach($matches as $match) {
		$operator = constant($match[2]);
		switch( $match[1] ) {
			case "str":
				parse_numeric_argument($where,$operator,$match[3],"cis.`Strength`");
				break;
			case "agi":
				parse_numeric_argument($where,$operator,$match[3],"cis.`Agility`");
				break;
			case "sta":
				parse_numeric_argument($where,$operator,$match[3],"cis.`Stamina`");
				break;
			case "int":
				parse_numeric_argument($where,$operator,$match[3],"cis.`Intellect`");
				break;
			case "spi":
				parse_numeric_argument($where,$operator,$match[3],"cis.`Spirit`");
				break;
			case "dod":
				parse_numeric_argument($where,$operator,$match[3],"cis.`DodgeRating`");
				break;
			case "par":
				parse_numeric_argument($where,$operator,$match[3],"cis.`ParryRating`");
				break;
			case "blo":
				parse_numeric_argument($where,$operator,$match[3],"cis.`BlockRating`");
				break;
			case "hit":
				parse_numeric_argument($where,$operator,$match[3],"cis.`HitRating`");
				break;
			case "crit":
				parse_numeric_argument($where,$operator,$match[3],"cis.`CritRating`");
				break;
			case "res":
				parse_numeric_argument($where,$operator,$match[3],"cis.`ResilienceRating`");
				break;
			case "haste":
				parse_numeric_argument($where,$operator,$match[3],"cis.`HasteRating`");
				break;
			case "ap":
				parse_numeric_argument($where,$operator,$match[3],"cis.`AttackPower`");
				break;
			case "sp":
				parse_numeric_argument($where,$operator,$match[3],"cis.`SpellPower`");
				break;
			case "mast":
				parse_numeric_argument($where,$operator,$match[3],"cis.`MasteryRating`");
				break;
			case "name":
				parse_string_argument($where,$operator,$match[3],"cis.`Name".$GLOBALS['g_table_suffix']."`");
				break;
			case "desc":
				parse_string_argument($where,$operator,$match[3],"cis.`Description".$GLOBALS['g_table_suffix']."`");
				break;
			case "subclass":
				if($operator == BA && (int)$match[3] == 0) {
					//ignore filter
				}
				else {
					parse_numeric_argument($where,$operator,$match[3],"i.`ItemSubClass`");
				}
				break;
			case "class":
				parse_numeric_argument($where,$operator,$match[3],"i.`ItemClass`");
				break;
			case "usablebyclass":
				if( $operator != EQ ) {
					$GLOBALS["g_error"] = "Operator ".$match[2]." is not supported";
				}
				else if( (int)$match[3] == 0 ) {
					$cl_c = 's.`ChrClassMask`';
					$where .= ( $where ? " AND " : "" ) . "(" . $cl_c . " = 0 OR (" . $cl_c . " & 1535) = 1535 )";
				}
				else if( ((int)$match[3] & 2047) == 0 ) {
					$GLOBALS["g_error"] = "Value ".$match[3]." is not a valid character class mask";
				}
				else {
					$cl_id = (int)$match[3];
					$cl_c = 's.`ChrClassMask`';
					//TODO add a more substantial item filtering per class, see old php/js interface
					switch($cl_id) {
						case 2:
							$q = " AND ( i.`ItemClass`!=2 OR i.`ItemSubClass` NOT IN (13,15,10) )";
							break;
						case 4:
							$q = " AND ( i.`ItemClass`!=2 OR i.`ItemSubClass` NOT IN (4,5))";
							break;
						case 32:
							$q = " AND ( i.`ItemClass`!=2 OR i.`ItemSubClass` NOT IN (13,15,10) )";
							break;
						case 16:
							break;
						case 128:
							$q = " AND ( i.`ItemClass`!=2 OR i.`ItemSubClass` NOT IN (0,1,4,5,6,8,13))";
							break;
						default:
							$q = "";
					}
					switch($cl_id) {
						case 4:
						case 64:
							$q = " AND ( i.`ItemClass`!=4 OR i.`ItemSubClass` NOT IN (4))";
							break;
						case 8:
						case 1024:
							$q = " AND ( i.`ItemClass`!=4 OR i.`ItemSubClass` NOT IN (3,4))";
							break;
						case 16:
						case 128:
						case 256:
							$q = " AND ( i.`ItemClass`!=4 OR i.`ItemSubClass` NOT IN (2,3,4))";
							break;
					}
					$where .= ( $where ? " AND " : "" ) . "((" . $cl_c ."&". (int)$match[3].")!=0 OR ". $cl_c . "<='0' )".$q;
				}
				break;
			case "issocketablegem":
				if( $operator != EQ ) {
					$GLOBALS["g_error"] = "Operator ".$match[2]." is not supported";
				}
				else {
					$where .= ( $where ? " AND " : "" ) . ( (int)$match[3] == 0 ? " NOT " : "" ) .  "( s.`GemPropertiesID` != 0 )";
				}
				break;
			case "slot":
				if( (1<<5&(int)$match[3]) != 0 ) {
					$match[3]|=1<<20;
				}
				if( (1<<15&(int)$match[3]) != 0 ) {
					$match[3]|=1<<25|1<<26;
				}
				
				parse_numeric_argument($where,$operator,$match[3],"s.`InventorySlot`");
				break;
			case "gemcolor":
				break;
			case "level":
				parse_numeric_argument($where,$operator,$match[3],"s.`Level`");
				break;
			case "reqlvl":
				parse_numeric_argument($where,$operator,$match[3],"s.`RequiredCharacterLevel`");
				break;
			case "gemreqitemlvl":
				$join_gem_properties = true;
				parse_numeric_argument($where,$operator,$match[3],"gp.`MinItemLevel`");
			case "canbeusedwithlvl":
				if( $operator != EQ ) {
					$GLOBALS["g_error"] = "Operator ".$match[2]." is not supported";
				}
				else {
					$where .= ( $where ? " AND " : "" ) . "( s.`RequiredCharacterLevel` <= ".(int)$match[3]." )";
				}
				break;
			case "reqrepu":
				if( $operator != EQ ) {
					$GLOBALS["g_error"] = "Operator ".$match[2]." is not supported";
				}
				else {
					$where .= ( $where ? " AND " : "" ) . ( (int)$match[3] == 0 ? " NOT " : "" ) .  "( s.`RequiredFactionID` != 0 )";
				}
				break;
			case "quality":
				if($operator == BA && (int)$match[3] == 0) {
					//ignore filter
				}
				else {
					parse_numeric_argument($where,$operator,$match[3],"s.`Quality`");
				}
				break;
			case "dps":
				parse_numeric_argument($where,$operator,$match[3],"cis.`DPS`");
				break;
			case "delay":
				parse_numeric_argument($where,$operator,$match[3],"s.`Delay`/1000");
				break;
			default:
				echo "unknown argument: ".$match[1];
				break;
		}
	}
	// order
	
	$orderClause .= parse_order (
		$order,
		array(
			"level" => "s.`Level`",
			"name" => "s.`Name`",
			"subclass" => "i.`ItemSubClass`",
			"dps" => "cis.`DPS`",
			"delay" => "s.`Delay`",
			"slot" => "s.`InventorySlot`",
			"weightedscore" => "WeightedScore",
		)
	);
	$where .= ( $where ? ' AND ' : '' )." cis.`DoNotShow` != 1 ";
	
	$query = "SELECT SQL_CALC_FOUND_ROWS s.`ID`, ".$weightedScore." as WeightedScore ".
		"FROM `item_sparse` s ".
			"INNER JOIN `item` i on i.`ID` = s.`ID` ".
			"LEFT JOIN ".$GLOBALS['g_static_db'].".`chardev_item_stats` cis ON cis.`ItemID`=i.`ID` ".
			"LEFT JOIN `gemproperties` gp ON s.`GemPropertiesID` = gp.`ID` ".
		" WHERE ".( $where ? $where . ' AND ' : '' )." cis.`DoNotShow` != 1 ".
		($orderClause ? " ORDER BY ".$orderClause : "").
		" LIMIT ".MAX_RECORDS *($page-1).",".MAX_RECORDS;
	//echo htmlspecialchars($arguments);
	
	//header("query: ".$query);
	
	//echo $query;
	
	$stmt = mysql_db_query(
		$GLOBALS['g_game_db'],
		$query,
		$GLOBALS['g_db_con']
	);
	
	$found = mysql_fetch_assoc(mysql_db_query(
		$GLOBALS['g_game_db'],
		"SELECT FOUND_ROWS() AS rows",
		$GLOBALS['g_db_con']
	));
	
	$items[0] = array($found['rows'], MAX_RECORDS);
	while( ($record = mysql_fetch_assoc($stmt)) ) {
		$items[] = array(get_item($record['ID']),$record['WeightedScore']);
	}
	return $items;
}

function get_item_classes() 
{
	$stmt = mysql_db_query(
		$GLOBALS['g_game_db'],
		"SELECT * FROM `itemclass` ORDER BY `ID`",
		$GLOBALS['g_db_con']
	);
	
	$item_classes = array();
	while( $record = mysql_fetch_assoc($stmt) ) {
		$item_classes[(int)$record['ID']] = array($record['Name'],array());
		$sub_stmt = mysql_db_query(
			$GLOBALS['g_game_db'],
			"SELECT * FROM `itemsubclass` WHERE `ItemClass` =".(int)$record['ID']." ORDER BY `ItemSubClass`",
			$GLOBALS['g_db_con']
		);
		while( $sub_record = mysql_fetch_assoc($sub_stmt) ) {
			$item_classes[(int)$record['ID']][1][(int)$sub_record['ItemSubClass']] = $sub_record['NameLong'] ? $sub_record['NameLong'] : $sub_record['Name'] ;
		}
	}
	return $item_classes;	
}

function get_skill_line_ability( $id ) {
	$result = mysql_db_query(
		$GLOBALS['g_game_db'],
		"SELECT * FROM `skilllineability` WHERE `ID`=".(int)$id ,
		$GLOBALS['g_db_con']
	);
	$ability = null;
	$record = mysql_fetch_assoc($result);
	
	if( $record ) {
		$ability = read_skill_line_ability($record);
	}
	mysql_free_result($result);
	return $ability;
}

function read_skill_line_ability( $record ) {
	return array(
		(int)$record['ID'],
		get_spell($record['SpellID']),
		(int)$record['RaceMask'],
		(int)$record['ClassMask'],
		(int)$record['RequiredSkill'],
		(int)$record['ReplaceSpellID']
	);
}

function get_character_race( $id )
{
	$stmt = mysql_db_query(
		$GLOBALS['g_game_db'],
		"SELECT * FROM `chrraces` WHERE `ID`=".(int)$id ,
		$GLOBALS['g_db_con']
	);
	$race = null;
	$record = mysql_fetch_assoc($stmt);
	
	if( $record ) {
		$race = array();
		$race[0] = (int)$record['ID'];
		$race[1] = $record['Name'];
		
		$stmt_racials = mysql_db_query(
			$GLOBALS['g_game_db'],
			"SELECT * FROM `skilllineability` WHERE `SkillLineID` = ".$GLOBALS['g_race_to_skill'][$id],
			$GLOBALS['g_db_con']
		);
		
		$race[2] = array();
		while( $racial_record = mysql_fetch_assoc($stmt_racials) ) {
			$race[2][] = read_skill_line_ability( $racial_record );
		}
	}
	return $race;
}

function get_character_class( $id )
{
	$cache_fail = false;
	$talents = null;
	
	$class = get_cached($id,"chardev_chrclass_cache",$cache_fail);
	
	if( $cache_fail ) {
		
		$stmt = mysql_db_query(
			$GLOBALS['g_game_db'],
			"SELECT * FROM `chrclasses` WHERE `ID`=".$id ,
			$GLOBALS['g_db_con']
		);
		$record = mysql_fetch_assoc($stmt);
		
		
		if( $record ) {
			$class = array();
			$class[0] = (int)$record['ID'];
			$class[1] = $record['Name'];
			$class[2] = get_talents($id);
			
			$stmt2 = mysql_db_query(
				$GLOBALS['g_static_db'],
				"SELECT * FROM `chardev_base_stats_class_level` WHERE `class`=".$id,
				$GLOBALS['g_db_con']
			);
	
			$class[3] = array();
			while($record2 = mysql_fetch_assoc($stmt2)){
				$class[3][(int)$record2['level']] = array(
					(int)$record2['str'],
					(int)$record2['agi'],
					(int)$record2['sta'],
					(int)$record2['int'],
					(int)$record2['spi'],
					(int)$record2['hp'],
					(int)$record2['mp'],
					(float)$record2['melee_crit_per_agi'],
					(float)$record2['spell_crit_per_int'],
					(float)$record2['dodge_per_agi'],
					(float)$record2['mana_regen']
				);
			}
			
			$stmt_classials = mysql_db_query(
				$GLOBALS['g_game_db'],
				"SELECT * FROM `skilllineability` WHERE `SkillLineID` = ".$GLOBALS['g_class_to_skill'][$id],
				$GLOBALS['g_db_con']
			);
			
			$class[4] = array();
			while( $classial_record = mysql_fetch_assoc($stmt_classials) ) {
				$class[4][] = read_skill_line_ability( $classial_record );
			}
			
			if( $id == 6 ) {
				$class[4][] = get_skill_line_ability(20646); // Runic focus
			}
			
			$stmt_glyphs = mysql_db_query(
				$GLOBALS['g_game_db'],
				"SELECT gp.`ID` as `ID`, gp.`Type` as `Type`, s.`ID` as `SpellID` ".
					" FROM `glyphproperties` gp INNER JOIN `spell` s on gp.`SpellID` = s.`ID` INNER JOIN `spellclassoptions` sco ON sco.id = s.spellclassoptionsid".
					" WHERE sco.`SpellClassID`='".(int)$GLOBALS['g_class_to_spell_class'][$id]."' ORDER BY gp.`Type` DESC",
				$GLOBALS['g_db_con']
			);
			
			$class[5] = array(array(),array(),array());
			while( $glyph_record = mysql_fetch_assoc($stmt_glyphs) ) {
				$class[5][(int)$glyph_record['Type']][] = array(
					(int)$glyph_record['ID'],
					(int)$glyph_record['Type'],
					get_spell((int)$glyph_record['SpellID'])
				);
			}
			$class[6] = null;
			$class[7] = null;
			$class[8] = null;
			$class[9] = null;
			//	Shapeforms
			//	Id, Shapeform Buff, Passive Spells, Additional Buffs
			//	Self only buffs
			switch((int)$record['ID']) {
				case 1:
					$class[6] = array(
						array(17,
							array(get_spell(2457)),
							array(get_spell(21156))),
						array(18,
							array(get_spell(71)),
							array(get_spell(7376))),
						array(19,
							array(get_spell(2458)),
							array(get_spell(7381)))
					);
					break;
				//
				//	PALADIN
				//
				case 2:
					$class[8] = array(
						array(get_spell(53655),53671),	// Judgement of the Pure, Rank 1
						array(get_spell(53656),53673),	// Judgement of the Pure, Rank 2
						array(get_spell(53657),54151),	// Judgement of the Pure, Rank 3
						array(get_spell(31842),31842)	// Divine Favor
					);
					break;
				//
				//	PRIEST
				//
				case 5:
					$class[6] = array(
						array(28,
							array(get_spell(15473),get_spell(49868)),
							array())
					);
					break;
				//
				//	DEATH KNIGHT
				//
				case 6:
					$class[7] = array(
						get_spell(48263), 	// Blood Presence	
						get_spell(48266), 	// Frost Presence
						get_spell(48265)	// Unholy Presence
					);
					$class[8] = array(
						array(get_spell(51271),51271)	// Pillar of Frost
					);
					break;
				//
				//	MAGE
				//
				case 8:
					$class[8] = array(
						array(get_spell(12472),12472) 	// Icy Veins
					);
					break;
				//
				//	WARLOCK
				//
				case 9:
					break;
				//
				//	DRUID
				//
				case 11:
					$class[6] = array(
						array(1,
							array(get_spell(768)),
							array(get_spell(3025))),
						array(5,
							array(get_spell(5487)),
							array(get_spell(1178),get_spell(21178))),
						array(31,
							array(get_spell(24858),get_spell(24907)),
							array(get_spell(24905)))
					);
					$class[9] = array(get_spell(24932));
					break;
			}
			// $class[10]
		}
	
		set_cache($id,"chardev_chrclass_cache",$class);
	}
	return $class;
}

function get_glyph( $id ) {
	if( !$id || $id < 0 ) {
		return null;
	}
	$record = mysql_fetch_assoc(mysql_db_query(
		$GLOBALS['g_game_db'],
		"SELECT 
			gp.`ID`, 
			gp.`Type`, 
			gp.`SpellID`, 
			i.`ID` as ItemID 
		FROM `glyphproperties` gp 
			LEFT JOIN `spelleffect` se ON gp.`ID` = se.`SecondaryEffect` AND se.`Aura` = '74'
			LEFT JOIN `item_sparse` i ON i.`SpellID2` = se.`SpellID`
		WHERE gp.`ID`=".(int)$id,
		$GLOBALS['g_db_con']
	));
		
	return read_glyph( $record );
}

function read_glyph( $record ) {
	$glyph = null;
	if( $record ) {
		$glyph = array(
			(int)$record['ID'],
			(int)$record['Type'],
			get_spell((int)$record['SpellID']),
			(int)$record['ItemID']
		);
	}
	
	return $glyph;
}

function get_glyph_by_item( $item_id ) {
	$record = mysql_fetch_assoc(mysql_db_query(
		$GLOBALS['g_game_db'],
		"SELECT `SpellID2` FROM `item_sparse` WHERE `ID`=".(int)$item_id,
		$GLOBALS['g_db_con']
	));
	if( $record ) {
		$spell_id = (int)$record['SpellID2'];
		$effect = mysql_fetch_assoc(mysql_db_query(
			$GLOBALS['g_game_db'],
			"SELECT `SecondaryEffect` FROM `spelleffect` WHERE `Aura`='74' AND `SpellID`=".(int)$spell_id,
			$GLOBALS['g_db_con']
		));
		if( $effect ) {
			$glyph = mysql_fetch_assoc(mysql_db_query(
				$GLOBALS['g_game_db'],
				"SELECT * FROM `glyphproperties` where `ID`=".(int)$effect['SecondaryEffect'],
				$GLOBALS['g_db_con']
			));
			return read_glyph( $glyph );
		}
		else {
			return null;
		}
	}
	else {
		return 0;
	}
}

function getXML($fn){		
	ini_set("user_agent","Mozilla/5.0 (Windows; U; Windows NT 5.0; de-DE; rv:1.6) Gecko/20040206 Firefox/1.0.1");
	
	ini_set('default_socket_timeout', 5);
	
	$old = error_reporting(1); 
	$f = fopen($fn,"r");
	error_reporting($old);
	
	if( !$f ){
		return null;
	}
	
	
	$xml = "";
	
	if( $f )
	{  
		while( !feof($f) ){		
			$xml .= fread($f,8192);
		}
		fclose($f);
	}
	return $xml;
}

function recurse_xml($xml,&$arr)
{
	$child_count = 0;
	$arr['childs'] = array();
	$arr['attributes'] = array();
	
	foreach($xml->attributes() as $key=>$value)
		$arr['attributes'][$key]=$value;
		
	foreach($xml as $key=>$value){
		if(!is_array($arr['childs'][$key]))
			$arr['childs'][$key] = array();
		recurse_xml($value,$arr['childs'][$key][sizeof($arr['childs'][$key])]);
	}
}
	
function convertSlot($s){
	switch($s){
		case 0: $slot = 0;break;
		case 1: $slot = 1;break;
		case 2: $slot = 2;break;
		case 3: $slot = 5;break;
		case 4: $slot = 4;break;
		case 5: $slot = 9;break;
		case 6: $slot = 10;break;
		case 7: $slot = 11;break;
		case 8: $slot = 7;break;
		case 9: $slot = 8;break;
		case 10: $slot = 12;break;
		case 11: $slot = 13;break;
		case 12: $slot = 14;break;
		case 13: $slot = 15;break;
		case 14: $slot = 3;break;
		case 15: $slot = 16;break;
		case 16: $slot = 17;break;
		case 17: $slot = 18;break;
		case 18: $slot = 6;break;
		case -1: $slot = 19;break;
	}
	return $slot;
}
define('ARMORY_IMPORT_UNABLE_TO_READ_FILE',"The requested url does not exist, check your inputs!");
define('ARMORY_IMPORT_UNABLE_TO_READ_XML',"Unable to parse the requested file, possibly armory error or character does not exist!");
define('ARMORY_IMPORT_NO_REGION',"The request contained no or an invalid region identifier!");
define('ARMORY_IMPORT_NO_SERVER',"The request contained no or an invalid server name!");
define('ARMORY_IMPORT_NO_NAME',"The request contained no or an invalid character name!");
define('ARMORY_IMPORT_INVALID_INPUTS',"The requested armory profiles was not found, check your inputs!");

define('ARMORY_IMPORT_REGION_US',0);
define('ARMORY_IMPORT_REGION_EU',1);
define('ARMORY_IMPORT_REGION_KR',2);
define('ARMORY_IMPORT_REGION_TW',3);
define('ARMORY_IMPORT_REGION_CN',4);

function get_armory_profile( $numRegion, $server, $name, &$error ) 
{
	if( !$name || !is_string($name) || strlen($name)<2 ) {
		$error = ARMORY_IMPORT_NO_NAME;
	}
	if( !$server || !is_string($server) || strlen($server)<2 ) {
		$error = ARMORY_IMPORT_NO_SERVER;
	}
	if( !is_numeric($numRegion) || $numRegion<0 || $numRegion>4 ) {
		$error = ARMORY_IMPORT_NO_REGION;
	}
	
	$regionLong = "US";
	$region = "www";
	switch($numRegion) {
		case ARMORY_IMPORT_REGION_EU: $region = "eu";$regionLong="Europe"; break; 
		case ARMORY_IMPORT_REGION_KR: $region = "kr";$regionLong="Korea"; break;
		case ARMORY_IMPORT_REGION_TW: $region = "tw";$regionLong="Taiwan"; break;
		case ARMORY_IMPORT_REGION_CN: $region = "cn";$regionLong="China"; break;
	}
	
	$url = "http://".$region.".wowarmory.com/character-sheet.xml?r=".str_replace(" ","+",urlencode($server))."&n=".urlencode($name);
		
	$charsheet = getXML($url);
	if( $charsheet == null ) {
		$error = ARMORY_IMPORT_UNABLE_TO_READ_FILE."<br />Requested URL was ".$url.".";
		return null;
	}
	
	$url = "http://".$region.".wowarmory.com/character-talents.xml?r=".str_replace(" ","+",urlencode($server))."&n=".urlencode($name)."&group=1";
	$talents = getXML($url);
	if( $charsheet == null ) {
		$error = ARMORY_IMPORT_UNABLE_TO_READ_FILE."<br />Requested URL was ".$url.".";;
		return null;
	}

	$xml = simplexml_load_string($charsheet);
	if( !$xml ) {
		$error = ARMORY_IMPORT_UNABLE_TO_READ_XML;
		return null;
	}
	
	$char = null;
	
	if( $xml ) {
		
		$char = array();
		
		if( $xml->characterInfo['errCode'] == "noCharacter" ) {
			$error = ARMORY_IMPORT_INVALID_INPUTS."<br />Name: ".$name." Server: ".$server." Region: ".$regionLong;
			return null;
		}
		
		$character = $xml->characterInfo->character[0];		
		$char[0] = array(
			(string)$character['name'],
			(string)$character['realm'],
			get_character_race((int)$character['raceId']),
			get_character_class((int)$character['classId']),
			(int)$character['level']
		);
		
		$char[1] = array();
		$itms = $xml->characterInfo->characterTab[0]->items[0];
		foreach($itms as $item) {
			$char[1][convertSlot((int)$item['slot'])] = array(
				get_item((int)$item['id']),
				get_item((int)$item['gem0Id']),
				get_item((int)$item['gem1Id']),
				get_item((int)$item['gem2Id']),
				get_spell_item_enchantment((int)$item['permanentenchant']),
				0, // Reforge
				(int)$item['randomPropertiesId']
			);
		}
		
		
		$char[3] = array();
		
		$talent_xml = simplexml_load_string($talents);
		
		if( $talent_xml ) {
			$talentGroups = $talent_xml->characterInfo->talents[0]->talentGroup;
			$talentStr = "";
			
			for( $i=0;$i<count($talentGroups);$i++ ) {
				
				if( $talentGroups[$i]['active'] && (int)$talentGroups[$i]['active'] == 1 ) {
					$talentStr = $talentGroups[$i]->talentSpec['value'];
					$glyphs = $talentGroups[$i]->glyphs[0];
					foreach($glyphs as $glyph) {
						$char[3][] = get_glyph($glyph['id']);
					}
					break;
				}
			}
			$char[2] = (string)$talentStr;
		}
		
	
	}
	return $char;
}

function update_realm_database () {
	$client = new cpa_client( BNET_PRIVATE_KEY, BNET_PUBLIC_KEY );
	
	$regions = array( 'us', 'eu', 'kr', 'cn', 'tw' );
	$typeStrToMask = array( 'pve' => 0, 'pvp' => 1, 'rp'=> 2, 'rppvp' => 3 );
	
	foreach( $regions as $val ) {
		$json = $client->get_realm_list($val);
		
		$cached = array();
	
		if( ! $json ) {
			continue;
		}
		
		$obj = json_decode($json);
		
		$realms = $obj->realms;
		
		for( $i=0; $i<count($realms); $i++ ) {
			
			$realm = $realms[$i];
			
			mysql_query("REPLACE INTO chardev_user.`realm` 
							VALUES ( 
								'".mysql_real_escape_string($realm->name)."',
								'".mysql_real_escape_string($val)."', 
								".(int)$typeStrToMask[$realm->type].",
								'".mysql_real_escape_string($realm->slug)."'
							) "
			);
			
			echo mysql_error();
			
			$cached[] = $realm->name;
		}
		
		mysql_query("UPDATE chardev_user.`region` SET `CachedRealmList` = '".mysql_real_escape_string(serialize($cached))."' WHERE `Region` = '".$val."'");
	}
}

function get_realm_lists () {

	$n = rand( 0, 10000 );

	if( $n == 0 ) {
		update_realm_database();
	}
	
	$result = mysql_query("SELECT * FROM chardev_user.`region`");
	echo mysql_error();
	$lists = array();
	
	while($record = mysql_fetch_assoc($result)) {
		$lists[$record['Region']] = unserialize($record['CachedRealmList']);
	}
	
	return $lists;
}

function get_battlenet_profile( $region, $server, $name, &$error )
{
	if( !$name || !is_string($name) || strlen($name)<2 ) {
		$error = ARMORY_IMPORT_NO_NAME;
	}
	if( !$server || !is_string($server) || strlen($server)<2 ) {
		$error = ARMORY_IMPORT_NO_SERVER;
	}

	$client = new cpa_client( BNET_PRIVATE_KEY, BNET_PUBLIC_KEY );

	$cp_json = $client->get_profile( 
		$name, 
		$server, 
		$region,
		array(
			cpa_client::PROFILE_ITEMS, 
			cpa_client::PROFILE_TALENTS, 
			cpa_client::PROFILE_PROFESSIONS
		)
	);
	
	if( ! $cp_json ) {
		$error = "<div>The requested url does not exist, check your inputs!</div><div>Character name: ".$name."</br>Server: ".$server."</div>";
		return null;
	}

	$cp = json_decode($cp_json);

	$char = array();
	$char[0] = array(
		mb_convert_case ( $cp->name, MB_CASE_TITLE ) ,
		mb_convert_case ( $cp->realm, MB_CASE_TITLE ) ,
		get_character_race((int)$cp->race),
		get_character_class((int)$cp->class),
		(int)$cp->level
	);

	$char[1] = array();
	foreach( $cp->items as $key=>$itm ) {
		
		if( ! isset($GLOBALS['g_slot_name_to_chardev_slot_id'][$key]) ) {
			continue;
		}
		
		$prm = $itm->tooltipParams;
		
		$reforge = null;
		if( isset($prm->reforge) ) {
			$reforge_id = (int)$itm->tooltipParams->reforge;
			
			$reduced_id = floor( ($reforge_id - 113) / 7 );
			$reduced = $GLOBALS['reforgable_stats'][$reduced_id];
			$added = $reforge_id - 113 - $reduced_id * 7;
			$added += $added >= $reduced_id ? 1 : 0 ;
			$added = $GLOBALS['reforgable_stats'][$added];
			$reforge = array($reduced,$added);
		}
		
		$char[1][$GLOBALS['g_slot_name_to_chardev_slot_id'][$key]] = array(
			get_item( isset($itm->id)  ? (int)$itm->id  : 0  ),
			get_item( isset($prm->gem0)  ? (int)$prm->gem0  : 0  ),
			get_item( isset($prm->gem1)  ? (int)$prm->gem1  : 0  ),
			get_item( isset($prm->gem2)  ? (int)$prm->gem2  : 0  ),
			get_spell_item_enchantment( isset($prm->enchant) ? (int)$prm->enchant : 0 ),
			$reforge, // chardev reforge
			isset($prm->suffix)  ? (int)$prm->suffix  : 0, // random props
			isset($prm->tinker) ? array(get_spell_item_enchantment($prm->tinker)) : null
		);
	}

	$active_talents = isset($cp->talents[0]->selected) && $cp->talents[0]->selected ? $cp->talents[0] : $cp->talents[1];

	$char[2] = $active_talents->build;
	$char[3] = array();

	$prime_glyphs = $active_talents->glyphs->prime;
	$major_glyphs = $active_talents->glyphs->major;
	$minor_glyphs = $active_talents->glyphs->minor;

	for( $i = 0; $i < count($prime_glyphs); $i++ ) {
		$char[3][] = get_glyph((int)$prime_glyphs[$i]->glyph);
	}
	for( $i = 0; $i < count($major_glyphs); $i++ ) {
		$char[3][] = get_glyph((int)$major_glyphs[$i]->glyph);
	}
	for( $i = 0; $i < count($minor_glyphs); $i++ ) {
		$char[3][] = get_glyph((int)$minor_glyphs[$i]->glyph);
	}

	$primary_professions = $cp->professions->primary;
	$char[5] = array();
	for( $i = 0; $i < count($primary_professions); $i++ ) {
		$char[5][] = array( 
			$primary_professions[$i]->id, 
			$primary_professions[$i]->rank 
		);
	}
	
	return $char;
}
	
function http_get($fn, $retries){		
	$content = "";
	$retry = 0;
	
	ini_set("user_agent","Mozilla/5.0 (Windows; U; Windows NT 5.0; de-DE; rv:1.6) Gecko/20040206 Firefox/1.0.1");
	ini_set('default_socket_timeout', 7);
	
	
	while( $retry <= $retries && !$content  )
	{
		$retry ++;
		
		$old = error_reporting(1); 
		$f = fopen($fn,"r");
		error_reporting($old);
		
		if( !$f ){
			return null;
		}
		
		$content = "";
		
		if( $f )
		{  
			while( !feof($f) ){		
				$content .= fread($f,4096);
			}
			fclose($f);
		}
	}
	
	return $content;
}

function http_get_xml($url, &$error) {
	$content = "";
	$retry = 0;
	$xml = null;
	while( $retry <= MAX_RETRIES && ( !$content || !$xml )  )
	{
		$retry ++;
		
		//$old = error_reporting(1); 
		$content = file_get_contents($url);
		//error_reporting($old);
		
		if( !$content ) {
			$error = ARMORY_IMPORT_UNABLE_TO_READ_FILE."<br />Requested URL was ".$url.".";
			continue;
		}
	
		$xml = simplexml_load_string($content);
		if( !$xml ) {
			$error = ARMORY_IMPORT_UNABLE_TO_READ_XML;
			continue;
		}
		break;
	}
	if( !$xml ) {
		$error = ARMORY_IMPORT_UNABLE_TO_READ_XML;
	}
	return $xml;
}

function get_profile( $profile_id ) {
	if( !$profile_id ) {
		return json_encode(null);
	}
	
	$record = mysql_fetch_assoc(mysql_db_query(
		$GLOBALS['g_profile_db'],
		"SELECT `UserID`, `Serialized` FROM `chardev_characters` WHERE `ID`='".(int)$profile_id."' ORDER BY `History` ASC",
		$GLOBALS['g_db_con']
	));
	
	if( $record ) {
	
		$r = unserialize($record['Serialized']); 
		$r[0][2] = get_character_race((int)$r[0][2]);
		$r[0][3] = get_character_class((int)$r[0][3]);
		for( $i=0; $i<count($r[1]); $i++ ) {
			if( $r[1][$i] == null ) {
				$r[1][$i] = null;
			} 
			else {
				
				
				$r[1][$i][0] = get_item($r[1][$i][0]);
				$r[1][$i][1] = get_item($r[1][$i][1]);
				$r[1][$i][2] = get_item($r[1][$i][2]);
				$r[1][$i][3] = get_item($r[1][$i][3]);
				$r[1][$i][4] = get_spell_item_enchantment($r[1][$i][4]);
				
				if( isset($r[1][$i][7]) ) {
					for($j=0;$j<count($r[1][$i][7]);$j++) {
						$r[1][$i][7][$j] =  get_spell_item_enchantment($r[1][$i][7][$j]);
					}
				}
			}
		}
		for( $i=0; $i<count($r[3]); $i++ ) {
			$r[3][$i] = get_glyph($r[3][$i]);
		}
		if( isset($r[6]) ) {
			for( $i=0; $i<count($r[6]); $i++ ) {
				if( is_array($r[6][$i]) ) {
					$r[6][$i] = array(get_spell($r[6][$i][0]), $r[6][$i][1]);
				}
				else if( is_numeric($r[6][$i])) {
					$r[6][$i] = array(get_spell($r[6][$i]), 1);
				}
			}
		}
		return array( "character" => $r, "user_id" => $record["UserID"] );
	}
	else {
		return null;
	}
}

function get_item_link($itemId){
	
	$record = mysql_fetch_assoc(mysql_db_query(
		$GLOBALS['g_game_db'],
		"SELECT * FROM `item_sparse` s LEFT JOIN ".$GLOBALS['g_static_db'].".`chardev_item_stats` cis ON s.`ID`=cis.`ItemID` WHERE s.`ID`='".(int)$itemId."'",
		$GLOBALS['g_db_con']
	));
	
	if( !$record ) {
		return -1;
	}
	return array(
		$record['Name'.$GLOBALS['g_table_suffix']] ? $record['Name'.$GLOBALS['g_table_suffix']] : $record['Name'] ,
		(int)$record['Quality']);
}

function authenticate( $user_name, $password, $stay_logged_in, &$notice ) {
	session_unregister('user_name');
	session_unregister('password');
	session_unregister('avatar');
	session_unregister('user_id');
	session_unregister('role');
	session_unregister('donated');
	session_unregister('language');
	
	if(!isset($user_name) || !$user_name)
	{ 
		$notice .= "No user name set!";
		return false;
	}
	
	if(!isset($password) || !$password)
	{ 
		$notice .= "No password set!";
		return false;
	}
	
	$record = mysql_fetch_assoc(mysql_db_query(
		$GLOBALS['g_user_db'],
		"SELECT * FROM `user` WHERE `pw` LIKE '".mysql_real_escape_string($password)."' AND `name` LIKE '".mysql_real_escape_string($user_name)."'",
		$GLOBALS['g_db_con']
	));
	
	if( !$record ){ 
		
		$record2 = mysql_fetch_assoc(mysql_db_query(
			$GLOBALS['g_user_db'],
			"SELECT * FROM `pending` WHERE pw LIKE '".mysql_real_escape_string($password)."' AND name LIKE '".mysql_real_escape_string($user_name)."'",
			$GLOBALS['g_db_con']
		));
		
		if( $record2 )
		{
			$notice .= "Your registration is pending!<br/>".
				"You should have received an activation email, if not, click <a class='std_link' href='?resend_mail&to=".$user_name."'>here</a> to send the mail agin.";
			return false;
		}
		else
		{
			$notice .= "wrong user name or password";
			return false;
		}
	}
	else{
		$_SESSION['user_name']=$record['name'];
		$_SESSION['password']=$record['pw'];
		$_SESSION['role']=$record['role'];
		$_SESSION['user_id']=$record['userID'];
		if($stay_logged_in){
			setCookie("user_name",$user_name,time()+2592000);
			setCookie("password",$password,time()+2592000);
		}
		$record_donated = mysql_fetch_assoc(mysql_db_query(
			$GLOBALS['g_user_db'],
			"SELECT * FROM `donations` WHERE `userID` = '".(int)$_SESSION['user_id']."' AND `amount` > '0' ",
			$GLOBALS['g_db_con']
		));
		
		$record_data = mysql_fetch_assoc(mysql_query(
			"SELECT * FROM chardev_user.`user_data` WHERE `UserID` = '".(int)$_SESSION['user_id']."'",
			$GLOBALS['g_db_con']
		));
		$_SESSION['donated'] = $record_donated ? true : false;
		$_SESSION['language']=$record_data['Language'];
		$_SESSION['avatar']=$record_data['Avatar'];
		
		$ud = new user_data((int)$record['userID']);
		
		$_SESSION['user_data'] = array(
			"battlenet_profiles" => $ud->get_battlenet_profiles(),
			"region" => $ud->get_region(),
		);
		
		return true;
	}
}

function set_user_settings($key,$value)
{
	if(isset($_SESSION['user_id'])){
		if( $key == 'language' ){
			
			$value = (int)$value;
			
			if($value == 0 || $value == 2 || $value == 3  || $value == 6  || $value == 8)
			{
				mysql_query("UPDATE ".$GLOBALS['g_user_db'].".`user` SET `$key` = '".mysql_real_escape_string($value)."' WHERE userID=".$_SESSION['user_id']);
			}
		}
		
	}
}

function logout() {
	session_unregister('user_name');
	session_unregister('password');
	session_unregister('avatar');
	session_unregister('user_id');
	session_unregister('role');
	session_unregister('donated');
	setCookie("user_name","",0);
	setCookie("password","",0);
}

function get_buffs() {
	$buffs = array();
	// Warrior
	$buffs["Warrior"] = array(
		get_spell(29801),	// Rampage
		get_spell(6673)		// Battle Shout
	);
	// Paladin
	$buffs["Paladin"] = array(
		get_spell(465),		// Devotion Aura
		get_spell(19891),	// Resistance Aura
		get_spell(79062),	// Blessing of Kings
		get_spell(79101),	// Blessing of Might
		get_spell(84963), 	// Inquisition
		get_spell(66011),	// Avenging Wrath
		get_spell(86700),	// Ancient Power
		get_spell(31801)	// Seal of Truth
	);
	// Hunter
	$buffs["Hunter"] = array(
		get_spell(93435),	// Roar of Courage
		get_spell(19506), 	// Trueshot Aura
		get_spell(53290),	// Hunting Party
		get_spell(13165)	// Aspect of the Hawk
	);
	// Rogue
	$buffs["Rogue"] = array(
		get_spell(51701)	// Honor Among Thieves
	);
	// Priest
	$buffs["Priest"] = array(
		get_spell(49868),	// Mind Quickening
		get_spell(79104), 	// Power Word: Fortitude
		get_spell(588),		// Inner Fire
		get_spell(73413)	// Inner Will
	);
	// Death knight
	$buffs["DeathKnight"] = array(
		get_spell(57330),	// Horn of Winter
		get_spell(55610),	// Improved Icy Talons
		get_spell(53138),	// Abomination's Might
		get_spell(49016)	// Unholy Frenzy
	);
	// Shaman
	$buffs["Shaman"] = array(
		get_spell(8076),	// Strength of Earth Totem
		get_spell(51470),	// Elemental Oath
		get_spell(8515),	// Windfury Totem
		get_spell(2895), 	// Wrath of Air Totem
		get_spell(52109),	// Flametongue Totem
		get_spell(32182),	// Heroism
		get_spell(30808),	// Unleashed Rages
		get_spell(77747),	// Totemic Wrath
		get_spell(52127)	// Water Shield
	);
	// Mage
	$buffs["Mage"] = array(
		get_spell(80353), 	// Time warp
		get_spell(79057),	// Arcane Brilliance
		get_spell(30482)	// Molten Armor
	);
	// Warlock
	$buffs["Warlock"] = array(
		get_spell(54424),	// Fel Intelligence
		get_spell(6307), 	// Blood Pact
		get_spell(53646),	// Demonic Pact
		get_spell(28176),	// Fel Armor
		get_spell(85767)	// Dark Intent
	);
	// Druid
	$buffs["Druid"] = array(
		get_spell(79060), 	// Mark of the Wild
		get_spell(24932),	// Leader of the Pack
		get_spell(24907)	// Moonkin Aura
	);
	
	/*
	select concat('get_spell(',s.id,'),     // ',replace(replace(upper(s.name),'\'',''),' ','_'),'(',csi.elixirmask,')') 
		from spell s 
			left join item_sparse i on s.id = i.spellid1 
			inner join item ii on ii.id =i.id 
			inner join chardev_spellinfo csi on csi.spellid = s.id  
		where 
			(1<<itemsubclass)&(4+8) and itemclass=0 
		order by csi.elixirmask
	*/
	
	$buffs["Elixirs"] = array(
		get_spell(6512),     // DETECT_LESSER_INVISIBILITY(0)
		get_spell(7178),     // WATER_BREATHING(0)
		get_spell(16589),     // NOGGENFOGGER_ELIXIR(0)
		get_spell(11389),     // DETECT_UNDEAD(0)
		get_spell(11403),     // DREAM_VISION(0)
		get_spell(11407),     // DETECT_DEMON(0)
		get_spell(22807),     // GREATER_WATER_BREATHING(0)
		get_spell(28489),     // CAMOUFLAGE(0)
		get_spell(28496),     // GREATER_STEALTH_DETECTION(0)
		get_spell(7178),     // WATER_BREATHING(0)
		get_spell(22807),     // GREATER_WATER_BREATHING(0)
		get_spell(44467),     // RECOVERY_DIVERS_POTION(0)
		get_spell(48719),     // WATER_BREATHING(0)
		get_spell(65253),     // MIXTURE_OF_THE_FROST_WYRM(0)
		get_spell(65255),     // MIXTURE_OF_STONEBLOOD(0)
		get_spell(65252),     // MIXTURE_OF_ENDLESS_RAGE(0)
		get_spell(65254),     // MIXTURE_OF_PURE_MOJO(0)
		get_spell(59640),     // UNDERBELLY_ELIXIR(0)
		get_spell(91722),     // PUFFER_BREATH(0)
		get_spell(92679)     // FLASK_OF_BATTLE(0)
	);
	$buffs["BattleElixirs"] = array(
		get_spell(2367),     // LESSER_STRENGTH(1)
		get_spell(2374),     // LESSER_AGILITY(1)
		get_spell(3160),     // AGILITY(1)
		get_spell(3164),     // STRENGTH(1)
		get_spell(7844),     // FIRE_POWER(1)
		get_spell(8212),     // ENLARGE(1)
		get_spell(11328),     // AGILITY(1)
		get_spell(11390),     // ARCANE_ELIXIR(1)
		get_spell(11334),     // GREATER_AGILITY(1)
		get_spell(11405),     // ELIXIR_OF_THE_GIANTS(1)
		get_spell(11406),     // ELIXIR_OF_DEMONSLAYING(1)
		get_spell(11474),     // SHADOW_POWER(1)
		get_spell(17038),     // WINTERFALL_FIREWATER(1)
		get_spell(17535),     // ELIXIR_OF_THE_SAGES(1)
		get_spell(17538),     // ELIXIR_OF_THE_MONGOOSE(1)
		get_spell(17537),     // ELIXIR_OF_BRUTE_FORCE(1)
		get_spell(17539),     // GREATER_ARCANE_ELIXIR(1)
		get_spell(21920),     // FROST_POWER(1)
		get_spell(24363),     // MAGEBLOOD_ELIXIR(1)
		get_spell(26276),     // GREATER_FIREPOWER(1)
		get_spell(28490),     // MAJOR_STRENGTH(1)
		get_spell(28491),     // HEALING_POWER(1)
		get_spell(28493),     // MAJOR_FROST_POWER(1)
		get_spell(54494),     // MAJOR_AGILITY(1)
		get_spell(28501),     // MAJOR_FIREPOWER(1)
		get_spell(28503),     // MAJOR_SHADOW_POWER(1)
		get_spell(28509),     // GREATER_MANA_REGENERATION(1)
		get_spell(33720),     // ONSLAUGHT_ELIXIR(1)
		get_spell(54452),     // ADEPTS_ELIXIR(1)
		get_spell(33726),     // ELIXIR_OF_MASTERY(1)
		get_spell(38954),     // FEL_STRENGTH_ELIXIR(1)
		get_spell(39627),     // ELIXIR_OF_DRAENIC_WISDOM(1)
		get_spell(45373),     // BLOODBERRY(1)
		get_spell(28497),     // MIGHTY_AGILITY(1)
		get_spell(53746),     // WRATH_ELIXIR(1)
		get_spell(33721),     // SPELLPOWER_ELIXIR(1)
		get_spell(53747),     // ELIXIR_OF_SPIRIT(1)
		get_spell(53748),     // MIGHTY_STRENGTH(1)
		get_spell(53749),     // GURUS_ELIXIR(1)
		get_spell(53764),     // MIGHTY_MANA_REGENERATION(1)
		get_spell(60340),     // ACCURACY(1)
		get_spell(60341),     // DEADLY_STRIKES(1)
		get_spell(60344),     // EXPERTISE(1)
		get_spell(80532),     // ARMOR_PIERCING(1)
		get_spell(60346),     // LIGHTNING_SPEED(1)
		get_spell(63729),     // ELIXIR_OF_MINOR_ACCURACY(1)
		get_spell(79468),     // GHOST_ELIXIR(1)
		get_spell(79474),     // ELIXIR_OF_THE_NAGA(1)
		get_spell(79477),     // ELIXIR_OF_THE_COBRA(1)
		get_spell(79481),     // IMPOSSIBLE_ACCURACY(1)
		get_spell(79632),     // MIGHTY_SPEED(1)
		get_spell(79635)     // ELIXIR_OF_THE_MASTER(1)
	);
	$buffs["GuardianElixirs"] = array(
		get_spell(2378),     // HEALTH(2)
		get_spell(3219),     // WEAK_TROLLS_BLOOD_ELIXIR(2)
		get_spell(3166),     // LESSER_INTELLECT(2)
		get_spell(3222),     // STRONG_TROLLS_BLOOD_ELIXIR(2)
		get_spell(3220),     // ARMOR(2)
		get_spell(3593),     // ELIXIR_OF_FORTITUDE(2)
		get_spell(3223),     // MAJOR_TROLLS_BLOOD_ELIXIR(2)
		get_spell(673),     // LESSER_ARMOR(2)
		get_spell(11319),     // WATER_WALKING(2)
		get_spell(11349),     // ARMOR(2)
		get_spell(11371),     // GIFT_OF_ARTHAS(2)
		get_spell(11396),     // GREATER_INTELLECT(2)
		get_spell(12608),     // STEALTH_DETECTION(2)
		get_spell(11348),     // GREATER_ARMOR(2)
		get_spell(24361),     // MIGHTY_TROLLS_BLOOD_ELIXIR(2)
		get_spell(28502),     // MAJOR_ARMOR(2)
		get_spell(28514),     // EMPOWERMENT(2)
		get_spell(29348),     // GOLDENMIST_SPECIAL_BREW(2)
		get_spell(39625),     // ELIXIR_OF_MAJOR_FORTITUDE(2)
		get_spell(39626),     // EARTHEN_ELIXIR(2)
		get_spell(39628),     // ELIXIR_OF_IRONSKIN(2)
		get_spell(53751),     // ELIXIR_OF_MIGHTY_FORTITUDE(2)
		get_spell(53763),     // PROTECTION(2)
		get_spell(60343),     // MIGHTY_DEFENSE(2)
		get_spell(60347),     // MIGHTY_THOUGHTS(2)
		get_spell(79480),     // ELIXIR_OF_DEEP_EARTH(2)
		get_spell(79631)     // PRISMATIC_ELIXIR(2)
	);
	$buffs["Flasks"] = array(
		get_spell(17626),     // FLASK_OF_THE_TITANS(3)
		get_spell(17627),     // DISTILLED_WISDOM(3)
		get_spell(17628),     // SUPREME_POWER(3)
		get_spell(17629),     // CHROMATIC_RESISTANCE(3)
		get_spell(28518),     // FLASK_OF_FORTIFICATION(3)
		get_spell(28519),     // FLASK_OF_MIGHTY_RESTORATION(3)
		get_spell(28520),     // FLASK_OF_RELENTLESS_ASSAULT(3)
		get_spell(28521),     // FLASK_OF_BLINDING_LIGHT(3)
		get_spell(28540),     // FLASK_OF_PURE_DEATH(3)
		get_spell(40568),     // UNSTABLE_FLASK_OF_THE_ELDER(3)
		get_spell(40575),     // UNSTABLE_FLASK_OF_THE_SOLDIER(3)
		get_spell(40572),     // UNSTABLE_FLASK_OF_THE_BEAST(3)
		get_spell(40567),     // UNSTABLE_FLASK_OF_THE_BANDIT(3)
		get_spell(40573),     // UNSTABLE_FLASK_OF_THE_PHYSICIAN(3)
		get_spell(40576),     // UNSTABLE_FLASK_OF_THE_SORCERER(3)
		get_spell(28518),     // FLASK_OF_FORTIFICATION(3)
		get_spell(28520),     // FLASK_OF_RELENTLESS_ASSAULT(3)
		get_spell(28519),     // FLASK_OF_MIGHTY_RESTORATION(3)
		get_spell(17628),     // SUPREME_POWER(3)
		get_spell(41609),     // FORTIFICATION_OF_SHATTRATH(3)
		get_spell(41610),     // MIGHTY_RESTORATION_OF_SHATTRATH(3)
		get_spell(41611),     // SUPREME_POWER_OF_SHATTRATH(3)
		get_spell(41608),     // RELENTLESS_ASSAULT_OF_SHATTRATH(3)
		get_spell(42735),     // CHROMATIC_WONDER(3)
		get_spell(46837),     // PURE_DEATH_OF_SHATTRATH(3)
		get_spell(46839),     // BLINDING_LIGHT_OF_SHATTRATH(3)
		get_spell(53752),     // LESSER_FLASK_OF_TOUGHNESS(3)
		get_spell(62380),     // LESSER_FLASK_OF_RESISTANCE(3)
		get_spell(53760),     // FLASK_OF_ENDLESS_RAGE(3)
		get_spell(54212),     // FLASK_OF_PURE_MOJO(3)
		get_spell(53758),     // FLASK_OF_STONEBLOOD(3)
		get_spell(53755),     // FLASK_OF_THE_FROST_WYRM(3)
		get_spell(53755),     // FLASK_OF_THE_FROST_WYRM(3)
		get_spell(53760),     // FLASK_OF_ENDLESS_RAGE(3)
		get_spell(54212),     // FLASK_OF_PURE_MOJO(3)
		get_spell(53758),     // FLASK_OF_STONEBLOOD(3)
		get_spell(67019),     // FLASK_OF_THE_NORTH(3)
		get_spell(79469),     // FLASK_OF_STEELSKIN(3)
		get_spell(79470),     // FLASK_OF_THE_DRACONIC_MIND(3)
		get_spell(79471),     // FLASK_OF_THE_WINDS(3)
		get_spell(79472),     // FLASK_OF_TITANIC_STRENGTH(3)
		get_spell(79637),     // FLASK_OF_ENHANCEMENT(3)
		get_spell(94160),     // FLASK_OF_FLOWING_WATER(3)
	);
	
	$buffs["Food"] = array(
		get_item(64641),    //"Delicious" Worm Steak
		get_item(62671),    //Severed Sagefish Head
		get_item(62670),    //Beer-Basted Crocolisk
		get_item(62669),    //Skewered Eel
		get_item(62668),    //Blackbelly Sushi
		get_item(62667),    //Mushroom Sauce Mudfish
		get_item(62666),    //Delicious Sagefish Tail
		get_item(62665),    //Basilisk Liverdog
		get_item(62664),    //Crocolisk Au Gratin
		get_item(62663),    //Lavascale Minestrone
		get_item(62662),    //Grilled Dragon
		get_item(62661),    //Baked Rockfish
		get_item(62660),    //Pickled Guppy
		get_item(62659),    //Hearty Seafood Soup
		get_item(62658),    //Tender Baked Turtle
		get_item(62657),    //Lurker Lunch
		get_item(62656),    //Whitecrest Gumbo
		get_item(62655),    //Broiled Mountain Trout
		get_item(62654),    //Lavascale Fillet
		get_item(62653),    //Salted Eye
		get_item(62652),    //Seasoned Crab
		get_item(62651),    //Lightly Fried Lurker
		get_item(62649),    //Fortune Cookie
		get_item(62290),    //Seafood Magnifique Feast
		get_item(62289),    //Broiled Dragon Feast
		get_item(60858),    //Goblin Barbecue
		get_item(57519),    //Cookie's Special Ramlette
		get_item(46887),    //Bountiful Feast
		get_item(46691),    //Bread of the Dead
		get_item(46403),    //Chuganpug's Delight
		get_item(46402),    //Promise of the Pandaren
		get_item(46401),    //Crimson Stripe
		get_item(46400),    //Barleybrew Gold
		get_item(46399),    //Thunder's Plunder
		get_item(46392),    //Venison Steak
		get_item(45279),    //Jillian's Gourmet Fish Feast
		get_item(44953),    //Worg Tartare
		get_item(44840),    //Cranberry Chutney
		get_item(44839),    //Candied Sweet Potato
		get_item(44838),    //Slow-Roasted Turkey
		get_item(44837),    //Spice Bread Stuffing
		get_item(44836),    //Pumpkin Pie
		get_item(44791),    //Noblegarden Chocolate
		get_item(43652),    //Slippery Eel
		get_item(43268),    //Dalaran Clam Chowder
		get_item(43015),    //Fish Feast
		get_item(43001),    //Tracker Snacks
		get_item(43000),    //Dragonfin Filet
		get_item(42999),    //Blackened Dragonfin
		get_item(42998),    //Cuttlesteak
		get_item(42997),    //Blackened Worg Steak
		get_item(42996),    //Snapper Extreme
		get_item(42995),    //Hearty Rhino
		get_item(42994),    //Rhinolicious Wormsteak
		get_item(42993),    //Spicy Fried Herring
		get_item(42942),    //Baked Manta Ray
		get_item(42779),    //Steaming Chicken Soup
		get_item(39691),    //Succulent Orca Stew
		get_item(35563),    //Charred Bear Kabobs
		get_item(34769),    //Imperial Manta Steak
		get_item(34768),    //Spicy Blue Nettlefish
		get_item(34767),    //Firecracker Salmon
		get_item(34766),    //Poached Northern Sculpin
		get_item(34765),    //Pickled Fangtooth
		get_item(34764),    //Poached Nettlefish
		get_item(34763),    //Smoked Salmon
		get_item(34762),    //Grilled Sculpin
		get_item(34758),    //Mighty Rhino Dogs
		get_item(34757),    //Very Burnt Worg
		get_item(34756),    //Spiced Worm Burger
		get_item(34755),    //Tender Shoveltusk Steak
		get_item(34754),    //Mega Mammoth Meal
		get_item(34753),    //Great Feast
		get_item(34752),    //Rhino Dogs
		get_item(34751),    //Roasted Worg
		get_item(34750),    //Worm Delight
		get_item(34749),    //Shoveltusk Steak
		get_item(34748),    //Mammoth Meal
		get_item(34412),    //Sparkling Apple Cider
		get_item(34411),    //Hot Apple Cider
		get_item(34410),    //Honeyed Holiday Ham
		get_item(34125),    //Shoveltusk Soup
		get_item(34065),    //Spiced Onion Cheese
		get_item(34064),    //Succulent Sausage
		get_item(34063),    //Dried Sausage
		get_item(34022),    //Stout Shrunken Head
		get_item(34021),    //Brewdoo Magic
		get_item(34020),    //Jungle River Water
		get_item(34019),    //Path of Brew
		get_item(34018),    //Long Stride Brew
		get_item(34017),    //Small Step Brew
		get_item(33872),    //Spicy Hot Talbuk
		get_item(33867),    //Broiled Bloodfin
		get_item(33052),    //Fisherman's Feast
		get_item(33043),    //The Essential Brewfest Pretzel
		get_item(33036),    //Mudder's Milk
		get_item(33035),    //Ogre Mead
		get_item(33034),    //Gordok Grog
		get_item(33033),    //Thunderbrew Stout
		get_item(33032),    //Thunderbrew Ale
		get_item(33031),    //Thunder 45
		get_item(33030),    //Barleybrew Clear
		get_item(33029),    //Barleybrew Dark
		get_item(33028),    //Barleybrew Light
		get_item(33026),    //The Golden Link
		get_item(33025),    //Spicy Smoked Sausage
		get_item(33024),    //Pickled Sausage
		get_item(33023),    //Savory Sausage
		get_item(33004),    //Clamlette Magnifique
		get_item(32721),    //Skyguard Rations
		get_item(31673),    //Crunchy Serpent
		get_item(31672),    //Mok'Nathal Shortribs
		get_item(30361),    //Oronok's Tuber of Spell Power
		get_item(30359),    //Oronok's Tuber of Strength
		get_item(30358),    //Oronok's Tuber of Agility
		get_item(30357),    //Oronok's Tuber of Healing
		get_item(30155),    //Clam Bar
		get_item(29292),    //Helboar Bacon
		get_item(27667),    //Spicy Crawdad
		get_item(27666),    //Golden Fish Sticks
		get_item(27665),    //Poached Bluefish
		get_item(27664),    //Grilled Mudfish
		get_item(27663),    //Blackened Sporefish
		get_item(27662),    //Feltail Delight
		get_item(27660),    //Talbuk Steak
		get_item(27659),    //Warp Burger
		get_item(27658),    //Roasted Clefthoof
		get_item(27657),    //Blackened Basilisk
		get_item(27655),    //Ravager Dog
		get_item(27651),    //Buzzard Bites
		get_item(27636),    //Bat Bites
		get_item(27635),    //Lynx Steak
		get_item(24540),    //Edible Fern
		get_item(24539),    //Marsh Lichen
		get_item(24105),    //Roasted Moongraze Tenderloin
		get_item(23756),    //Cookie's Jumbo Gumbo
		get_item(22645),    //Crunchy Spider Surprise
		get_item(22239),    //Sweet Surprise
		get_item(22238),    //Very Berry Cream
		get_item(22237),    //Dark Desire
		get_item(22236),    //Buttermilk Delight
		get_item(21254),    //Winter Veil Cookie
		get_item(21217),    //Sagefish Delight
		get_item(21072),    //Smoked Sagefish
		get_item(21023),    //Dirge's Kickin' Chimaerok Chops
		get_item(20516),    //Bobbing Apple
		get_item(20452),    //Smoked Desert Dumplings
		get_item(20074),    //Heavy Crocolisk Stew
		get_item(18045),    //Tender Wolf Steak
		get_item(17222),    //Spider Sausage
		get_item(17198),    //Egg Nog
		get_item(17197),    //Gingerbread Cookie
		get_item(16971),    //Clamlette Surprise
		get_item(13851),    //Hot Wolf Ribs
		get_item(12224),    //Crispy Bat Wing
		get_item(12218),    //Monster Omelet
		get_item(12216),    //Spiced Chili Crab
		get_item(12215),    //Heavy Kodo Stew
		get_item(12214),    //Mystery Stew
		get_item(12213),    //Carrion Surprise
		get_item(12212),    //Jungle Stew
		get_item(12210),    //Roast Raptor
		get_item(12209),    //Lean Wolf Steak
		get_item(11584),    //Cactus Apple Surprise
		get_item(7808),    //Chocolate Square
		get_item(7807),    //Candy Bar
		get_item(7806),    //Lollipop
		get_item(6888),    //Herb Baked Egg
		get_item(6038),    //Giant Clam Scorcho
		get_item(5527),    //Goblin Deviled Clams
		get_item(5525),    //Boiled Clams
		get_item(5480),    //Lean Venison
		get_item(5479),    //Crispy Lizard Tail
		get_item(5477),    //Strider Stew
		get_item(5476),    //Fillet of Frenzy
		get_item(5474),    //Roasted Kodo Meat
		get_item(5472),    //Kaldorei Spider Kabob
		get_item(4457),    //Barbecued Buzzard Wing
		get_item(3729),    //Soothing Turtle Bisque
		get_item(3728),    //Tasty Lion Steak
		get_item(3727),    //Hot Lion Chops
		get_item(3726),    //Big Bear Steak
		get_item(3666),    //Gooey Spider Cake
		get_item(3665),    //Curiously Tasty Omelet
		get_item(3664),    //Crocolisk Gumbo
		get_item(3663),    //Murloc Fin Soup
		get_item(3662),    //Crocolisk Steak
		get_item(3220),    //Blood Sausage
		get_item(2888),    //Beer Basted Boar Ribs
		get_item(2687),    //Dry Pork Ribs
		get_item(2684),    //Coyote Steak
		get_item(2683),    //Crab Cake
		get_item(2680),    //Spiced Wolf Meat
		get_item(1082),    //Redridge Goulash
		get_item(1017),    //Seasoned Wolf Kabob
		get_item(724)    //Goretusk Liver Pie
	);
	
	return $buffs;
}

function get_profession( $id ) {
	$noRequest = false;
	$q = "SELECT * FROM `skilllineability` WHERE `SkillLineID`='".(int)$id."' ";
	
	$skilline = mysql_fetch_assoc(mysql_db_query(
		$GLOBALS['g_game_db'],
		"SELECT * FROM `skillline` WHERE `ID` = '".(int)$id."'",
		$GLOBALS['g_db_con']
	));
	
	if( !$skilline ) {
		return null;
	}
	
	$p = array((int)$skilline['ID'],(string)$skilline['Name'],(string)$skilline['Description'],array());
	
	switch($id)
	{
		case 182:
			$q.= " AND spellid in (81708,55428,55480,55500,55501,55502,55503,74497)";
			break;
		case 186:
			$q.= " AND spellid in (53120,53121,53122,53123,53124,53040,74496)";
			break;
		case 393:
			$q.= " AND spellid in (53125,53662,53663,53664,53665,53666,74495)";
			break;
		default:
			$noRequest = true;
			break;
	}
	
	if( !$noRequest ) {
		$result = mysql_db_query(
			$GLOBALS['g_game_db'],
			$q,
			$GLOBALS['g_db_con']
		);
		
		while( $record = mysql_fetch_assoc($result) ) {
			$p[3][] = read_skill_line_ability( $record );
		}
		return $p;
	}
	return $p;
}

function get_professions () {
	$stmt = mysql_db_query(
		$GLOBALS['g_game_db'],
		"SELECT * FROM `skillline` where `Category` = '11'",
		$GLOBALS['g_db_con']
	);
	
	$arr = array();
	while( $record = mysql_fetch_assoc($stmt)) {
		$arr[(int)$record['ID']] = get_profession((int)$record['ID']); 
	}
	return $arr;
}

function get_skill_line ($id) {
	$record = mysql_fetch_assoc(mysql_db_query(
		$GLOBALS['g_game_db'],
		"SELECT * FROM `skillline` where `ID` = '".(int)$id."'",
		$GLOBALS['g_db_con']
	));

	return array($record['ID'],$record['Name'],$record['Category']);
}

function get_stat_weights( $arguments, $flags, $order, $page ) {
	$page = $page < 1 ? 1 : $page;
	$orderClause = "";
	$showDeleted = false;
	$profiles = array();
	$user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : 0;
	$where = " ( sw.`UserID`='".(int)$user_id."' OR sw.`Public` != 0 )";
	// arguments
	parse_arguments( $arguments, $matches );
	foreach($matches as $match) {
		$operator = constant($match[2]);
		switch( $match[1] ) {
			case "chrclass":
				parse_numeric_argument($where,$operator,$match[3],"`ChrClass`");
				break;
			default:
				echo "unknown argument: ".$match[1];
				break;
		}
	}
	// order
	parse_order( $order, array( "name" => "sw.`Name`" ));
	
	$query = "SELECT SQL_CALC_FOUND_ROWS sw.*, u.`Name` as UserName FROM `stat_weights` sw INNER JOIN ".$GLOBALS['g_user_db'].".`user` u ON u.`UserID` = sw.`UserID` WHERE " . $where . ( $orderClause ? " ORDER BY ".$orderClause : "" ) . " LIMIT ".MAX_RECORDS_STAT_WEIGHTS *($page-1).",".MAX_RECORDS_STAT_WEIGHTS;

	$stmt = mysql_db_query(
		$GLOBALS['g_profile_db'],
		$query,
		$GLOBALS['g_db_con']
	);
	
	$found = mysql_fetch_assoc(mysql_db_query(
		$GLOBALS['g_profile_db'],
		"SELECT FOUND_ROWS() AS rows",
		$GLOBALS['g_db_con']
	));
	
	$arr[0] = array($found['rows'], MAX_RECORDS_STAT_WEIGHTS);
	while( ($record = mysql_fetch_assoc($stmt)) ) {
		$arr[] = array(
			$record['UserID'],
			$record['Name'],
			$record['Description'],
			unserialize($record['Serialized']),
			(int)$record['Public'] != 0 ? true : false,
			$record['UserName']
		);
	}
	
	mysql_free_result($stmt);
	return $arr;
}

function get_storage_token() {
	$rand = rand(0, 1000);
	
	if( $rand == 0 ) {
		mysql_db_query(
			$GLOBALS['g_profile_db'],
			"DELETE FROM `wowreforge_storage` WHERE ABS(TIME_TO_SEC(TIMEDIFF(NOW(),`Time`))) > ".WOWREFORGE_STORAGE_TIMEOUT,
			$GLOBALS['g_db_con']
		);
		
	}
	
	$hash = 0;
	
	do {
		$hash = md5(time());
		$record = mysql_fetch_assoc(mysql_db_query(
			$GLOBALS['g_profile_db'],
			"SELECT * FROM `wowreforge_storage` where `ID` = '".mysql_real_escape_string($hash)."'",
			$GLOBALS['g_db_con']
		));
	}
	while( $record );
	
	mysql_db_query(
		$GLOBALS['g_profile_db'],
		"INSERT INTO `wowreforge_storage` VALUES ('".mysql_real_escape_string($hash)."', '', NOW())",
		$GLOBALS['g_db_con']
	);
	return $hash;
}

function get_storage_record($id) {
	return mysql_fetch_assoc(mysql_db_query(
		$GLOBALS['g_profile_db'],
		"SELECT * FROM `wowreforge_storage` where `ID` = '".mysql_real_escape_string($id)."'",
		$GLOBALS['g_db_con']
	));
}

function ajax_die( $error_msg, $description = null ) {
	header("error: yes");
	if( $description ) {
		header("error_description: ".urlencode($description));
	}
	die($error_msg);
}

function ajax_die_on_exception( Exception $e ) {
	header("error: yes");
	$str = "<div>".$e->__toString()."</div>";
	
	$cause_str = "";
	while( $cause = $e->getPrevious() ) {
		$cause_str .= "<div>".$cause->__toString()."</div>";
		$e = $cause;
	}
	if( $cause_str ) {
		$str .= "<div>".$cause_str."</div>";
	}
	
	if( $description ) {
		header("error_description: ".urlencode($description));
	}
	die($str);
}

?>