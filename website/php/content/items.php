<!-- css -->
<link href="tooltip.css" rel="stylesheet" />
<link href="list.css" rel="stylesheet" />
<!-- gui lib -->
<script src="js/gui_lib/StaticGrid.js" type="text/javascript"></script>
<script src="js/gui_lib/MultiSelect.js" type="text/javascript"></script>
<script src="js/gui_lib/SingleSelect.js" type="text/javascript"></script>
<!-- chardev lib 8.0 -->
<script src="js/chardev_lib/Tools.js" type="text/javascript"></script>
<script src="js/chardev_lib/Listener.js" type="text/javascript"></script>
<script src="js/chardev_lib/Engine.js" type="text/javascript"></script>
<script src="js/chardev_lib/Tooltip.js" type="text/javascript"></script>
<script src="js/chardev_lib/Spell.js" type="text/javascript"></script>
<script src="js/chardev_lib/Item.js" type="text/javascript"></script>
<script src="js/chardev_lib/container/Container.js" type="text/javascript"></script>
<script src="js/chardev_lib/container/ItemContainer.js" type="text/javascript"></script>
<script src="js/chardev_lib/ItemSet.js" type="text/javascript"></script>
<script src="js/chardev_lib/SpellItemEnchantment.js" type="text/javascript"></script>

<script src="js/chardev_lib/gui/Filter.js" type="text/javascript"></script>
<script src="js/chardev_lib/gui/ItemList.js" type="text/javascript"></script>
<!-- datas -->
<script type="text/javascript">
	var g_serialized = null;
	var g_itemClasses = null;
	var g_itemClass = -1;
	var g_itemSubClassMask = 0;
	var g_arguments = "";
</script>
<?php

	$item_classes = get_item_classes();
	parse_item_class( $item_class, $item_sub_class_mask);
	$items = get_items(
		( $item_class >= 0 ? 'class.eq.'.$item_class.';' : '' ) .
		( $item_sub_class_mask > 0 ? 'subclass.ba.'.$item_sub_class_mask.';' : '' ) .
		$_GET['a'],
		$_GET['f'],
		$_GET['o']);
	echo "
<script type=\"text/javascript\">
	g_serialized = ".json_encode($items).";
	g_itemClasses = ".json_encode(get_item_classes()).";
	g_itemClass = ".$item_class.";
	g_itemSubClassMask = ".$item_sub_class_mask.";
	g_arguments = ".json_encode($_GET['a']).";
</script>";
?>
<script type="text/javascript">
	var g_itemList = null;
	var g_itemParent = null;
	var g_items = new ItemContainer();
	function g_onLoad() {
		g_itemList = new ItemList(g_serialized);
		g_itemList.set(g_itemClass,g_itemSubClassMask,g_arguments);
		g_itemParent = document.getElementById('items_parent');
		g_itemParent.appendChild(g_itemList._node);
	}
	function g_showIfExists( id ) {
		var node = document.getElementById(id);
		if( node ) {
			node.style.display = "block";
		}
	}
	
	function hideIfExists( id ) {
		var node = document.getElementById(id);
		if( node ) {
			node.style.display = "none";
		}
	}
</script>

<?php 
	echo "<table><tr>";
	for( $i = 0; $i < count($item_classes); $i++ ) 
	{
		if( !$item_classes[$i] || !$item_classes[$i][0] || strpos($item_classes[$i][0],'OBSOLETE') !== false  ) 
		{
			continue;
		}
		echo "<td valign='top'>";
		echo "<div onmouseover=\"g_showIfExists('sub_class_menu_".$i."')\" onmouseout=\"hideIfExists('sub_class_menu_".$i."')\">";
		echo "<a href='?items=".$i."'>".$item_classes[$i][0]."</a>";
		
		$tmp = "";
		if( count($item_classes[$i][1]) > 1 ) 
		{
			if( $i == 2 ) {
				$tmp .= "
				<div class='sc_menu_gh'>One-Handed</div>
				<a style='white-space:nowrap;' href='?items=2.".(1<<0)."'>".$item_classes[2][1][0]."</a><br/>
				<a style='white-space:nowrap;' href='?items=2.".(1<<4)."'>".$item_classes[2][1][4]."</a><br/>
				<a style='white-space:nowrap;' href='?items=2.".(1<<7)."'>".$item_classes[2][1][7]."</a><br/>
				<a style='white-space:nowrap;' href='?items=2.".(1<<13)."'>".$item_classes[2][1][13]."</a><br/>
				<a style='white-space:nowrap;' href='?items=2.".(1<<15)."'>".$item_classes[2][1][15]."</a><br/>
				<div class='sc_menu_gh'>Two-Handed</div>
				<a style='white-space:nowrap;' href='?items=2.".(1<<1)."'>".$item_classes[2][1][1]."</a><br/>
				<a style='white-space:nowrap;' href='?items=2.".(1<<5)."'>".$item_classes[2][1][5]."</a><br/>
				<a style='white-space:nowrap;' href='?items=2.".(1<<8)."'>".$item_classes[2][1][8]."</a><br/>
				<a style='white-space:nowrap;' href='?items=2.".(1<<6)."'>".$item_classes[2][1][6]."</a><br/>
				<a style='white-space:nowrap;' href='?items=2.".(1<<10)."'>".$item_classes[2][1][10]."</a><br/>
				<div class='sc_menu_gh'>Ranged</div>
				<a style='white-space:nowrap;' href='?items=2.".(1<<2)."'>".$item_classes[2][1][2]."</a><br/>
				<a style='white-space:nowrap;' href='?items=2.".(1<<3)."'>".$item_classes[2][1][3]."</a><br/>
				<a style='white-space:nowrap;' href='?items=2.".(1<<16)."'>".$item_classes[2][1][16]."</a><br/>
				<a style='white-space:nowrap;' href='?items=2.".(1<<18)."'>".$item_classes[2][1][18]."</a><br/>
				<a style='white-space:nowrap;' href='?items=2.".(1<<19)."'>".$item_classes[2][1][19]."</a><br/>
				<div class='sc_menu_gh'>Other</div>
				<a style='white-space:nowrap;' href='?items=2.".(1<<14)."'>".$item_classes[2][1][14]."</a><br/>
				<a style='white-space:nowrap;' href='?items=2.".(1<<20)."'>".$item_classes[2][1][20]."</a><br/>
				";
			}
			else if( $i == 4 ) {
				$tmp .= "
				<a style='white-space:nowrap;' href='?items=4.2'>".$item_classes[4][1][1]."</a><br/>
				<a style='white-space:nowrap;' href='?items=4.4'>".$item_classes[4][1][2]."</a><br/>
				<a style='white-space:nowrap;' href='?items=4.8'>".$item_classes[4][1][3]."</a><br/>
				<a style='white-space:nowrap;' href='?items=4.16'>".$item_classes[4][1][4]."</a><br/>
				<a style='white-space:nowrap;' href='?items=4.64'>".$item_classes[4][1][6]."</a><br/>
				<div class='sc_menu_gh'>Miscellaneous</div>
				<a style='white-space:nowrap;' href='?items=4.1&a=slot.eq.2;'>".$locale['a_slot'][2]."</a><br/>
				<a style='white-space:nowrap;' href='?items=4.1&a=slot.eq.11;'>".$locale['a_slot'][11]."</a><br/>
				<a style='white-space:nowrap;' href='?items=4.1&a=slot.eq.12;'>".$locale['a_slot'][12]."</a><br/>
				<a style='white-space:nowrap;' href='?items=4.1&a=slot.eq.19;'>".$locale['a_slot'][19]."</a><br/>
				<a style='white-space:nowrap;' href='?items=4.1&a=slot.eq.23;'>".$locale['a_slot'][23]."</a><br/>
				<div class='sc_menu_gh'>Relics</div>
				<a style='white-space:nowrap;' href='?items=4.128'>".$item_classes[4][1][7]."</a><br/>
				<a style='white-space:nowrap;' href='?items=4.256'>".$item_classes[4][1][8]."</a><br/>
				<a style='white-space:nowrap;' href='?items=4.512'>".$item_classes[4][1][9]."</a><br/>
				<a style='white-space:nowrap;' href='?items=4.1024'>".$item_classes[4][1][10]."</a><br/>
				<a style='white-space:nowrap;' href='?items=4.2048'>".$item_classes[4][1][11]."</a><br/>
				";
			}
			else	
			{
				for( $j = 0; $j < count($item_classes[$i][1]); $j++ ) 
				{
					if( !$item_classes[$i][1][$j] || strpos($item_classes[$i][1][$j],'OBSOLETE') !== false ) 
					{
						continue;
					}
					$tmp .= "<a style='white-space:nowrap;' href='?items=".$i.".".(1<<$j)."'>".$item_classes[$i][1][$j]."</a><br/>";
				}
			}
			if( $tmp ) {
				echo "<div style='position: relative; top: 0px; left: 0px;'>".
						"<div class='sc_menu' id='sub_class_menu_".$i."'>".$tmp."</div>".
					"</div>";
			}
			echo "</div></td>";
		}
	}
	echo "</tr></table>";
	$g_content = "<div id='items_parent'></div";
?>