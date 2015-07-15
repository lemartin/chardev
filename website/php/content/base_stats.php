<?php 


	$class = ( isset($_GET['base_stats']) ? (int)$_GET['base_stats'] : 0 );
	
	$g_content .= "<div class='bs_class_ll'>";
	for($i=0;$i<count($locale['a_class']);$i++) {
		if(!$locale['a_class'][$i]) {
			continue;
		}
		$g_content .= "<a class='bs_class_link".( $i+1 == $class ? "_active" : "" )."' href='?base_stats=".($i+1)."'>".$locale['a_class'][$i]."</a>";
	}
	
	$g_content .= "</div>";
	
	if( $class ) {
		$result = mysql_db_query(
			$GLOBALS['g_static_db'],
			"SELECT * FROM chardev_base_stats_class_level WHERE class = ".$class." ORDER BY level ASC LIMIT 0,85 ",
			$GLOBALS['g_db_con']
		);
		
		$g_content.= "<div class='bs_table_bg'><div class='bs_row_f'>
		<table class='bs_table' cellspacing='0' cellpadding='2'>
		<colgroup>
			<col width='40px'/>
			<col width='40px'/>
			<col width='40px'/>
			<col width='40px'/>
			<col width='40px'/>
			<col width='40px'/>
			<col width='50px'/>
			<col width='50px'/>
			<col width='50px'/>
			<col width='150px'/>
			<col width='150px'/>
			<col width='150px'/>
		</colgroup>
		<tr class='bs_header'>
			<td class='bs_th_left'>Lvl</td>
			<td class='bs_th'>Str</td>
			<td class='bs_th'>Agi</td>
			<td class='bs_th'>Sta</td>
			<td class='bs_th'>Int</td>
			<td class='bs_th'>Spi</td>
			<td class='bs_th'>Hp</td>
			<td class='bs_th'>Mp</td>
			<td class='bs_th'>Mp5/Sp5</td>
			<td class='bs_th'>Melee Crit per Agi</td>
			<td class='bs_th'>Spell Crit per Int</td>
			<td class='bs_th'>Dodge per Agi</td>
		</tr>
		";
		
		while($record = mysql_fetch_assoc($result)) {
			$g_content.= "<tr>";
			
			$g_content.= "<td class='bs_td_left'>".$record['level']."</td>";
			$g_content.= "<td class='bs_td'>".$record['str']."</td>";
			$g_content.= "<td class='bs_td'>".$record['agi']."</td>";
			$g_content.= "<td class='bs_td'>".$record['sta']."</td>";
			$g_content.= "<td class='bs_td'>".$record['int']."</td>";
			$g_content.= "<td class='bs_td'>".$record['spi']."</td>";
			$g_content.= "<td class='bs_td'>".$record['hp']."</td>";
			$g_content.= "<td class='bs_td'>".$record['mp']."</td>";
			$g_content.= "<td class='bs_td'>".$record['mana_regen']."</td>";
			$g_content.= "<td class='bs_td'>".sprintf("%01.8f", $record['melee_crit_per_agi'])."</td>";
			$g_content.= "<td class='bs_td'>".sprintf("%01.8f", $record['spell_crit_per_int'])."</td>";
			$g_content.= "<td class='bs_td'>".sprintf("%01.8f", $record['dodge_per_agi'])."</td>";
			
			$g_content.= "</tr>";
		}
		
		
		$g_content.= "</table></div></div>";
	}

?>