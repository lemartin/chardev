<!-- data -->
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
	function g_onLoad() {
		
		g_addItemTooltipTo(g_serialized, 'item_parent', 'item_icon');
	}
</script>

<?php 

	$g_content = "
<div class='dbi_w'>
<div class='dbi_header'>
	<div class='dbi_title'>
		Item Database
	</div>
	<div class='dbi_search_c'>
		<form action='?items' method='POST'>
			<input class='input' name='name'/>
		</form>
	</div>
	<div class='dbi_search_c'>
		<span class='dbi_search_label'>Search</span>
	</div>
	<div style='clear: both;'></div>
</div>
<table class='dbi_p'>
	<tr>
		<td valign='top' id='item_icon'></td>
		<td valign='top'>
			<div id='item_parent'></div>
		</td>
		<td valign='top' id='item_scaling'></td>
	</tr>
</table>
</div>";

?>