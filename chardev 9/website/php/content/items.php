<!-- css -->
<link href="list.css" rel="stylesheet" />
<!-- data -->
<script type="text/javascript">
	var g_serialized = null;
	var g_argString = "";
	var g_page = 0;
</script>

<?php

$il_show = false;

if( isset($_GET['items']) && $_GET['items'] ) {
	
	//
	// replace '_' by ';'
	$args = str_replace( '_', ';', $_GET['items']);
	$order = isset($_GET['o']) ? str_replace( '_', ';', $_GET['o']) : "";
	$page = isset($_GET['p']) ? (int) $_GET['p'] : 1;
	
	echo "
<script type=\"text/javascript\">
	g_serialized = ". json_encode(get_items( 
		$args,
		"",
		$order,
		$page,
		null 
	)).";
	g_page = ".$page.";
	g_argString = ".json_encode($args).";
</script>"; 

	$il_show = true;
}

?>

<script type="text/javascript">
	function g_onLoad() {
	
		g_staticItemList(g_serialized, g_page, g_argString, 'list_parent');
		document.getElementById('dbi_search').focus();
	}
</script>

<?php

$search_form = "
		<form onsubmit='document.getElementById(\"dbi_submit\").value = \"name.wlike.\" + g_removeDots(document.getElementById(\"dbi_search\").value) + \"_\";' action='?' method='GET'>
			<input class='input" .( $il_show ? "" : " dbi_search_input_large" ) . "' id='dbi_search' />
			<input type='hidden' name='items' id='dbi_submit' />
		</form>";

if( $il_show ) {
	$g_content = "
<div class='dbi_w'>
<div class='dbi_header'>
	<div class='dbi_title'>
		Item Database
	</div>
	<div class='dbi_search_c'>{$search_form}
	</div>
	<div class='dbi_search_c'>
		<span class='dbi_search_label'>Search</span>
	</div>
	<div style='clear: both;'></div>
</div>
<div id='list_parent'>
</div>
</div>";
}
else {

	$g_content = "
<div class='dbi_w'>
<div class='dbi_search_label_large'>Search the Item Database</div>
<div class='dbi_search_large'>".$search_form."</div>
</div>";

}
?>