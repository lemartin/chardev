<!-- css -->
<link href="tooltip.css" rel="stylesheet" />
<!-- chardev lib 8.0 -->
<script src="js/chardev_lib/Tools.js" type="text/javascript"></script>
<script src="js/chardev_lib/Listener.js" type="text/javascript"></script>
<script src="js/Engine.js" type="text/javascript"></script>
<script src="js/chardev_lib/Tooltip.js" type="text/javascript"></script>
<script src="js/chardev_lib/Spell.js" type="text/javascript"></script>
<script src="js/chardev_lib/ItemSet.js" type="text/javascript"></script>
<script src="js/chardev_lib/Item.js" type="text/javascript"></script>
<script src="js/chardev_lib/SpellItemEnchantment.js" type="text/javascript"></script>
<!-- datas -->
<script type="text/javascript">
	var g_serialized = null;
</script>
<?php
	echo "
<script type=\"text/javascript\">
	g_serialized = ".json_encode(get_item((int)$_GET['item'])).";
	g_spellScaling=".json_encode(get_gt_spell_scaling()).";
</script>"; 
?>
<script type="text/javascript">
	var g_item = null;
	var g_tooltipNode;
	function g_onLoad() {
		var iconNode = document.getElementById('item_icon');
		var img;
		if(g_serialized) {
			g_item = new Item(g_serialized);
			g_tooltipNode = document.getElementById('item_parent');
			g_tooltipNode.innerHTML = g_item.getTooltip();
			
			Tooltip.fixSize(g_tooltipNode);
			
			img = document.createElement('img');
			img.className = 'spell_icon';
			img.src = 'images/icons/large/' + g_item._icon + '.png';
			iconNode.appendChild(img);

		}
	}
</script>

<?php 

	$g_content = "
<table class='align_center'>
	<tr>
		<td valign='top' id='item_icon'></td>
		<td valign='top'>
			<div class='tooltip_content' id='item_parent'></div>
		</td>
		<td valign='top' id='item_scaling'></td>
	</tr>
</table>";

?>