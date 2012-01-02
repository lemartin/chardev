<?php 

/*

REPLACE INTO chardev_cataclysm_static.chardev_base_stats_class_level SELECT 
	class,
	level,
	min(str),
	min(agi),
	min(sta),
	min(`int`),
	min(spi),
	min(health),
	min(mana),
	min(critperagi),
	min(spellcritperint),
    avg(dodgeperagi),
	min(manaRegen)
FROM `chardev_cataclysm_static`.`chardev_data_stats` 
GROUP BY class, level
 */

require_once './../db.php';
require_once './../common.php';

$base_regen = array(0.020979,0.020515,0.020079,0.019516,0.018997,0.018646,0.018314,0.017997,0.017584,0.017197,0.016551,0.015729,0.015229,0.01458,0.014008,0.01365,0.013175,0.012832,0.012475,0.012073,0.01184,0.011494,0.011292,0.01099,0.010761,0.010546,0.010321,0.010151,0.009949,0.00974,0.009597,0.009425,0.009278,0.009123,0.008974,0.008847,0.008698,0.008581,0.008457,0.008338,0.008235,0.008113,0.008018,0.007906,0.007798,0.007713,0.007612,0.007524,0.00743,0.00734,0.007268,0.007184,0.007116,0.007029,0.006945,0.006884,0.006805,0.006747,0.006667,0.0066,0.006421,0.006314,0.006175,0.006072,0.005981,0.005885,0.005791,0.005732,0.005668,0.005596,0.005316,0.005049,0.004796,0.004555,0.004327,0.00411,0.003903,0.003708,0.003522,0.003345,0.003345,0.003345,0.003345,0.003345,0.003345,0.003345,0.003345,0.003345,0.003345,0.003345,0.003345,0.003345,0.003345,0.003345,0.003345,0.003345,0.003345,0.003345,0.003345,0.003345);

$a_rS=array(
	 1 => array(20,20,20,20,20),	
	 2 => array(23,17,21,17,22),
	 3 => array(25,16,21,19,19),
	 4 => array(16,24,20,20,20),
	 5 => array(19,18,20,18,25),
	 6 => array(25,16,21,16,22),
	 7 => array(15,22,20,23,20),
	 8 => array(21,22,20,16,21),
	 9 => array(17,22,20,23,18),
	10 => array(17,22,20,23,18),
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
/*
$baseDodge = array(
	3.66400, // 	3.75955
	3.49430, // 	3.65168
	-4.08730,// 	-5.43889
	2.09570, //		-0.588581
	3.41780, //		3.18783
	3.66400, //		3.66584
	2.10800, //		1.67504
	3.65870, //		3.47569
	2.42110, //		2.04144
	5.60970  //		4.97143
);
 */
$baseDodge = array(
	0,
	3.75955,
	3.65168,
	-5.43889,
	-0.588581,
	3.18783,
	3.66584,
	1.67504,
	3.47569,
	2.04144,
	0,
	4.97143
);

$DIMINISHING_K = array(0, 0.9560,		0.9560,		0.9880,		0.9880,		0.9530,		0.9560,		0.9880,		0.9530,		0.9530,		0,		0.9720); 
$DIMINISHING_CD= array(0, 65.631440,	65.631440,	145.560408,	145.560408,	150.375940,	65.631440,	145.560408,	150.375940,	150.375940,	0,		116.890707);
	

$stmt = mysql_db_query(
	$GLOBALS['g_static_db'],
	"TRUNCATE TABLE `chardev_data_stats`",
	$GLOBALS['g_db_con']
);

$chunk = 0;
$chunkSize = 1000;
do {
	$result = mysql_db_query(
		$GLOBALS['g_static_db'],
		"select * from chardev_data_bnet_profiles limit ".($chunk*$chunkSize).",".$chunkSize,
		$GLOBALS['g_db_con']
	);
	$chunk++;
	$n = 0;
	while( $record = mysql_fetch_assoc($result) ) {
		$n++;
		try {
			$old = error_reporting(1); 
			$xml = simplexml_load_string($record["xml"]);
			error_reporting($old);
			if( !$xml ) {
				echo "invalid xml\n";
				mysql_db_query(
					$GLOBALS['g_static_db'],
					"delete from chardev_data_bnet_profiles where url like '".
					mysql_real_escape_string($record["url"])."'",
					$GLOBALS['g_db_con']
				);
				echo mysql_error();
				continue;
			}
		}
		catch( Exception $e ) {
			continue;
		}
		
		preg_match('/Last updated on (\d\d)\/(\d\d)\/(\d\d\d\d)/', $record["xml"] ,$match); 
		if( $match ) {
			if( strtotime($match[2]."/".$match[1]."/".$match[3]) < strtotime("8 December 2010") ) {
				echo "\toudated: ".$match[2]." ".$match[1]." ".$match[3]."\n";
				mysql_db_query(
					$GLOBALS['g_static_db'],
					"delete from chardev_data_bnet_profiles where url like '".
					mysql_real_escape_string($record["url"])."'",
					$GLOBALS['g_db_con']
				);
				echo mysql_error();
				continue;
			}
		}
		
		$race = $xml->xpath('//*[@class="race"]');
		$race = (string)$race[0];
		$race = $GLOBALS['race_name_to_id'][$race];
		//		class
		$class = $xml->xpath('//*[@class="class"]');
		$class = (string)$class[0];
		$class = $GLOBALS['class_name_to_id'][$class];
		//		level
		$level = $xml->xpath('//*[@class="level"]');
		$level = $level[0]->strong;
		
	//	echo $race." ".$class." ".$level."\n";
		
		preg_match('/new Summary\.Stats\(\{([^\}]+)\}/m',$record["xml"], $match);
		
		$arr = json_decode('{'.$match[1].'}');
		
		echo $record['url']."\n";
		
		$baseStr = $arr->strBase;
		$totalStr = $arr->strTotal;
		$baseAgi = $arr->agiBase;
		$totalAgi = $arr->agiTotal;
		$baseSta = $arr->staBase;
		$totalSta = $arr->staTotal;
		$baseInt = $arr->intBase;
		$totalInt = $arr->intTotal;
		$baseSpr = $arr->sprBase;
		$totalSpr = $arr->sprTotal;
		
	//    [manaRegenPerFive] => 66
	//    [manaRegenCombat] => 8
		
		$str = $baseStr - $a_rS[$race][0];
		$agi = $baseAgi - $a_rS[$race][1];
		$sta = $baseSta - $a_rS[$race][2];
		$int = $baseInt - $a_rS[$race][3];
		$spr = $baseSpr - $a_rS[$race][4];
		
		$hp = $arr->health;
		if($totalSta>=20) {
			$hp -= 20 + ( $totalSta - 20 ) * ( $level > 80 ?  10 + 0.8 * ( $level - 80 ) : 10 );
		}
		else {
			$hp -= $totalSta;
		}
		
		if( $race == 6 ) {
			$hp = ceil($hp/1.05);
		}
		
	//	echo "$str $agi $sta $int $spr \n";
	//	
	//	echo $baseStr." ".$totalStr."\n";
	//	echo $baseAgi." ".$totalAgi."\n";
	//	echo $baseSta." ".$totalSta."\n";
	//	echo $baseInt." ".$totalInt."\n";
	//	echo $baseSpr." ".$totalSpr."\n";
		
		$dodge = $arr->dodge;
		$dodgeFromRating = $arr->dodgeRatingPercent;
		$critPerAgi = ($arr->agi_crit - $meleeCrits[$class-1]*100 )/ $totalAgi;
		
		$baseHp = $hp;
		
		$agiw = $baseAgi;
		$agig = $totalAgi - $baseAgi;
		$addDodge = $dodge - $baseDodge[$class];
		$k = $DIMINISHING_K[$class];
		$c = $DIMINISHING_CD[$class];
		
		//echo "$agiw $agig $addDodge $k $c \n";
		
		if( $agig > 0 ) {
	  		$dodgePerAgi = 	(1/(2 * $agig * $agiw))*($addDodge * $agig - $agig * $c - $agiw *
							$dodgeFromRating - $agiw * $c * $k + sqrt(4 * $agig * $agiw * (-$c *
							$dodgeFromRating + $addDodge * ($dodgeFromRating + $c * $k)) + 
							pow(-$addDodge * $agig + $agig * $c + $agiw * ($dodgeFromRating + $c * $k),2)));
		}
		else {
		//echo "($addDodge - ($c * $dodgeFromRating)/($dodgeFromRating + $c * $k))/$agiw;\n";
		
			$dodgePerAgi = ($addDodge - ($c * $dodgeFromRating)/($dodgeFromRating + $c * $k))/$agiw;
		}
  			
  		//echo $dodgePerAgi."\n";
		
		$mp = 0;
		$sp5 = 0;
		$mp5 = 0;
		$baseMp = 0;
		$baseSp5 = 0;
		$spellCritPerInt = 0;
		if( $arr->powerTypeId == 0 ) {
			
			$mp = $arr->power;
			$sp5 = $arr->manaRegenPerFive;
			$mp5 = $arr->manaRegenCombat;
			$baseMp = $mp - $arr->int_mp;
			$baseSp5 = $sp5 - floor(5 * (0.001 + sqrt($totalInt) * ($totalSpr) * $base_regen[$level-1]));
			
			$spellCritPerInt = $arr->int_crit / $totalInt;
		}
		
		mysql_db_query(
			$GLOBALS['g_static_db'],
			"INSERT INTO `chardev_data_stats` VALUES ('".
				mysql_real_escape_string($record['url']).
				"',$class,$level,$str,$agi,$sta,$int,$spr,$baseHp,$baseSp5,$baseMp,$dodge,$critPerAgi,$spellCritPerInt,$dodgeFromRating,$totalAgi,$baseAgi,".($totalAgi-$baseAgi).",$dodgePerAgi)",
			$GLOBALS['g_db_con']
		);
		echo mysql_error();
	}
}
while ( $n > 0);

?>