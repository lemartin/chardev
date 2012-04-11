<?php
	include '../db.php';
	include '../common.php';
	include '../locale/en.php';
	
	$stmt = mysql_db_query(
		$GLOBALS['g_game_db'],
		"TRUNCATE TABLE `chardev_data_dodge`",
		$GLOBALS['g_db_con']
	);
	
	$stmt = mysql_db_query(
		$GLOBALS['g_game_db'],
		"SELECT * FROM `chardev_data_stats` WHERE `level` = 80 AND `class` = 4",
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
		 9 => array(21,22,20,16,21),
		10 => array(17,22,20,23,18),
		11 => array(21,17,20,20,22),
		22 => array(23,22,20,16,19)
	);
	
	$baseDodge = array(
		0,
		3.66400,
		3.49430,
		-4.08730,
		2.09570,
		3.41780,
		3.66400,
		2.10800,
		3.65870,
		2.42110,
		0,
		5.60970
	);
	
	$DIMINISHING_K = array(0, 0.9560,	0.9560,		0.9880,		0.9880,		0.9530,		0.9560,		0.9880,		0.9530,		0.9530,		0,		0.9720); 
	$DIMINISHING_CD= array(0, 88.129021,	88.129021,	145.560408,	145.560408,	150.375940,	88.129021,	145.560408,	150.375940,	150.375940,	0,		116.890707);
	
	$max = 0; $min = 1;
	
	while($record =mysql_fetch_assoc($stmt)){
		$agi_record = mysql_fetch_assoc(mysql_db_query(
			$GLOBALS['g_game_db'],
			"SELECT * FROM `chardev_base_stats_class_level` WHERE `level` = 80 AND `class` = 4",
			$GLOBALS['g_db_con']
		));
		
		//print_r($record);
		$classId = (int)$record['class'];
		
		$diminishedDodge = (float)$record['dodge'] /*- $baseDodge[$classId]*/;
		
		$addDodge = $DIMINISHING_K[$classId] * ( 1 / ( 1 / $diminishedDodge - 1 / $DIMINISHING_CD[$classId]  ) );
		//$addDodge2 = $DIMINISHING_K[$classId] * $DIMINISHING_CD[$classId] * $diminishedDodge / ( $DIMINISHING_CD[$classId] - $diminishedDodge );
		$agiDodge = $addDodge - (float)$record['dodgeFromRating'];
		$agi = (int)$record['additionalAgility'];
		$dodgePerAgi = $agiDodge / $agi;
		echo $record['dodge']." $diminishedDodge $addDodge $addDodge2 $agiDodge $agi $dodgePerAgi \n";
		
		$max = $dodgePerAgi > $max ? $dodgePerAgi : $max;
		$min = $dodgePerAgi < $min ? $dodgePerAgi : $min;
	}
	
	echo "max:". $max . " min: ".$min."\n"
?>