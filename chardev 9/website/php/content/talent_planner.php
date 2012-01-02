<link href="talent_sheet.css" rel="stylesheet" />
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
		var talentsGui = null;
		var character = null;
		if(g_serialized) {
			talents = new Talents(2,g_serialized,false);
			talentsGui = new TalentsGui();
			character = new Character();
			
			new TalentsAdapter( talents, talentsGui, character );
			
			DOM.set(document.getElementById('talent_parent'),talentsGui.node);
		}
	}
</script>

<?php 

	$g_content = "<div class='content_wrapper'><div class='content_header'>Talent Planner</div><div id='talent_parent'><div class='loading'>Loading...</div></div></div>";

?>