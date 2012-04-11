<?php 

die;
include('../db.php');
include('../common.php');

$result = mysql_db_query(
	$GLOBALS['g_profile_db'],
	"SELECT * FROM `chardev_characters`",
	$GLOBALS['g_db_con']
);

while( $record = mysql_fetch_assoc($result) ) {
	echo $record['ID'].":\n";
		$r = unserialize($record['Serialized']); 
		
		for( $i=0; $i<count($r[1]); $i++ ) {
			if( $r[1][$i] == null ) {
				$r[1][$i] = null;
			} 
			else {
				
				$itm = get_item($r[1][$i][0]);
				//echo $r[1][$i][5][0]." ".$r[1][$i][5][1]."\n";
				$r[1][$i][5] = array( 
					$r[1][$i][5][0] >= 0 ? $itm[13][$r[1][$i][5][0]][0] : -1,
					$r[1][$i][5][1]
				);
				
				//echo "reduce ".$reforge[0]." from ".$r[1][$i][5][0]."\n";
				//echo "add ".$reforge[1]." from ".$r[1][$i][5][1]."\n";
			}
		}
		
		$r = serialize($r);
		
		mysql_db_query(
			$GLOBALS['g_profile_db'],
			"UPDATE `chardev_characters2` SET `Serialized`='".mysql_real_escape_string($r)."' WHERE `ID`=".$record['ID'],
			$GLOBALS['g_db_con']
		);
		
		echo mysql_error();
}