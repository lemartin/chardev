<!-- css -->
<link href="character_sheet.css?<?php echo $build; ?>" rel="stylesheet" />
<link href="talent_sheet.css?<?php echo $build; ?>" rel="stylesheet" />
<?php
	$profileLoadError = null;
	$profile_id = isset($_GET['profile']) ? (int)$_GET['profile'] : 0;
	$profile = null;
	$profileUser = 0;
	if( $profile_id > 0 ) {
		$tmp = ( $profile_id > 0 ? get_profile($profile_id) : null );
		$profile = $tmp["character"];
		$profileUser = $tmp["user_id"];
	}
	else {
		
		if( isset($_GET['name']) && isset($_GET['region']) && isset($_GET['realm'])) {

			
			$profile = get_battlenet_profile( $_GET['region'], $_GET['realm'], $_GET['name'], $profileLoadError);
		}
	}

	echo "
<script type=\"text/javascript\">
/* <![CDATA[ */
	g_settings.profileId=".(int)$profile_id.";
	g_settings.profileUserId=".(int)$profileUser."
	g_settings.character=".json_encode($profile).";
	g_settings.profileLoadError=".json_encode($profileLoadError ? $profileLoadError : null).";
	g_settings.isPlanner=true;
/* ]]> */
</script>";

	$g_content = "<div id='planner_parent'></div>";
?>