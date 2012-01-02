<?php

	include('../datacon/db.php');
	include('../datacon/functions.php');
	include('functions.php');
	
	$stmt = mysql_query("select * from data_guilds where guild not like '' order by guild desc");
	set_time_limit(0);
	
	$region = "eu";
	while($result =mysql_fetch_assoc($stmt)){
		try{
			$url = "http://".$region.".wowarmory.com/guild-info.xml?".htmlspecialchars_decode(str_replace("\'","'",$result['guild'])); echo $url;
			$sz_xml = getXML($url);
			if(!$sz_xml) continue;
			$xml = simplexml_load_string($sz_xml);
			RecurseXML($xml,$root);
			//print_r($root);
			$node = $root['childs']['guildInfo'][0]['childs']['guild'][0]['childs']['members'][0]['childs']['character'];
			
			$n = 0;
			for($i=0;$i<sizeof($node);$i++){
				try{
					sleep(2);
					$realm = $node[$i]['attributes']['realm'];
					$race = $node[$i]['attributes']['raceId'];
					$class = $node[$i]['attributes']['classId'];
					$level = $node[$i]['attributes']['level'];
					$name = $node[$i]['attributes']['name'];
					$xml = steel_charsheet($region,$node[$i]['attributes']['url']);
					$q = "replace into data_xml values (null,'".str_replace("'","\'",$name)."','".str_replace("'","\'",$realm)."',".$class.",".$race.",".$level.",'".$xml."')";
					mysql_query($q);
				}
				catch(Exception $e){}
			}
		}
		catch(Exception $e){ echo $e; }
	}
?>