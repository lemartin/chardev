<?php
	include '../db.php';
	include '../common.php';
	include '../locale/en.php';
	
	$stmt = mysql_db_query(
		$GLOBALS['g_game_db'],
		"TRUNCATE TABLE `chardev_data_stats`",
		$GLOBALS['g_db_con']
	);
	
	$stmt = mysql_db_query(
		$GLOBALS['g_game_db'],
		"SELECT * FROM `chardev_data_armory_profiles`",
		$GLOBALS['g_db_con']
	);
	
	$a_rS=array(
		 1 => array(20,20,20,20,20),
		 2 => array(23,17,21,17,22),
		 3 => array(25,16,21,19,19),
		 4 => array(16,24,20,20,20),
		 5 => array(19,18,20,18,25),
		 6 => array(25,16,21,16,22),
		 7 => array(15,22,20,23,20),
		 8 => array(21,22,21,16,21),
		 9 => array(17,22,20,23,18),
		10 => array(17,22,18,24,19),
		11 => array(21,17,20,20,22),
		22 => array(23,22,20,16,19)
	);
	
	$spellCrits=array(
		0,
		0.033355,
		0,
		0,
		0.012375,
		0,
		0.02201,
		0.009075,
		0.017,
		0,
		0.018515
	);
	
	
	$meleeCrits=array(
		0,
		0.00652,
		-0.01532,
		-0.00295,
		0.031765,
		0,
		0.02922,
		0.03454,
		0.02622,
		0,
		0.074755
	);
	
	$baseDodge = array(
		3.66400,
		3.49430,
		-4.08730,
		2.09570,
		3.41780,
		3.66400,
		2.10800,
		3.65870,
		2.42110,
		5.60970
	);
	
	$region = "eu";
	
	while($record =mysql_fetch_assoc($stmt)){
		try{
			$sz_xml = $record['xml'];
			if(!$sz_xml) continue;
			$xml = simplexml_load_string($sz_xml);
			
			if( !$xml ) {
				continue;
			}
			
			if( $xml->characterInfo['errCode'] ) {
				//echo "Error: ".$xml->characterInfo['errCode']."\n";
				continue;
			}
			
			if( strtotime($xml->characterInfo->character['lastModified']) < strtotime("October 13, 2010") ) {
				//echo "Outdated: ".$xml->characterInfo->character['lastModified']."\n";
				continue;
			}
			
			$name = $xml->characterInfo->character['name'];
			$realm = $xml->characterInfo->character['realm'];
			$class = (int)$xml->characterInfo->character['classId'];
			$level = (int)$xml->characterInfo->character['level'];
			$race = (int)$xml->characterInfo->character['raceId'];
			
			
			//echo "$realm $name\n";
			
			$cb = $xml->characterInfo->characterTab->characterBars;
			$bs = $xml->characterInfo->characterTab->baseStats;
			$sp = $xml->characterInfo->characterTab->spell;
			$df = $xml->characterInfo->characterTab->defenses;
			
			$hp = (int)$cb->health['effective'];
			$mp = $cb->secondBar['type'] == "m" ? (int)$cb->secondBar['effective'] : 0;
			
			
			$str = $bs->strength['base'] - $a_rS[$race][0];
			$agi = $bs->agility['base'] - $a_rS[$race][1];
			$sta = $bs->stamina['base'] - $a_rS[$race][2];
			$int = $bs->intellect['base'] - $a_rS[$race][3];
			$spi = $bs->spirit['base'] - $a_rS[$race][4];
			//echo "str: $str\nagi: $agi\nsta: $sta\nint: $int\nspi: $spi\n";
			
			//echo $level." ".$race." ".$locale['a_class'][$class-1]."\n";
			//echo "hp: $hp\nmp: $mp\n";
			
			$baseHp = $hp - (int)$bs->stamina['health'];
			//echo "base hp: $baseHp\n";
			
			$addAgi = ((int)$bs->agility['effective']);
			$addInt = ((int)$bs->intellect['effective']);
			$dodge = (float)$df->dodge['percent'];
			$dodgeFromRating = (float)$df->dodge['increasePercent'];
			$critPerAgi = $addAgi ? ((float)$bs->agility['critHitPercent'] - $meleeCrits[$class-1]*100 )/ $addAgi : 0;
			
			$sp5 = 0;
			$mp5 = 0;
			$baseMp = 0;
			$baseSp5 = 0;
			$spellCritPerInt = 0;
			if( $mp > 0 ) {
				
				$sp5 = (int) $sp->manaRegen['notCasting'];
				$mp5 = (int) $sp->manaRegen['casting'];
				$baseMp = $mp - (int)$bs->intellect['mana'];
				$baseSp5 = $sp5 - (int)$bs->spirit['manaRegen'];
				$spellCritPerInt = $addInt ? ((float)$bs->intellect['critHitPercent'] - $spellCrits[$class-1]*100 ) /$addInt : 0;
			}
			//echo "base mp: $baseMp\nbase sp5: $baseSp5\n";
			/*
			print_r($xml->characterInfo->characterTab->baseStats);
			print_r($xml->characterInfo->characterTab->melee);
			print_r($xml->characterInfo->characterTab->spell);
			print_r($xml->characterInfo->characterTab->ranged);
			print_r($xml->characterInfo->characterTab->defenses);
			*/
			
			mysql_db_query(
				$GLOBALS['g_game_db'],
				"INSERT INTO `chardev_data_stats` VALUES (NULL,'".
					mysql_real_escape_string($realm)."','".
					mysql_real_escape_string($name)."',$class,$level,$str,$agi,$sta,$int,$spi,$baseHp,$baseSp5,$baseMp,$dodge,$critPerAgi,$spellCritPerInt,$dodgeFromRating,$addAgi)",
				$GLOBALS['g_db_con']
			);
			
			echo mysql_error();
		}
		catch(Exception $e){ echo $e; }
		//sleep(10);
	}
?>