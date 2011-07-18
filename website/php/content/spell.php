<!-- css -->
<link href="tooltip.css" rel="stylesheet" />
<!-- chardev lib 8.0 -->
<script src="js/chardev_lib/Tools.js" type="text/javascript"></script>
<script src="js/chardev_lib/Listener.js" type="text/javascript"></script>
<script src="js/Engine.js" type="text/javascript"></script>
<script src="js/chardev_lib/Tooltip.js" type="text/javascript"></script>
<script src="js/chardev_lib/Spell.js" type="text/javascript"></script>
<!-- datas -->
<script type="text/javascript">
	var g_serialized = null;
</script>
<?php
	echo "
<script type=\"text/javascript\">
	g_serialized = ".json_encode(get_spell((int)$_GET['spell'])).";
	g_spellScaling=".json_encode(get_gt_spell_scaling()).";
</script>"; 
?>
<script type="text/javascript">
	var g_spell = null;
	var g_levelSelect;
	var g_tooltipNode;
	function g_onLoad() {
		var iconNode = document.getElementById('spell_icon');
		var img;
		var maxWidth = 350;
		if(g_serialized) {
			g_spell = new Spell(g_serialized);
			g_tooltipNode = document.getElementById('spell_parent');
			g_tooltipNode.innerHTML = g_spell.getTooltip();
			g_tooltipNode.style.width = g_tooltipNode.firstChild.offsetWidth + "px";
			if( g_tooltipNode.offsetWidth > maxWidth )
			{
				g_tooltipNode.style.whiteSpace = "normal";
				g_tooltipNode.style.width = maxWidth+"px";
				if( g_tooltipNode.firstChild.offsetWidth > maxWidth )
				{
					g_tooltipNode.style.width = g_tooltipNode.firstChild.offsetWidth + "px";
				}
			}
			img = document.createElement('img');
			img.className = 'spell_icon';
			img.src = 'images/icons/large/' + g_spell._icon + '.png';
			iconNode.appendChild(img);
			if( g_spell._scalableDescription ) {
				g_levelSelect = document.createElement('select');
				for( var i = 0; i < 85; i++ ) {
					var tmp = document.createElement('option');
					tmp.appendChild(document.createTextNode(i+1));
					g_levelSelect.appendChild(tmp);
				}
				g_levelSelect.selectedIndex = 84;
				Listener.add(g_levelSelect, 'change', g_setLevel, window, []);
				document.getElementById('spell_scaling').appendChild(g_levelSelect);
			}
		}
	}

	function g_setLevel(opt) {
		if( g_levelSelect.selectedIndex != -1 ) {
			g_spell.setLevel( g_levelSelect.selectedIndex + 1 );
			g_tooltipNode.innerHTML = g_spell.getTooltip();
		}
	}
</script>

<?php 

	$g_content = "
<table class='align_center'>
	<tr>
		<td valign='top' id='spell_icon'></td>
		<td valign='top'>
			<div class='tooltip_content' id='spell_parent'></div>
		</td>
		<td valign='top' id='spell_scaling'></td>
	</tr>
</table>";

?>