
<!-- css -->
<link href="character_sheet.css" rel="stylesheet" />
<link href="talent_sheet.css" rel="stylesheet" />
<?php

	$profile_id = isset($_GET['profile']) ? (int)$_GET['profile'] : 0;
	$profile = null;
	if( $profile_id > 0 ) {
		$profile = ( $profile_id > 0 ? get_profile($profile_id) : null );
	}
	else {
		
		if( isset($_GET['name']) && isset($_GET['region']) && isset($_GET['realm'])) {

			
			$profile = get_battlenet_profile( $_GET['region'], $_GET['realm'], $_GET['name'], $error);
			
			if( $error ) {
				echo $error;
			}
		}
	}

	echo "
<script type=\"text/javascript\">
/* <![CDATA[ */
	g_settings.profileId=".(int)$profile_id.";
	g_settings.character=".json_encode($profile).";
	g_settings.isPlanner=false;
/* ]]> */
</script>";

	$g_content = "<div id='planner_parent'></div>";
?>