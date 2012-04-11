<!-- css -->
<link href="list.css" rel="stylesheet" />
<!-- data -->
<script type="text/javascript">
	var g_serialized = null;
	var g_argString = "";
</script>

<?php

	//
	// replace '_' by ';'
	$args = isset($_GET['profiles']) && $_GET['profiles'] ? str_replace( '_', ';', $_GET['profiles']) : "ismine.eq.1;";
	$order = isset($_GET['o']) ? str_replace( '_', ';', $_GET['o']) : "";
	$page = isset($_GET['p']) ? (int) $_GET['p'] : 1;
	
	echo "
<script type=\"text/javascript\">
	g_serialized = ". json_encode(get_profiles( 
		$args,
		"",
		$order,
		$page
	)).";
	g_page = ".$page.";
	g_argString = ".json_encode($args).";
</script>"; 


?>

<script type="text/javascript">
	var tt = new TooltipImpl();
	function g_onLoad() {
			
		var il = new ProfileList();
				
		il.setData( g_serialized );
		
		if( g_argString ) {
		
			il.set(g_argString, "", "", g_page);
			
			il.gui.showFilter( true );
		}
		
		DOM.append('list_parent', il.gui.node);
		
		var ilHandler = new Handler(function( e ){
			if( e.is('show_tooltip') ) {
				//g_showItemTooltip( e.get('entity').id );
			}
			else if( e.is('move_tooltip') ) {
				//g_moveTooltip();
			}
			else if( e.is('hide_tooltip') ) {
				//g_hideTooltip();
			}
			else if( e.is('update') ) {
				window.location.search = TextIO.queryString({ 
					'profiles': il.getArgumentString().replace(/\;/g,"_"), 
					'p': il.page, 
					'o': il.order+"."+(il.orderDirection==List.ORDER_ASC?'asc':'desc')+"_" });
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
</script>

<?php

	$g_content = "
<div class='dbi_w'>
	<div id='list_parent'>
	</div>
</div>";

?>