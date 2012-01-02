<!-- css -->
<link href="tooltip.css" rel="stylesheet" />
<link href="list.css" rel="stylesheet" />
<link href="character_sheet.css" rel="stylesheet" />
<link href="talent_sheet.css" rel="stylesheet" />
<?php

	$profile_id = isset($_GET['profile']) ? (int)$_GET['profile'] : 0;
	$profile = null;
	if( $profile_id > 0 ) {
		$profile = ( $profile_id > 0 ? get_profile($profile_id) : null );
	}
	else {
		if( isset($_GET['cn']) && isset($_GET['region']) && isset($_GET['server'])) {
			$region = ARMORY_IMPORT_REGION_US;
			
			switch( $_GET['region'] ) {
				case 'eu':
					break;
			}
			
			if( $_GET['region'] == "eu" ) {
				$region = ARMORY_IMPORT_REGION_EU;
			}
			else if( $_GET['region'] == "kr" ) {
				$region = ARMORY_IMPORT_REGION_KR;
			} 
			else if( $_GET['region'] == "tw" ) {
				$region = ARMORY_IMPORT_REGION_TW;
			}
			else if( $_GET['region'] == "cn" ) {
				$region = ARMORY_IMPORT_REGION_CN;
			}
			$profile = get_battlenet_profile( $region, $_GET['server'], $_GET['cn'], $error);
			
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
	g_settings.isPlanner=true;
/* ]]> */
</script>";

	$g_content = "<div id='planner_parent'></div>";
?>