<?php 
include '../db.php';
include '../common.php';
	
	$stmt = mysql_db_query(
		$GLOBALS['g_game_db'],
		"SELECT * FROM `gtCombatRatings`",
		$GLOBALS['g_db_con']
	);
	$arr = array();
	while( $record = mysql_fetch_assoc($stmt)) {
		$i = (int)$record['ID'];
		$c = floor($i/100);
		if( $i % 100 == $i / 100 ) {
			$arr[$c] = array();
		}
		$arr[$c][$i-$c*100] = (float)$record['Value'];
	}
	echo "var COMBAT_RATINGS = ".json_encode($arr).";<br />";
	
	$stmt = mysql_db_query(
		$GLOBALS['g_game_db'],
		"SELECT * FROM `gtregenmpperspt` where `ID` >= 100 AND  `ID` < 200",
		$GLOBALS['g_db_con']
	);
	
	$arr = array();
	while( $record = mysql_fetch_assoc($stmt)) {
		$i = (int)$record['ID'] - 100;
		$arr[$i] = (float)$record['Value'];
	}
	
	echo "var BASE_REGEN = ".json_encode($arr).";<br />";
	
	$stmt = mysql_db_query(
		$GLOBALS['g_game_db'],
		"SELECT * FROM `scalingstatvalues`",
		$GLOBALS['g_db_con']
	);
	
	$arr = array();
	while( $record = mysql_fetch_assoc($stmt)) {
		$arr[(int)$record['level']] = array();
		for($i=0;$i<45;$i++){
			$arr[(int)$record['level']][] = (int)$record['dist'.$i];
		} 
	}
	
	echo "var SCALING_STAT_VALUE = ".json_encode($arr).";<br />";
	echo "var SPELL_SCALING=".json_encode(get_gt_spell_scaling()).";<br />";
	echo "var ITEM_CLASSES = ".json_encode(get_item_classes()).";<br />";
	echo "var SERIALIZED_PROFESSIONS = ".json_encode(get_professions()).";<br />";
?>