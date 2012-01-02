<?php
	include('../db.php');
	include('../common.php');
	include('../locale/en.php');
	
	mysql_query("truncate table chardev_cataclysm_static.chardev_random_suffix");
	$result = mysql_query("
		select * from chardev_cataclysm.item_sparse i 
			inner join chardev_cataclysm_static.chardev_item_stats cis on i.id = cis.itemid
		where donotshow = 0 and RandomSuffixID
		order by id desc
	");
	
	while( $record = mysql_fetch_assoc($result) ) { 
		//$bnet_item = mysql_fetch_assoc(mysql_query("SELECT * FROM chardev_cataclysm_static.chardev_data_bnet_item WHERE ItemID=".$record['ID']));
		//if( !$bnet_item ) {
		//	steal_item($record['ID']);
		//}
		//$bnet_item = mysql_fetch_assoc(mysql_query("SELECT * FROM chardev_cataclysm_static.chardev_data_bnet_item WHERE ItemID=".$record['ID']));
		//if( !$bnet_item ) {
		//	echo "Item not found: ".$record['ID']."!\n";
		//}
		
		$xml_plain = get_random_property_xml($record['ID']);
		
		
		try {
			$old = error_reporting(1); 
			$xml = simplexml_load_string($xml_plain);
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
			//print_r($xml);
			$property_parent = $xml->xpath('//*[@id="related-randomProperties"]');
			$property_parent = $property_parent[0];
			//print_r($property_parent); die;
			$trs = $property_parent->div[2]->table->tbody->tr;
			echo "Item: ".$record['Name']."\n";
			for( $h=0;$h<count($trs);$h++) {
			
				if( $trs[$h]["class"] == "no-results" ) {
					continue;
				}
			
				mb_regex_encoding('UTF-8');
				$name = mb_ereg_replace ('…','',preg_replace('/\.\.\./','',$trs[$h]->td[0]->strong[0]));
				$desc = preg_replace('/\n|\t/','',$trs[$h]->td[1]);
				
				//echo $h.":\n";
				//echo "Name: ".$name."(".$trs[$h]->td[0].")\n";
				//echo "Description: ".$desc."\n";
				
				
				$points = mysql_fetch_assoc(mysql_db_query(
					$GLOBALS['g_game_db'],
					"SELECT PointsQuality".$record['Quality']."Group".$GLOBALS['g_slot_to_rnd_pts_grp'][(int)$record['InventorySlot']]." as Points FROM randproppoints WHERE ID = ".(int)$record['Level'],
					$GLOBALS['g_db_con']
				));
				echo mysql_error();
				
				preg_match_all("/\D(\d+)\D/",$desc,$matches);
				
				if( 0 == count($matches[1])) {
					echo "Found no vals for ".$name." on ".$record['Name']."(".$record['ID'].")\n";
					continue;
				}
				
				$suffix_result = mysql_db_query(
					$GLOBALS['g_game_db'],
					"select * from itemrandomsuffix where Name like '".$name."'",
					$GLOBALS['g_db_con']
				);
				echo mysql_error();
				
				$av_suffixes = array();
				
				//echo $name."\n";
				
				while($random_suffix = mysql_fetch_assoc($suffix_result)) {
					$av_suffixes[] = $random_suffix;
				}
				
				if( count($av_suffixes) == 0 ) {
					echo "Unable to match random suffix ".$name." with ".$desc."\n";
					continue;
				}
				else if( count($av_suffixes) == 1 ) { 
				
					//echo $random_suffix['ID']."\n";
					
					mysql_db_query(
						$GLOBALS['g_static_db'],
						"REPLACE INTO chardev_random_suffix VALUES (".$record['RandomSuffixID'].",".$av_suffixes[0]['ID'].")",
						$GLOBALS['g_db_con']
					);
					echo mysql_error();
				}
				else {
					$perfect_match = 0;
					$best_match = 0;
					$best_matches = 0;
					
					for($i=0;$i<count($av_suffixes);$i++) {
						$vals = array();
						for($j=0;$j<5;$j++) {
							if($av_suffixes[$i]['Coefficient'.($j+1)] && $av_suffixes[$i]['SpellItemEnchantmentID'.($j+1)]) {
								$vals[] = floor((int)$points['Points'] * (int)$av_suffixes[$i]['Coefficient'.($j+1)] / 10000);
							}
						}
						
						if(count($vals) < count($matches[1])) {
							echo "Found more vals than in db\n";
							continue;
						}
						
						//echo $av_suffixes[$i]['ID']."\n";
						
						$used_val = array();
						$matched_val = array();
						$val_matches = 0;
						for($j=0;$j<count($vals);$j++) {
							if( isset($used_val[$j]) ) {
								continue;
							}
							for($k=0;$k<count($vals);$k++) {
								if( $k >= count($matches[1]) || isset($matched_val[$k]) ) {
									continue;
								}
								if( $vals[$j] == (int)$matches[1][$k] ) {
									//echo "$j $k : ".$vals[$j]." == ".(int)$matches[1][$k]."\n";
									$val_matches ++;
									$used_val[$j] = true;
									$matched_val[$k] = true;
									break;
								}
							}
						}
						//echo "matches: $val_matches/".count($vals)."\n";
						
						if( count($vals) > count($matches[1]) ) {
							if( $val_matches == count($matches[1]) ) {
								$best_match = (int)$av_suffixes[$i]['ID'];
							}
						}
						else if( count($vals) == count($matches[1]) && $val_matches == count($vals) ) {
							$perfect_match = (int)$av_suffixes[$i]['ID'];
						}
					}
					
					if( !$perfect_match && !$best_match ) {
						echo "Unable to match random suffix ".$name." with ".$desc." ".$record['ID']."\n";
					}
					else {
						if( !$perfect_match ) {
							$perfect_match = $best_match;
						}
						//echo $perfect_match."\n";
						mysql_db_query(
							$GLOBALS['g_static_db'],
							"REPLACE INTO chardev_random_suffix VALUES (".$record['RandomSuffixID'].",".$perfect_match.")",
							$GLOBALS['g_db_con']
						);
						echo mysql_error();
					}
					
					
				}
			}
		}
		catch( Exception $e ) {
			continue;
		}
	}
	
	function get_random_property_xml($id) {
		$contents = file_get_contents("http://eu.battle.net/wow/en/item/".$id."/randomProperties");
		
		if( !$contents ) {
			echo "no content\n";
			return;
		}
		
		$xml = simplexml_load_string($contents);
		if( !$xml ) {
			echo "invalid xml\n";
			return;
		}
		
		return $contents;
	}
	
	function steal_item($id) {
		$contents = file_get_contents("http://eu.battle.net/wow/en/item/".$id);
		
		if( !$contents ) {
			echo "no content\n";
			return;
		}
		
		$xml = simplexml_load_string($contents);
		if( !$xml ) {
			echo "invalid xml\n";
			return;
		}
		
		//echo $id."\n";
		
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