<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<title>Unbenanntes Dokument</title>
</head>

<body style="font-family:tahoma; font-size:12px ">
<?php	
	set_time_limit(0);
	include('../inc/datacon/db.php');
	include('../inc/datacon/functions.php');
	include('functions.php');
	echo "<table cellpadding='4px'>";
	$scrit_per_int = array();
	$scrit_per_int_vals = array();
	for($clInd=0;$clInd<11;$clInd++){
		if($clInd==9) continue;
		$mcrit_base = 0;$mcrit_vals = 0;
		$scrit_base = 0;$scrit_vals = 0;
		echo "
			<tr>
				<td>class</td>
				<td>level</td>
				<td>str</td>
				<td>agi</td>
				<td>sta</td>
				<td>int</td>
				<td>spi</td>
				<td>hp</td>
				<td>mp</td>
				<td>crit per agi</td>
			</tr>";
		for($lvl=10;$lvl<=85;$lvl++){
			if($clInd==0){ 
				$scrit_per_int[$lvl]=0;
				$scrit_per_int_vals[$lvl]=0;
			}
			echo "<tr><td>".pow(2,$clInd)."</td><td>".$lvl."</td><td>";
			
			$base = mysql_fetch_assoc(mysql_query("select min(str) as str,min(agi) as agi,min(sta) as sta ,min(`int`) as inte,min(spi) as spi,min(hp) as hp,min(mp) as mp from data_basestats where level=".$lvl." and class=".pow(2,$clInd)." group by level"));
			echo $base['str']."</td><td>".$base['agi']."</td><td>".$base['sta']."</td><td>".$base['inte']."</td><td>".$base['spi']."</td><td>".$base['hp']."</td><td>".$base['mp']."</td><td>";
			
			$max = mysql_fetch_assoc(mysql_query("select agi_eff , mcrit_agi, count(*) as cnt, (sum(mcrit_agi)-min(mcrit_agi)*count(mcrit_agi))/(sum(agi_eff)-min(agi_eff)*count(agi_eff)) as val, (sum(mcrit_agi)-(sum(mcrit_agi)-min(mcrit_agi)*count(mcrit_agi))/(sum(agi_eff)-min(agi_eff)*count(agi_eff))*sum(agi_eff))/count(*) as base from data_basestats where level=".$lvl." and class=".pow(2,$clInd)." and agi_eff and mcrit_agi group by level"));
			$min = mysql_fetch_assoc(mysql_query("select agi_eff , mcrit_agi from data_basestats where level=".$lvl." and class=".pow(2,$clInd)." and agi_eff>0 and mcrit_agi>0 order by agi_eff asc"));
			//echo $max['agi_eff'].", ".$max['mcrit_agi'].",".$min['agi_eff'].", ".$min['mcrit_agi']."<br/>";
			//echo (($max['mcrit_agi']-$min['mcrit_agi'])/($max['agi_eff']-$min['agi_eff']))."</td><td>";
			//echo ($max['mcrit_agi']-(($max['mcrit_agi']-$min['mcrit_agi'])/($max['agi_eff']-$min['agi_eff']))*$max['agi_eff'])."</td><td>";
			echo $max['val']."</td><td>";
			if($max['base']){
				$mcrit_base += $max['base']*$max['cnt'];
				$mcrit_vals += $max['cnt'];
			}
			$q = "replace into basestats_class_level values(".pow(2,$clInd).",".$lvl.",".$base['str'].",".$base['agi'].",".$base['sta'].",".$base['inte'].",".$base['spi'].",".$base['hp'].",".$base['mp'].",".($max['val']?$max['val']:0).")";
			//echo $q;
			mysql_query($q);
			
			$base = mysql_fetch_assoc(mysql_query("select int_eff , scrit_int from data_basestats where level=".$lvl." and class=".pow(2,$clInd)." order by int_eff desc"));
			$max = mysql_fetch_assoc(mysql_query("select int_eff , scrit_int from data_basestats where level=".$lvl." and class=".pow(2,$clInd)." order by int_eff desc"));
			$min = mysql_fetch_assoc(mysql_query("select int_eff , scrit_int from data_basestats where level=".$lvl." and class=".pow(2,$clInd)." and int_eff>0 and scrit_int>0 order by int_eff asc"));
			$int = mysql_fetch_assoc(mysql_query("select count(*) as cnt, (sum(scrit_int)-min(scrit_int)*count(scrit_int))/(sum(int_eff)-min(int_eff)*count(int_eff)) as val, (sum(scrit_int) - (sum(scrit_int)-min(scrit_int)*count(scrit_int))/(sum(int_eff)-min(int_eff)*count(int_eff))*sum(int_eff))/count(*) as base from data_basestats where level=".$lvl." and class=".pow(2,$clInd)." and int_eff and scrit_int group by level"));
			//echo $max['int_eff'].", ".$max['scrit_int'].",".$min['int_eff'].", ".$min['scrit_int']."<br/>";
			//echo (($max['scrit_int']-$min['scrit_int'])/($max['int_eff']-$min['int_eff']))." (".$int['val'].")</td><td>";
			if($int['base']){
				$scrit_base += $int['base']*$int['cnt'];
				$scrit_vals += $int['cnt'];
			}
			if($int['val']>0){
				$scrit_per_int[$lvl]+=$int['val']*$int['cnt'];
				$scrit_per_int_vals[$lvl]+=$int['cnt'];
			}
		}
		mysql_query("replace into basestats_class values(".pow(2,$clInd).",".$mcrit_base/$mcrit_vals.",".$scrit_base/$scrit_vals.")");
		echo "<tr><td colspan='3'>base melee crit</td><td colspan='7'>".$mcrit_base/$mcrit_vals."<td></tr>";
		echo "<tr><td colspan='3'>base spell crit</td><td colspan='7'>".$scrit_base/$scrit_vals."<td></tr>";
	}
	echo "</table>";
	echo "<table><tr><td>level</td><td>crit per int</td></tr>";
	for($lvl=10;$lvl<=85;$lvl++){
		echo "<tr><td>".$lvl."</td><td>".$scrit_per_int[$lvl]/$scrit_per_int_vals[$lvl]."</td></tr>";
		mysql_query("replace into basestats_level values(".$lvl.",".$scrit_per_int[$lvl]/$scrit_per_int_vals[$lvl].")");
	}
	echo "</table>";
?>
</body>
</html>
