<?php

	include('../datacon/db.php');
	include('../datacon/functions.php');
	include('functions.php');
	
	set_time_limit(0);
	$stmt = mysql_query("select * from items where outdated=0");
	$n = 0;
	while($result = mysql_fetch_assoc($stmt)){
		try{
			$src = "";
			$questStmt = mysql_query("Select * from quests where givenitemid = ".$result['itemId']." OR givenitemid1 = ".$result['itemId']."  OR givenitemid2 = ".$result['itemId']."  OR givenitemid3 = ".$result['itemId']."  OR choiceitemid = ".$result['itemId']." OR choiceitemid1 = ".$result['itemId']." OR choiceitemid2 = ".$result['itemId']." OR choiceitemid3 = ".$result['itemId']." OR choiceitemid4 = ".$result['itemId']." OR choiceitemid5 = ".$result['itemId']." ");
			if(($resultQuest = mysql_fetch_assoc($questStmt)) && $resultQuest['name']){
				$src.= "<quest><url>?quest=".$resultQuest['questId']."</url>";
				$src.= "<en>".$resultQuest['name']."</en>";
				$src.= "<fr>".$resultQuest['namefr']."</fr>";
				$src.= "<de>".$resultQuest['namede']."</de>";
				$src.= "<es>".$resultQuest['namees']."</es>";
				$src.= "<ru>".$resultQuest['nameru']."</ru>";
				$src.= "</quest>";
			}
			if($resultSpell = mysql_fetch_assoc(mysql_query("SELECT * FROM spell WHERE itemId=".$result['itemId']))){
				if($resultSkill = mysql_fetch_assoc(mysql_query("SELECT * FROM skilllineability WHERE spellId=".$resultSpell['spellId']))){
					if($resultSkillName = mysql_fetch_assoc(mysql_query("SELECT * FROM skillline WHERE id=".$resultSkill['skillLineId']))){
						$src.= "<spell><url>?spell=".$resultSpell['spellId']."</url>";
						$src.= "<en>".$resultSkillName['name']."</en>";
						$src.= "<fr>".$resultSkillName['namefr']."</fr>";
						$src.= "<de>".$resultSkillName['namede']."</de>";
						$src.= "<es>".$resultSkillName['namees']."</es>";
						$src.= "<ru>".$resultSkillName['nameru']."</ru></spell>";
					}
				}
				$n++;
			}
			if($resultDrop = mysql_fetch_assoc(mysql_query("SELECT * FROM data_items WHERE itemId=".$result['itemId']))){
				$root = NULL;
				$str = str_replace("\'","'",$resultDrop['xml']);
				if( ! ($xml = simplexml_load_string($str)) )
				{
					echo "Unable to load XML from database, deleting!\n";
					mysql_query("delete from data_items where itemId = ".$result['itemId']);
				}
				else
				{
					RecurseXML($xml,$root);
					$node = $root['childs']['itemInfo'][0]['childs']['item'][0]['childs'];
					if(isset($node['dropCreatures'])){
						$src.= "<drop>";
						$creatures = $node['dropCreatures'][0]['childs']['creature'];
						for($i=0;$i<count($creatures);$i++){
							$src.= "<creature heroic=".(isset($attributes['heroic'])&&$attributes['heroic']=="1"?"1":"0").">";
							$attributes = $creatures[$i]['attributes'];
							if($attributes['name'])
								$src.= "<name>".$attributes['name']."</name>";
							else if($attributes['area'])
								$src.= "<area>".$attributes['area']."</area>";
							$src.= "</creature>";
						}
						$src.= "</drop>";
					}
					if(isset($node['cost']) && isset($node['cost'][0]['childs']['token']))
					{
						$src .= "<cost>";
						$token = $node['cost'][0]['childs']['token'];
						for( $i = 0 ; $i < count($token) ; $i++ )
						{
							$attributes = $token[$i]['attributes'];
							//$item = mysql_query("select * from items where itemid = '".((int)$attributes['id'])."'");
							$src .= "<token id=\"".(int)$attributes['id']."\" count=\"".(int)$attributes['count']."\" icon=\"".$attributes['icon']."\" />";
						}
						$src .= "</cost>";
					}
				}
			}
			$q = "update items set itemSource = '".str_replace("'","\'",$src)."' where itemId =".$result['itemId'];
			mysql_query($q);
			//echo "source of item ".$result['itemId']." set!\n";
		}
		catch(Exception $e){ echo $e;}
	}
?>