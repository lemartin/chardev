<?php
	require_once 'php/db.php';
	require_once 'php/user_data.php';

	$user_id = 0;
	$category = "";
	
	$g_ui_user_data = null;
	$g_show_profiles = false;
	$g_avatar_pickable = false;
	$g_current_avatar = "";
	
	if( isset($_GET["user"]) ) {
	
		$user_id = (int) $_GET["user"];
	}
	else {
	
		
	}
	
	if( isset($_GET["category"]) ) {
		$category = $_GET["category"];
	}
	
	$g_content = show_user_info( $user_id, $category  );

	function show_user_info( $user_id, $category ) {
	
		
		try { 
			$user = new user_data($user_id);
			$query = "?user=".$user_id;
			
			$categories["User Information"] = "";
			$categories["Profiles"] = "profiles";
			
			if( is_user_you( $user )) {
				$categories["Account Deletion"] = "deletion";
				$GLOBALS["g_avatar_pickable"] = true;
				$GLOBALS["g_current_avatar"] = $user->get_avatar();
			}
			
			$content = "
<div class='ui_wrapper'>
	<div class='ui_left'><div class='ui_avatar_p' id='ui_avatar_parent'>".show_avatar($user)."</div>
		<div class='ui_categories'>
		".show_category_links( $category, $categories, "", $query, "category")."
		</div>
	</div>
	<div class='ui_right'>
		<div class='ui_name'>".$user->get_name()."</div>
		<div class='ui_role'>".(
			$user->is_admin() ? 
				"Admin" : (
					$user->has_donated() ? "Donor" : "User"))."</div>
		".show_category( $category, $user )."
	</div>
	<div style='clear: both'></div>
</div>
			";
			
			return $content;
		}
		catch( Exception $e ) {
			return "<div class='ui_user_not_found'>User not found!</div>";
		}
	}
	
	function show_avatar( user_data $user ) {

		$ret_value = "";
		if( $user->get_avatar() /*&& file_exists('images/icons/large/'.$user['avatar'].'.png')*/ ) {
			$ret_value = "<img class='ui_avatar_img' src='images/icons/large/".$user->get_avatar().".png'' />";
		}
		return $ret_value;
	}
	
	function show_category_links( $current_category, $categories, $default_category, $query_base, $query_key ) {
		$found = false;
		foreach( $categories as $k => $v ) {
			if( strcmp($v, $current_category) === 0 ) {
				$found = true;
				break;
			}
		}
		if( ! $found ) {
			$current_category = $default_category;
		}
		
		$ret_value = "";
		foreach( $categories as $cat_name => $cat_key ) {
			$query = $query_base . ( strcmp($default_category, $cat_key) === 0 ? "" : "&".$query_key."=".$cat_key );
			$ret_value .= "<a href='".$query."' class='ui_cat_link".(strcmp($current_category, $cat_key) === 0 ? "_active" : "" )."'>".$cat_name."</a>";
		}
		
		return $ret_value;
	}
	
	function show_category( $category, user_data $user ) {
		switch( $category ) {
			case "profiles": 
				return show_profiles( $user );
			case "deletion":
				return show_deletion( $user );
			default: 
				return show_default( $user );
		}
	}
	
	function show_profiles( user_data $user ) {
		$GLOBALS["g_show_profiles"] = true;
		return "<div id='ui_profiles_parent' class='ui_profiles_p'><div class='loading'>Loading...</div></div>";;
	}
	function show_deletion( user_data $user ) {
	
		
		if( isset($_GET['action']) && $_GET['action'] === 'delete_me' && isset($_POST['confirm']) ) {
			return "<div class='ui_da_zb'>You are now deleted, please take your receipt!</div>";
		}
	
		$html = "
	<div class='ui_da_w'>
		<div class='ui_da_header'>Account deletion is irreversible!</div>
		
		";
		if( isset($_GET['action']) && $_GET['action'] === 'delete_me' ) {
			$html .= "
		<div class='ui_da_note ui_da_sure'>
			Are you certain, that you want to delete your account permanently?
		</div>
		<div class='ui_da_zb'>Enough with the questions.</div>
		<div class='ui_da_btn_p'>
			<form method='POST' action='?user=".$user->get_id()."&category=deletion&action=delete_me'>
				<input 
					type='submit' 
					class='button button_light ui_da_btn'
					onmouseout='this.className=\"button button_light ui_da_btn\"' 
					onmouseover='this.className=\"button button_light button_light_hover ui_da_btn\"' 
					value='Delete my Account!'
				/>
				<input type='hidden' name='confirm' />
			</form>
		</div>
		";
		}
		else {
			$html .= "	
		<div class='ui_da_note'>
			<div class='ui_da_note_h'>What will be deleted?</div>
			<div class='ui_da_note_c'>
				Deleting your account will remove your personal information permanently from chardevs database. 
				This includes your user name, password, e-mail address and your account settings. Forum posts, comments 
				and profiles won't be deleted, but will be anonymised.
			</div>
		</div>
		<div class='ui_da_btn_p'>
			<form method='POST' action='?user=".$user->get_id()."&category=deletion&action=delete_me'>
				<input 
					type='submit' 
					class='button button_light ui_da_btn'
					onmouseout='this.className=\"button button_light ui_da_btn\"' 
					onmouseover='this.className=\"button button_light button_light_hover ui_da_btn\"' 
					value='Delete my Account'
				/>
			</form>
		</div>
	";
		}
		$html .= "
	</div>
		";
		return $html;
	}
	function show_default( user_data $user ) {
	
		$is_you = false;
		if( is_user_you( $user )) {
			$is_you = true;
		}
		
		$GLOBALS['g_ui_user_data'] = array(
			"ForumSignature" => array(
				"label" => "Forum Signature", 
				"data" => $user->get_forum_signature(),
				"editable" => "input"
			),
			"Region" => array(
				"label" => "Region", 
				"data" => $user->get_region(),
				"editable" => "select",
				"options" => array(
					"us"=>"United States",
					"eu"=>"Europe",
					"kr"=>"Korea",
					"cn"=>"China",
					"tw"=>"Taiwan"
				)
			),
			"Language" => array(
				"label" => "Preferred Language", 
				"data" => $user->get_language(),
				"editable" => "select",
				"options" => array(
					0=>"English",
					2=>"French",
					3=>"German",
					6=>"Spanish",
					8=>"Russian"
				)
			)
		);
		
		if( $is_you ) {
		
			$GLOBALS['g_ui_user_data']["BattleNetProfiles"] = array(
				"label" => "Battle.net Profiles",
				"editable" => "battlenetprofilemanager",
				"data" => $user->get_battlenet_profiles(),
				"realms" => get_realm_lists()
			);
		}
	
		return "<div id='user_information_parent'><div class='loading'>Loading...</div></div>";
	}
	
	function is_user_you ( user_data $user ) {
		return isset($_SESSION['user_id']) && $user->get_id() == $_SESSION['user_id'];
	}
?>
<script type="text/javascript">
	var g_ui_user_data = null;
	var g_ui_user_id;
	var g_ui_show_profiles;
</script>
<?php
	echo "
<script type=\"text/javascript\">
	g_ui_user_data = ".json_encode($GLOBALS['g_ui_user_data'] ).";
	g_ui_user_id = ".(int)$user_id.";
	g_ui_show_profiles = ".json_encode($g_show_profiles).";
	g_avatar_pickable = ".json_encode($g_avatar_pickable).";
	g_current_avatar = ".json_encode($g_current_avatar)."
</script>"; 
?>

<script type="text/javascript">
	function g_onLoad() {
		g_showUserInformation(g_ui_user_id,g_ui_user_data,g_ui_show_profiles);
		if( g_avatar_pickable ) {
			g_createAvatarPicker('ui_avatar_parent',g_current_avatar);
		}
	}
</script> 