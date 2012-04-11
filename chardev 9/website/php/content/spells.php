<!-- css -->
<link href="list.css" rel="stylesheet" />
<!-- data -->
<script type="text/javascript">
	var g_serialized = null;
	var g_argString = "";
</script>

<?php

$il_show = false;

if( isset($_GET['spells']) && $_GET['spells'] ) {
	
	//
	// replace '_' by ';'
	$args = str_replace( '_', ';', $_GET['spells']);
	$order = isset($_GET['o']) ? str_replace( '_', ';', $_GET['o']) : "";
	$page = isset($_GET['p']) ? (int) $_GET['p'] : 1;
	
	echo "
<script type=\"text/javascript\">
	g_serialized = ". json_encode(get_spells( 
		$args,
		"",
		$order,
		$page
	)).";
	g_page = ".$page.";
	g_argString = ".json_encode($args).";
</script>"; 

	$il_show = true;
}

?>

<script type="text/javascript">
	var g_item = null;
	var tt = new TooltipImpl();
	function g_onLoad() {
	
		if( g_serialized ) {
		
			var il = new SpellList();
			
			//il.showStaticLinks(true);
			
			il.setData( g_serialized );
			
			if( g_argString ) {
			
				il.set(g_argString, "", "", g_page);
				
				il.gui.showFilter( true );
			}
			
			document.getElementById('list_parent').appendChild(il.gui.node);
			
			var ilHandler = new Handler(function( e ){
				if( e.is('show_tooltip') ) {
					g_showSpellTooltip( e.get('entity').id );
				}
				else if( e.is('move_tooltip') ) {
					g_moveTooltip();
				}
				else if( e.is('hide_tooltip') ) {
					g_hideTooltip();
				}
				else if( e.is('update') ) {
					new ListBackEndProxy("php/interface/get_spells.php").update(il);
				}
			}, this);
			
			var ilObserver = new GenericObserver([
				'show_tooltip',
				'move_tooltip',
				'hide_tooltip',
				'update',
			], ilHandler);
			
			il.addObserver(ilObserver);
		}
	}
</script>

<?php

$search_form = "
		<form onsubmit='document.getElementById(\"dbi_submit\").value = \"name.wlike.\" + Tools.removeDots(document.getElementById(\"dbi_search\").value) + \"_\";' action='?' method='GET'>
			<input class='input" .( $il_show ? "" : " dbi_search_input_large" ) . "' id='dbi_search' />
			<input type='hidden' name='spells' id='dbi_submit' />
		</form>";

if( $il_show ) {
	$g_content = "
<div class='dbi_w'>
<div class='dbi_header'>
	<div class='dbi_title'>
		Spell Database
	</div>
	<div class='dbi_search_c'>
		".$search_form."
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
<div class='dbi_search_label_large'>Search the Spell Database</div>
<div class='dbi_search_large'>".$search_form."</div>
</div>";

}
?>