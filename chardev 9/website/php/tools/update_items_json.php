<?php

	include('../datacon/db.php');
	include('../datacon/functions.php');
	include('functions.php');
	
	set_time_limit(0);
	$result = mysql_query("select itemId from items where outdated=0");
	
	while($record = mysql_fetch_assoc($result))
	{
		$json_en = getItemById($record['itemId'],'');
		$json_fr = getItemById($record['itemId'],'fr');
		$json_de = getItemById($record['itemId'],'de');
		$json_es = getItemById($record['itemId'],'es');
		$json_ru = getItemById($record['itemId'],'ru');
		
		//echo "insert into items_json values ( ".$record['itemId'].",en,".mysql_real_escape_string($json_en),",now() )";
		//die;
		
		mysql_query("insert into items_json values ( ".$record['itemId'].",'en','".mysql_real_escape_string($json_en)."',now() )");
		mysql_query("insert into items_json values ( ".$record['itemId'].",'fr','".mysql_real_escape_string($json_fr)."',now() )");
		mysql_query("insert into items_json values ( ".$record['itemId'].",'de','".mysql_real_escape_string($json_de)."',now() )");
		mysql_query("insert into items_json values ( ".$record['itemId'].",'es','".mysql_real_escape_string($json_es)."',now() )");
		mysql_query("insert into items_json values ( ".$record['itemId'].",'ru','".mysql_real_escape_string($json_ru)."',now() )");
	}
?>