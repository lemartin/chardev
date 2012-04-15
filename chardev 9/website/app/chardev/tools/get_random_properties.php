
<?php

	include('../db.php');
	include('../common.php');
	include('../locale/en.php');
	
	switch_game_data_base(0);
	
	mysql_query("truncate table chardev_cataclysm_static.chardev_random_properties",$GLOBALS['g_db_con']);
	$result = mysql_query(
		"select * ".
		" from chardev_cataclysm.item_sparse i ".
		" inner join chardev_cataclysm_static.chardev_item_stats cis on i.id = cis.itemid ".
		" where donotshow = 0 and RandomPropertiesID order by id desc",
		$GLOBALS['g_db_con']
	);
	
	while( $record = mysql_fetch_assoc($result) ) { 
		$bnet_item = mysql_fetch_assoc(mysql_query("SELECT * FROM chardev_cataclysm_static.chardev_data_bnet_item WHERE ItemID=".$record['ID']));
		if( !$bnet_item ) {
			steal_item($record['ID']);
		}
		$bnet_item = mysql_fetch_assoc(mysql_query("SELECT * FROM chardev_cataclysm_static.chardev_data_bnet_item WHERE ItemID=".$record['ID']));
		if( !$bnet_item ) {
			"Item not found: ".$record['ID']."!\n";
		}
		
		
		try {
			$old = error_reporting(1); 
			$xml = simplexml_load_string($bnet_item["XML"]);
			error_reporting($old);
			if( !$xml ) {
				echo "invalid xml\n";
				mysql_db_query(
					$GLOBALS['g_static_db'],
					"delete from chardev_cataclysm_static.chardev_data_bnet_item where ItemID =".$record['ID'],
					$GLOBALS['g_db_con']
				);
				echo mysql_error();
				continue;
			}
			
			$property_parent = $xml->xpath('//*[@id="location-randomProperties"]');
			$property_parent = $property_parent[0];
			$trs = $property_parent->div->table->tbody->tr;
			echo "Item: ".$record['Name']."\n";
			for( $h=0;$h<count($trs);$h++) {
				$name = preg_replace('/\.\.\./','',$trs[$h]->td[0]);
				$desc = preg_replace('/\n|\t/','',$trs[$h]->td[1]);
				
				//echo $name."\n";
				//echo $desc."\n";
				
				$pos_props_result = mysql_query(
					"SELECT * FROM chardev_cataclysm.ItemRandomProperties WHERE `Name` like '".
					mysql_real_escape_string($name)."'",
					$GLOBALS['g_db_con']
				);
				
				$m = 0;
				while( $pos_props_record = mysql_fetch_assoc($pos_props_result)) {
					//echo $pos_props_record['ID']."\n";
					
					$n = 0;
					$es = array();
					
					for( ; $n < 5 ; $n++ ) {
						if( $pos_props_record['SpellItemEnchantmentID'.($n+1)] ) {
							$enchant_result = mysql_query(
								"SELECT * FROM chardev_cataclysm.SpellItemEnchantment WHERE ID=".
								$pos_props_record['SpellItemEnchantmentID'.($n+1)]." ORDER BY `ID` DESC"
							);
							if( $enchant_record = mysql_fetch_assoc($enchant_result)) {
								$es[] = $enchant_record['Description'];
							}
							mysql_free_result($enchant_result);
						}
					}
					
					$exp_desc = explode( ', ', $desc);
					$imp_desc = implode( ', ', $es);
					
					//echo $desc."\n";
					//echo "->".$imp_desc."\n";
					
					if( count($exp_desc) != count($es) ) {
						continue;
					}
					
					$matches = 0;
					
					for( $i=0; $i<count($exp_desc); $i++ ) {
						for( $j=0; $j<count($exp_desc); $j++ ) {
							//echo $exp_desc[$i].",".$es[$j]."=".( strcmp($exp_desc[$i],$es[$j]) === 0 )."\n";
							if( strcmp($exp_desc[$i],$es[$j]) === 0 ) {
								$matches ++;
							}
							else{
								$t = preg_replace( '/Power/i', 'Damage', $exp_desc[$i] );
								//echo $t."\n";
								if( strcmp($t,$es[$j]) === 0 ) {
									$matches ++;
									continue;
								}
								$t = preg_replace('/Mana Regeneration/','mana every 5 sec.',$exp_desc[$i]);
								//echo $t."\n";
								if( strcmp($t,$es[$j]) === 0 ) {
									$matches ++;
									continue;
								}
								$t = preg_replace('/Health Regen/','health every 5 sec.',$exp_desc[$i]);
								//echo $t."\n";
								if( strcmp($t,$es[$j]) === 0 ) {
									$matches ++;
									continue;
								}
							}
						}
					}
					
					if( $matches == count($exp_desc) ) {
						
						echo "Found match for ".$desc." -> ".$imp_desc."\n";
						mysql_query( 
							"INSERT INTO chardev_cataclysm_static.chardev_random_properties ".
							" VALUES (".$record['RandomPropertiesID'].",".$pos_props_record['ID'].")"
						);
						$m = 1;
						break;
					}
				}
				if( !$m ) {
					echo "###no match for ".$name." ".$desc."\n";
					if( preg_match('/Restoration/',$name)) die;
				}
				mysql_free_result($pos_props_result);
			}
		}
		catch( Exception $e ) {
			continue;
		}
	}
	
	function steal_item($id) {
		$contents = file_get_contents("http://eu.battle.net/wow/en/item/".$id);
		
		if( !$contents ) {
			echo "no conent\n";
			return;
		}
		
		$xml = simplexml_load_string($contents);
		if( !$xml ) {
			echo "invalid xml\n";
			return;
		}
		
		echo $id."\n";
		
		mysql_db_query(
			$GLOBALS['g_static_db'],
			"REPLACE INTO `chardev_data_bnet_item` VALUES ("
				."'".$id."',"
				."'".mysql_real_escape_string($contents)."')"
			,
			$GLOBALS['g_db_con']
		);
	}
?>