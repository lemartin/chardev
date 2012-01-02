<?php

	include('../datacon/db.php');
	include('../datacon/functions.php');
	include('functions.php');
	
	set_time_limit(0);
	$stmt = mysql_query("select itemId from items_dev where outdated=0 and namefr like '' order by itemid desc");
	while($result = mysql_fetch_assoc($stmt)){
		echo $result['itemId'].",";
	}
?>