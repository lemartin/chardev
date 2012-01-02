<?php
	include('../inc/datacon/db.php');
	include('../inc/datacon/functions.php');
	$q = "select i.name as name, sie.type1 t1, sie.type2 t2, sie.type3 t3, sie.spellid1 s1, sie.spellid3 s3, sie.spellid2 s2,sie.description d from items i inner join gemproperties g on g.irefid_gemproperties = i.irefid_gemproperties inner join spellitemenchantment sie on sie.id = g.irefid_spellitemenchantment  where name not like '%perfect%' and itemclassid=3 and i.irefid_gemproperties group by i.name";
	$stmt = mysql_query($q);
	$n=1;
	$names = array();
	$prefix = array();
	$effect = array();
	$mapping = array();
	echo "<table>";
	while($result = mysql_fetch_assoc($stmt)){
		$names[$n] = $result['name'];
		echo "
			<tr>
				<td>".$n."</td>
				<td>".htmlspecialchars($result['name'])."</td>
				<td>".$result['d']."</td>";
		$result['d'] = preg_replace("/((\+\s*)*\d+(\s*\%)*)|(\Qby\E)/","",$result['d']);
		$split = split(' and ',$result['d']);
		$effect[$n] = $split;
		for($i=0;$i<sizeof($split);$i++)
			echo"
				<td>".$split[$i]."<td>";
		echo"
			</tr>";
		$n++;
	}
	echo "</table>";
	$k = 0;
	for($i=1;$i<sizeof($names);$i++){
		$split = split(" ",$names[$i]);
		echo htmlspecialchars($split[0])."<br/>";
		for($j=1;$j<sizeof($names);$j++){
			if(strpos($names[$j],$split[0])!==false)
				$prefix[$split[0]]++;
		}
	}
	echo "<table>";
	foreach($prefix as $key=>$value){
		
		for($j=1;$j<sizeof($names);$j++){
			if(strpos($names[$j],$key)!==false){
				echo "
			<tr>
				<td>".htmlspecialchars($key)."</td>
				<td>".htmlspecialchars($value)."</td>";
				$k = 0;
				for(;$k<sizeof($effect[$j]);$k++){
					echo"
				<td>".htmlspecialchars($effect[$j][$k])."</td>";
					if(is_array($mapping[$effect[$j][$k]]))
						$mapping[$effect[$j][$k]][sizeof($mapping[$effect[$j][$k]])]=$key;
					else $mapping[$effect[$j][$k]]=array($key);
				}
				echo"
				<td colspan='".(10-$k)."'></td>
			</tr>";
				$j = sizeof($names);
			}
		}
	}
	echo "
		</table>
";
	
	foreach($mapping as $key=>$value){
		echo htmlspecialchars($key).":";
		foreach($value as $key2=>$value2){
			echo htmlspecialchars($value2).",";
		}
		echo "<br/>\n";
	}
?>