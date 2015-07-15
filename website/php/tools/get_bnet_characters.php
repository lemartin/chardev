<?php 

require_once './../db.php';
require_once './../common.php';


ini_set('default_socket_timeout', 5);

$result = mysql_db_query(
	$GLOBALS['g_static_db'],
	"SELECT `name` FROM `chardev_data_character_names`",
	$GLOBALS['g_db_con']
);

$base = "http://eu.battle.net";
$query;

while( $record = mysql_fetch_assoc($result) ) {
	
	$chars = 0;
	$page = 1;
	$next = false;
	
	do {
		
		$query = $base."/wow/en/search?q=".$record['name']."&f=wowcharacter&page=".$page;
		echo $query."\n";
		
		$contents = file_get_contents($query);
		
		if(preg_match("/Next \&gt\;/",$contents)){
			echo "next\n";
			$next = true;
		}
		else {
			$next = false;
			echo "last\n";
		}
		// [^>]*>.*<td[^>]*>\s*(\d+)\s*<\/td[^>]*><\/td[^>]*>
		preg_match_all('/<td[^>]*>\s*<a[^>]*href="(\/wow\/en\/character\/.*?)"[^>]*>(?:.|\s)*?<td[^>]*>\s*(\d+)\s*<\/td[^>]*>/',$contents,$matches);
		
		//preg_match_all('/href="(\/wow\/en\/character\/.*?)"/',$contents,$matches,PREG_SET_ORDER);
		
		if( !$matches ) {
			break;
		}
		
		//print_r($matches);
		
		$chars = count($matches[1]);
		echo $chars."\n";
		
		for( $i=0; $i<$chars; $i++ ) {
			if( ((int)$matches[2][$i]) < 10 ) {
				$next = false;
				break;
			}
			
			$url = $base.$matches[1][$i];
			
			get_bnet_char($url, $record['name'] );
		}
		
		$page ++;
	}
	while ( $next );
}


$result = mysql_db_query(
	$GLOBALS['g_game_db'],
	"SELECT `name`, `url` FROM `chardev_data_bnet_profiles`",
	$GLOBALS['g_db_con']
);

while( $record = mysql_fetch_assoc($result) ) {
	get_bnet_char( $record['url'], $record['name'] );
}

function get_bnet_char( $url, $name ) {
	echo $url."simple: ";
	
	$old = error_reporting(1); 
	$content = file_get_contents($url.'simple'	);
	error_reporting($old);
	
	if( !$content ) {
		echo "no conent\n";
		return;
	}
	if( preg_match('/Character Not Available/',$content) ) {
		echo "character not available\n";
		return;
	}
	
	$xml = simplexml_load_string($content);
	if( !$xml ) {
		echo "invalid xml\n";
		return;
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
	
	echo $race." ".$class." ".$level."\n";
	
	mysql_db_query(
		$GLOBALS['g_static_db'],
		"REPLACE INTO `chardev_data_bnet_profiles` VALUES ("
			."'".mysql_real_escape_string($name)."',"
			."'".mysql_real_escape_string($url)."',"
			."'".$class."',"
			."'".$race."',"
			."'".$level."',"
			."'".mysql_real_escape_string($content)."')"
		,
		$GLOBALS['g_db_con']
	);
}



?>