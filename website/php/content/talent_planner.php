<!-- css -->
<link href="talent_sheet.css" rel="stylesheet" />
<link href="tooltip.css" rel="stylesheet" />
<!-- gui lib -->
<script src="js/gui_lib/LayeredDiv.js" type="text/javascript"></script>
<script src="js/gui_lib/StaticGrid.js" type="text/javascript"></script>
<script src="js/gui_lib/StackedDiv.js" type="text/javascript"></script>
<!-- chardev lib 8.0 -->
<script src="js/chardev_lib/Tools.js" type="text/javascript"></script>
<script src="js/chardev_lib/Listener.js" type="text/javascript"></script>
<script src="js/chardev_lib/Engine.js" type="text/javascript"></script>
<script src="js/chardev_lib/Tooltip.js" type="text/javascript"></script>
<script src="js/chardev_lib/Spell.js" type="text/javascript"></script>
<script src="js/chardev_lib/Talent.js" type="text/javascript"></script>
<script src="js/chardev_lib/Talents.js" type="text/javascript"></script>
<script src="js/chardev_lib/gui/TalentIcon.js" type="text/javascript"></script>
<!-- data -->
<script type="text/javascript">
	var g_serialized = null;
</script>
<?php
	echo "
<script type=\"text/javascript\">
	g_serialized = ".json_encode(get_talents(2)).";
	g_spellScaling=".json_encode(get_gt_spell_scaling()).";
</script>"; 
?>
<script type="text/javascript">
	function g_onLoad() {
		var talents = null;
		if(g_serialized) {
			talents = new Talents(2,g_serialized,false);
			Tools.setChild(document.getElementById('talent_parent'),talents.getNode());
			talents.update();
		}
	}
</script>

<?php 

	$g_content = "
	".$template_forum_bg_t."
	<table style='width:750px'>
		<tr>
			<td>
				<div id='talent_parent'><h3 style='text-align:center'>Loading...</h3></div>
			</td>
		</tr>
	</table>
	".$template_forum_bg_b;

?>