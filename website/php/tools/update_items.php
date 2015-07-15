<?php
	ini_set('memory_limit', '512M');

	include '../db.php';
	include '../filter.php';
	include '../common.php';

	echo "Setting item_current...\n";
	
	mysql_db_query(
		$GLOBALS['g_static_db'],
		"REPLACE INTO item_current SELECT `ID`, MAX(`Version`) FROM chardev_cataclysm_static.item_working GROUP BY `ID`",
		$GLOBALS['g_db_con']
	);
	echo mysql_error();
	
	$l_to_lang = array(0,2,3,6,8);
	$l_to_suff = array("EN","FR","DE","ES","RU");
	
	
	
	switch_game_data_base(0);
	$stmt = mysql_query(
		"SELECT * 
		 FROM chardev_cataclysm_static.`item_working` s 
		 	INNER JOIN chardev_cataclysm.`item` i ON i.`ID` = s.`ID` 
		 	INNER JOIN chardev_cataclysm_static.`item_current` c ON c.`ID`=s.`ID` AND c.`Version` = s.`Version` 
		 WHERE `Locale`='EN' ORDER BY i.`ID` ASC",
		$GLOBALS['g_db_con']
	);
	
	$record = null;
	while( $record = mysql_fetch_assoc($stmt)) {
		process( $record );
	}
	
	mysql_db_query(
		$GLOBALS['g_static_db'],
		"
		UPDATE chardev_cataclysm_static.chardev_item_stats 
		SET DoNotShow=1
		WHERE ItemID IN  (
		SELECT ID FROM chardev_cataclysm.item_sparse s 
		WHERE 
		Name like 'QA %' 
		OR Name like 'Obsolete%' 
		OR Name like 'Deprecated %' 
		OR Name like '%(test)' 
		OR Name like '[PH]%' 
		OR Name like 'Fast Test %'
		OR Name like 'Art Template%'
		OR Name like '%_PVP%'
		OR Name like '%_PVE%' 
		OR Name like '%Cataclysm C01%'
		OR TypeMask & 16
		OR Level >= 400
		)
		",
		$GLOBALS['g_db_con']
	);
	echo mysql_error();

function process( $record ) {
	$name = array();
	$desc = array();
	
	echo $record['ID']."\n";
		
	mysql_query("REPLACE INTO chardev_cataclysm.`item_sparse` SELECT * FROM chardev_cataclysm_static.`item_working` WHERE `Locale`='".$record['Locale']."' AND `Version`=".$record['Version']." AND `ID`=".$record['ID']);
	echo mysql_error();		
	//
	//	init array
	//
	$item_stats = array();	
	for( $i=0; $i<57; $i++ ) {
		$item_stats[$i] = 0;
	}
	//
	//	process item stats
	//
	for( $i=1;$i<=10;$i++ ) {
		if( (int)$record['Stat'.$i] > 0 ) {
			$item_stats[ (int)$record['Stat'.$i] ] += (int)$record['StatValue'.$i];
		}
	}
	//
	//	is gem ?
	//
	if( $record['GemPropertiesID']) {
		$gem_result = mysql_db_query(
			$GLOBALS['g_game_db'],
			"SELECT * FROM `gemproperties` WHERE `ID`=".(int)$record['GemPropertiesID'],
			$GLOBALS['g_db_con']
		);
		
		if( $gem_record = mysql_fetch_assoc( $gem_result ) ) {
			//get_spellitemenchantment_stats( $item_stats, $gem_record['SpellItemEnchantmentID'] );
		}
		
		mysql_free_result($gem_result);
	}		
	
	$dps = 0;
	$minDmg = 0;
	$maxDmg = 0;
	$armor = 0;
	
	if( (int)$record['Quality'] <= 6 ) {
		
		$armor = get_armor(
			(int)$record['ItemClass'],
			(int)$record['ItemSubClass'],
			(int)$record['InventorySlot'],
			(int)$record['Level'],
			(int)$record['Quality']
		);
		
		if( (int)$record['ItemClass'] == 2  ) {
			$iscMask = 1<<(int)$record['ItemSubClass'];
			// thrown 16
			if( $iscMask&1<<16 ) {
				$targetTable = 'itemdamagethrown';
			}
			// wand 19
			else if( $iscMask&1<<19 ) {
				$targetTable = 'itemdamagewand';
			}
			// ranged 2 3 18
			else if( $iscMask&(1<<2|1<<3|1<<18) ) {
				$targetTable = 'itemdamageranged';
			}
			// one-hand / caster 0 4 7 11 13 15 and Miscellenous
			else if( $iscMask&(1<<0|1<<4|1<<7|1<<11|1<<13|1<<14|1<<15) ) {
				$targetTable = 'itemdamageonehand';
				if( (int)$record['TypeMask2']&512 ) {
					$targetTable .= 'caster';
				}
			}
			// two-hand / caster 1 5 6 8 10 12 17 20
			else if( $iscMask&(1<<1|1<<5|1<<6|1<<8|1<<10|1<<12|1<<17|1<<20) ) {
				$targetTable = 'itemdamagetwohand';
				if( (int)$record['TypeMask2']&512 ) {
					$targetTable .= 'caster';
				}
			}
			else {
				echo $record['ItemSubClass'];
				die;
			}
			
			$stmt3 = mysql_db_query(
				$GLOBALS['g_game_db'],
				"SELECT * FROM `".$targetTable."` WHERE `ItemLevel`=".(int)$record['Level'],
				$GLOBALS['g_db_con']
			);
			echo mysql_error();
			if( $record3 = mysql_fetch_assoc($stmt3) ) {
				$dps = 	$record3[ $record['Quality'] ];
				$minDmg = $dps * (int)$record['Delay']/1000 * ( 1 - (float)$record['DamageRange']/2 );
				$maxDmg = $dps * (int)$record['Delay']/1000 * ( 1 + (float)$record['DamageRange']/2 );
			}
			mysql_free_result($stmt3);
		} 
	}
	
	for($i=0;$i<5;$i++) {
		$name[$i] = "";
		$desc[$i] = "";
		$locale_result = mysql_db_query(
			$GLOBALS['g_static_db'],
			"SELECT Name,Description FROM item_working 
			 WHERE `Locale`='".$GLOBALS['l_to_suff'][$i]."' AND `ID`=".$record['ID']." ORDER BY `Version` DESC",
			$GLOBALS['g_db_con']
		);
		$locale = mysql_fetch_assoc($locale_result);
		if( $locale ) {
			$name[$i] = $locale['Name'];
			$desc[$i] = $locale['Description'];
		}
		mysql_free_result( $locale_result );
	}
	
	//
	//	min item version
	//
	$min_item_version = 0;
	$max_item_version = 0;
	/*
	$item_version_record = mysql_fetch_assoc(mysql_db_query(
		$GLOBALS['g_static_db'],
		"SELECT min(`Version`) as MinItemVersion, max(`Version`) as MaxItemVersion FROM `item_working` group by `Id`",
		$GLOBALS['g_db_con']
	));
	*/
	//$min_item_version = $record["MinItemVersion"];
	//$max_item_version = $record["MaxItemVersion"];
	
	mysql_db_query(
		$GLOBALS['g_static_db'],
		"REPLACE INTO `chardev_item_stats` values (".
			(int)$record['ID'].",".
			"0,".
			(int)$item_stats[4].",".
			(int)$item_stats[3].",".
			(int)$item_stats[7].",".
			(int)$item_stats[5].",".
			(int)$item_stats[6].",".
			(float)$dps.",".
			(float)$minDmg.",".
			(float)$maxDmg.",".
			(int)$armor.",".
			(int)$item_stats[13].",".
			(int)$item_stats[14].",".
			(int)$item_stats[15].",".
			(int)$item_stats[32].",".
			(int)$item_stats[31].",".
			(int)$item_stats[35].",".
			(int)$item_stats[36].",".
			(int)$item_stats[37].",".
			(int)$item_stats[38].",".
			(int)$item_stats[43].",".
			(int)$item_stats[45].",".
			(int)$item_stats[47].",".
			(int)$item_stats[49].",".
			(int)$item_stats[50].",".
			(int)$item_stats[51].",".
			(int)$item_stats[55].",".
			(int)$item_stats[52].",".
			(int)$item_stats[54].",".
			(int)$item_stats[56].",".
			"'".mysql_real_escape_string($name[0])."',".
			"'".mysql_real_escape_string($name[1])."',".
			"'".mysql_real_escape_string($name[2])."',".
			"'".mysql_real_escape_string($name[3])."',".
			"'".mysql_real_escape_string($name[4])."',".
			"'".mysql_real_escape_string($desc[0])."',".
			"'".mysql_real_escape_string($desc[1])."',".
			"'".mysql_real_escape_string($desc[2])."',".
			"'".mysql_real_escape_string($desc[3])."',".
			"'".mysql_real_escape_string($desc[4])."',".
			(int)$min_item_version.",".
			(int)$max_item_version."".
		")",
		$GLOBALS['g_db_con']
	);
	
	echo mysql_error();
}
	
function get_spellitemenchantment_stats ( &$item_stats, $id ) {

	$result = mysql_db_query(
		$GLOBALS['g_game_db'],
		"SELECT * FROM `spellitemenchantment` WHERE `ID`=".(int)$id,
		$GLOBALS['g_db_con']
	);

	if( $record = mysql_fetch_assoc( $result )) {
		for( $j = 1; $j <= 3; $j++ ) {
			
			switch( $record['Type'.$j] ) {
				//
				//	plain stat
				//
				case 5:
					switch( $record['SpellID'.$j] ) {
						// Mana
						case 0: 
							$item_stats[2] += (int)$record['Value'.$j];
							break;
						default:
							$item_stats[ (int)$record['SpellID'.$j] ] += (int)$record['Value'.$j];
							break;
					}
					break;
				case 4:
					switch( $record['SpellID'.$j] ) {
						case 0: $item_stats[50] += (int)$record['Value'.$j]; break;
						case 1: $item_stats[53] += (int)$record['Value'.$j]; break;
						case 2: $item_stats[51] += (int)$record['Value'.$j]; break;
						case 3: $item_stats[55] += (int)$record['Value'.$j]; break;
						case 4: $item_stats[52] += (int)$record['Value'.$j]; break;
						case 5: $item_stats[54] += (int)$record['Value'.$j]; break;
						case 6: $item_stats[56] += (int)$record['Value'.$j]; break;
					}
					break;
				case 3:
					get_spell_stats( $item_stats, (int)$record['SpellID'.$j] );
					break;
			}		
		}
	}
	mysql_free_result( $result );
}

function get_spell_stats( &$item_stats, $id ) {

	$result = mysql_db_query(
		$GLOBALS['g_game_db'],
		"SELECT * FROM `Spell` s ".
			" INNER JOIN `SpellDuration` sd ON s.`SpellDurationID` = sd.`ID`".
			" WHERE s.`ID`=".$id,
		$GLOBALS['g_db_con']
	);
	//
	if( $record = mysql_fetch_assoc( $result ) ) {
		//
		//	is aura ?						
		//	
		if( (int)$record['Duration'] <= 0 &&
			( (int)$record['Type0'] & 64 ) != 0 
		) {
			//
			//	get spell effects
			//
			$se_result = mysql_db_query(
				$GLOBALS['g_game_db'],
				"SELECT * FROM `SpellEffect` WHERE `SpellID`=".$id,
				$GLOBALS['g_db_con']
			);
			while( $se_record = mysql_fetch_assoc($se_result) ) {
				switch( (int)$se_record['Effect'] ) {
				case 22:
					for( $i=0; $i<7; $i++ ) {
						if( ((int)$se_record['SecondaryEffect'] & (1<<$i)) != 0 ) {
							switch( $i ) {
								case 0: $item_stats[50] += (int)$se_record['Value']; break;
								case 1: $item_stats[53] += (int)$se_record['Value']; break;
								case 2: $item_stats[51] += (int)$se_record['Value']; break;
								case 3: $item_stats[55] += (int)$se_record['Value']; break;
								case 4: $item_stats[52] += (int)$se_record['Value']; break;
								case 5: $item_stats[54] += (int)$se_record['Value']; break;
								case 6: $item_stats[56] += (int)$se_record['Value']; break;
							}
						}
					}
					break;
				//
				// Stats
				//
				case 29:
					switch( (int)$se_record['SecondaryEffect'] ) {
						case 0: $item_stats[4] += (int)$se_record['Value']; break;
						case 1: $item_stats[3] += (int)$se_record['Value']; break;
						case 2: $item_stats[7] += (int)$se_record['Value']; break;
						case 3: $item_stats[5] += (int)$se_record['Value']; break;
						case 4: $item_stats[6] += (int)$se_record['Value']; break;
						case -1: 
							for( $i=3; $i <= 7; $i ++ ) {
								$item_stats[$i] += (int)$se_record['Value'];
							}
						break;
					}
				break;
				// Health
				case 34:
					$item_stats[1] += (int)$se_record['Value'];
					break;
				// Energy - Mana
				case 35:
					if( (int)$se_record['SecondaryEffect'] == 0 ) {
						$item_stats[2] += (int)$se_record['Value'];
					}
					break;
				// Mana per 5 seconds
				case 85:
					$item_stats[43] += (int)$se_record['Value'];
					break;
				// Attack Power
				case 99:
					$item_stats[38] += (int)$se_record['Value'];
					break;
				// Ranged Attack Power
				case 124:
					$item_stats[39] += (int)$se_record['Value'];
					break;
				//
				// Ratings
				//
				case 189:
					for( $i=0; $i<32; $i++ ) {
						if( ((int)$se_record['SecondaryEffect'] & (1<<$i)) != 0 ) {
							if( $i <= 19 ) {
								$item_stats[ $i + 11 ] += (int)$se_record['Value'];
							}
							// expertise rating
							else if( $i == 23 ) {
								$item_stats[ 37 ] += (int)$se_record['Value'];
							}
							// mastery rating
							else if( $i == 25 ) {
								$item_stats[ 49 ] += (int)$se_record['Value'];
							}
						}
					}
				
				default:
				break;
				}
			}
			mysql_free_result($se_result);
		}
	}
	
	mysql_free_result($result);
}
?>