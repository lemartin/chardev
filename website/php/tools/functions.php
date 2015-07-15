<?php
function getXML($fn){
	ini_set("user_agent","Mozilla/5.0 (Windows; U; Windows NT 5.1; de; rv:1.8.1.6) Gecko/20070725 Firefox/2.0.0.6");
	ini_set('default_socket_timeout', 5);
	
	if(!($f=fopen($fn,"r")))
	{ 
		echo "error_no_stream";
		return false;
	}
		
	$xml="";
	if($f){
		while(!feof($f)){		
			$xml.=fread($f,1024);
		}
		fclose($f);
	}
	return $xml;
}

function RecurseXML($xml,&$arr)
{
	$child_count = 0;
	$arr['childs'] = array();
	$arr['attributes'] = array();
	
	foreach($xml->attributes() as $key=>$value)
		$arr['attributes'][$key]=$value;
		
	foreach($xml as $key=>$value){
		if(!is_array($arr['childs'][$key]))
			$arr['childs'][$key] = array();
		RecurseXML($value,$arr['childs'][$key][sizeof($arr['childs'][$key])]);
	}
}
	
	function steel_charsheet($region,$url){
		if(!$url) return;

		$sz_xml = getXML("http://".$region.".wowarmory.com/character-sheet.xml?".htmlspecialchars_decode($url));
		return str_replace("'","\'",$sz_xml);
	}
?>