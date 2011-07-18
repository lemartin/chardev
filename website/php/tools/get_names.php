<?php
	include '../db.php';
	include '../common.php';

	$stmt = mysql_db_query(
		$GLOBALS['g_game_db'],
		"SELECT * FROM `chardev_data_character_names`",
		$GLOBALS['g_db_con']
	);
	
	$region = "eu";
	
	while($result =mysql_fetch_assoc($stmt)){
		try{
			$sz_xml = getXML("http://".$region.".wowarmory.com/search.xml?searchQuery=".$result['name']."&searchType=characters");
			if(!$sz_xml) continue;
			$xml = simplexml_load_string($sz_xml);
			
			$node  = $xml->armorySearch[0]->searchResults[0]->characters->character;
			$n = 0;
			foreach( $node as $char){
				try{

					sleep(1);
					$realm = $char['realm'];
					$race = $char['raceId'];
					$class = $char['classId'];
					$level = $char['level'];
					$name = $char['name'];
					$xml = steel_charsheet($region,$char['url']);
					$q = "replace into chardev_data_armory_profiles values ('".
						mysql_real_escape_string($name)."','".
						mysql_real_escape_string($realm)."',".
						$class.",".
						$race.",".
						$level.",'".
						mysql_real_escape_string($xml)."')"
					;
					mysql_db_query(
						$GLOBALS['g_game_db'],
						$q,
						$GLOBALS['g_db_con']
					);
					echo $n++." $realm $name $level $race $class\n";
				}
				catch(Exception $e){}
			}
		}
		catch(Exception $e){ echo $e; }
		//sleep(10);
	}
	
	function steel_charsheet($region,$url){
		if(!$url) return;

		$sz_xml = getXML("http://".$region.".wowarmory.com/character-sheet.xml?".htmlspecialchars_decode($url));
		return $sz_xml;
	}
?>