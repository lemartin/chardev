<?php

	include('../datacon/db.php');
	include('../datacon/functions.php');
	include('functions.php');
	

	if($resultDrop = mysql_fetch_assoc(mysql_query("SELECT * FROM data_items WHERE itemId=".$_GET['itemId']))){
		$root = NULL;
		$xml = simplexml_load_string($resultDrop['xml']);
		RecurseXML($xml,$root);
		$node = $root['childs']['itemInfo'][0]['childs']['item'][0]['childs'];
		if(isset($node['dropCreatures'])){
			$creatures = $node['dropCreatures'][0]['childs']['creature'];
			for($i=0;$i<count($creatures);$i++){
				$attributes = $creatures[$i]['attributes'];
				if($attributes['name'] && $attributes['area'])
					echo $attributes['name']." (".$attributes['area'].")";
				else if($attributes['name'])
					echo $attributes['name'];
				else if($attributes['area'])
					echo $attributes['area'];
			}
		}
	}
?>