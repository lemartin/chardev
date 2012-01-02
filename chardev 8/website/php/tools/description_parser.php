<?php 
	include('../db.php');

	$result = mysql_query('select * from chardev_cataclysm.spell where id = 20217');
	
	$in = ""; 
	$out = "";
	
	while( $record = mysql_fetch_assoc($result) ) 
	{
		if( !$record['Description'] ) {
			continue;
		}
		
		mb_internal_encoding("UTF-8");
		
		$in = $record['Description'];
		$out = "";
		
		
		try{
			if( ($pos = mb_strpos($GLOBALS['in'],"\${")) !== false ) {
				$pos+=2;
				parse(mb_substr($GLOBALS['in'],$pos,find_closing("{","}",$pos)));
			}
		}
		catch( Exception $e ) {
			echo $e->getMessage()."\n";
		}
	}
	
	function find_closing($open,$closed,$pos) {
		$n = 1;
		$t = mb_substr($GLOBALS['in'],$pos);
		for($i=0;$i<mb_strlen($t);$i++) {
			$c = mb_substr($t,0,1); $t= mb_substr($t,1);
			switch($c) {
				case $open: $n++;break;
				case $closed: $n--;break;
			}
			if($n==0) {
				echo $i."\n";
				return $i;
			}
		}
		if($n>0) {
			throw new Exception("Unmatched ".$open." at pos: ".$pos);
		}
	}
	
	function parse($code) {
		echo strpos($code,"\$cond(");
	}
	
	function replace_function() {
		
	}
?>

