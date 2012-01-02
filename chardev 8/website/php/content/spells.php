<!-- css -->
<link href="tooltip.css" rel="stylesheet" />
<!-- chardev lib 8.0 -->
<script src="js/chardev_lib/Globals.js" type="text/javascript"></script>
<script src="js/chardev_lib/Tools.js" type="text/javascript"></script>
<script src="js/chardev_lib/Listener.js" type="text/javascript"></script>
<script src="js/chardev_lib/Engine.js" type="text/javascript"></script>
<script src="js/chardev_lib/Tooltip.js" type="text/javascript"></script>
<script src="js/chardev_lib/Spell.js" type="text/javascript"></script>

<script src="js/chardev_lib/gui/SpellList.js" type="text/javascript"></script>
<!-- datas -->
<script type="text/javascript">
	var g_serialized = null;
</script>
<?php
	$spells = get_spells($_GET['arguments'],$_GET['flags'],$_GET['order']);
	echo "
<script type=\"text/javascript\">
	g_serialized = ".json_encode($spells).";
</script>";
?>
<script type="text/javascript">
	var g_spellList = null;
	var g_spellsParent = null;
	function g_onLoad() {
		g_spellList = new SpellList(g_serialized);
		g_spellsParent = document.getElementById('spells_parent');
		g_spellsParent.appendChild(g_spellList._node);
	}
</script>

<?php 

	$g_content = "<div id='spells_parent'></div";

?>