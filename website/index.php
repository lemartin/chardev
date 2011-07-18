<?php 
	$g_content = "";

	include_once './php/filter.php'; // has to be first
	filter_redirect();
	//
	include_once './php/db.php';
	include_once './php/common.php';
	
	include_once './php/session.php';
	include_once './php/language.php';
	
	$build_number = "8.1b"; $build = file_get_contents('.build');
	
	define("PAGE_HOME",0);
	define("PAGE_PLANNER",1);
	define("PAGE_LOGIN",2);
	define("PAGE_LOGOUT",3);
	define("PAGE_SPELL",4);
	define("PAGE_ITEM",5);
	define("PAGE_SPELLS",6);
	define("PAGE_ITEMS",7);
	define("PAGE_TALENTS",8);
	define("PAGE_FORUM",9);
	define("PAGE_REGISTER",10);
	define("PAGE_DONATE",11);
	define("PAGE_RECOVER_PASSWORD",12);
	define("PAGE_BASE_STATS",13);
	define("PAGE_PLANNER_START",14);
?>
<?xml version="1.0" encoding="utf-8" ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link rel="icon" href="images/site/favico.png" type="image/png" />
<title>chardev 8 - WoW Cataclysm</title>
<!-- stylesheets -->
<?php 
echo '
<link href="chardev8.css?".$build."" rel="stylesheet" />
<link href="tooltip.css?".$build."" rel="stylesheet" />
';
?>
<!-- extern -->
<script src="js/extern/md5.js" type="text/javascript" language="javascript"></script>
<script src="js/extern/json2.js" type="text/javascript" language="javascript"></script>
<!-- optimised js -->
<script type="text/javascript" language="javascript">
	var g_settings = {
		character : null,
		language : 'en',
		profileId : 0,
		sessionId : '',
		userId : 0,
		isPlanner : false
	};
	function g_onLoad() {
		__chardev_init();
		__engine_init(g_settings);
		__tooltip_init();
		__jobmanager_init();
		
		if( window['CHARDEV_CORE_BUILD'] ) {
			document.getElementById('chardev_core_version').innerHTML = window['CHARDEV_CORE_BUILD'];
		}
	};
</script>
<?php 
	$page = PAGE_HOME;
	$show_ads = isset($_SESSION['donated']) && $_SESSION['donated'] ? false : true;
	//&& $_SERVER['HTTP_HOST']!="127.0.0.1" && $_SERVER['HTTP_HOST']!="192.168.178.100" && $_SERVER['HTTP_HOST']!="192.168.178.22";
	//
	//	PHP generated JS
	//
	echo "
<script type='text/javascript' language='javascript'>
/* <![CDATA[ */
	g_settings.sessionId = '".($loggedIn?session_id():-1)."';
	g_settings.userId = ".($loggedIn?$_SESSION['user_id']:-1).";
	g_settings.language = '".$g_lang_to_str[$g_language]."';
	g_settings.debug = ".(isset($_GET['debug'])?"true":"false").";
	var locale = ".json_encode($locale).";
/* ]]> */
</script>";

if( isset($_GET['debug'])) {
	include 'php/js_files.php';
	for( $i = 0; $i<count($js_files); $i++ ) {
		echo "<script src='".$js_files[$i][0].$js_files[$i][1]."?".$build."' type='text/javascript' language='javascript'></script>\n"; 
	}
}
else {
	echo "<script src='js/all_optimised.js?".$build."' type='text/javascript' language='javascript'></script>"; 
}
	//
	//	Content includes
	//
	if( isset($_GET['spell']) ) {
		include './php/content/spell.php';
		$page = PAGE_SPELL;
	}
	else if( isset($_GET['spells']) ) {
		include './php/content/spells.php';
		$page = PAGE_SPELLS;
	}
	else if( isset($_GET['item']) ) {
		include './php/content/item.php';
		$page = PAGE_ITEM;
	}
	else if( isset($_GET['items']) ) {
		include './php/content/items.php';
		$page = PAGE_ITEMS;
	}
	else if( isset($_GET['planner']) || isset($_GET['profile']) || isset($_GET['c']) ) {
		include './php/content/planner.php';
		$page = PAGE_PLANNER;
	}
	else if( isset($_GET['talents']) || isset($_GET['t']) ) {
		include './php/content/talent_planner.php';
		$page = PAGE_TALENTS;
	}
	else if(isset($_GET['forum']) || isset($_GET['topic'])){
		include './php/content/forum.php';
		$page = PAGE_FORUM;
	}
	else if(isset($_GET['register'])){
		include './php/content/register.php';
		$page = PAGE_REGISTER;
	}
	else if(isset($_GET['resend_mail'])){
		include './php/content/resend_mail.php';
		$page = PAGE_REGISTER;
	}
	else if(isset($_GET['login'])){
		include './php/content/login.php';
		$page = PAGE_LOGIN;
	}
	else if(isset($_GET['donate'])){
		include './php/content/donate.php';
		$page = PAGE_DONATE;
	}
	else if(isset($_GET['recover_password'])){
		include './php/content/recover_password.php';
		$page = PAGE_RECOVER_PASSWORD;
	}
	
	else if(isset($_GET['base_stats'])){
		include './php/content/base_stats.php';
		$page = PAGE_BASE_STATS;
	}
	else if(isset($_GET['start'])) {
		include './php/content/planner_start.php';
		$page = PAGE_PLANNER_START;
	}
	else {
		include './php/content/home.php';
		$page = PAGE_HOME;
	}
?>
</head>
<body onload="g_onLoad();">
	<div id="c_wra">
		<div class="tt_overlay_w" id="tt_overlay_w"><div class="tt_overlay" id="tt_overlay"></div></div>
		<div class="ix_wrapper">
			<div class="ix_left">
				<div class="ix_logo">
					<div class='ix_language'>
						<div class="ix_lang_info">Select a language:</div>
						<div>
							<a href="http://en.chardev.org<?php echo'?'.htmlspecialchars($_SERVER['QUERY_STRING'])?>" onmouseover="if(this.firstChild.src!='images/flags/gubs.png') this.firstChild.src='images/flags/gubs.png'"<?php 			echo($g_language!=0?" onmouseout=\"this.firstChild.src='images/flags/g/gubs.png'\"":"")?>><img src="images/flags/<?php 	echo($g_language!=0?'g/':'')?>gubs.png" width="25" alt="gb/us" /></a>
							<a href="http://fr.chardev.org<?php echo'?'.htmlspecialchars($_SERVER['QUERY_STRING'])?>"	onmouseover="if(this.firstChild.src!='images/flags/france.png') this.firstChild.src='images/flags/france.png'"<?php 	echo($g_language!=2?" onmouseout=\"this.firstChild.src='images/flags/g/france.png'\"":"")?>><img src="images/flags/<?php 	echo($g_language!=2?'g/':'')?>france.png" width="25" alt="fr" /></a>
							<a href="http://de.chardev.org<?php echo'?'.htmlspecialchars($_SERVER['QUERY_STRING'])?>"	onmouseover="if(this.firstChild.src!='images/flags/germany.png') this.firstChild.src='images/flags/germany.png'"<?php 	echo($g_language!=3?" onmouseout=\"this.firstChild.src='images/flags/g/germany.png'\"":"")?>><img src="images/flags/<?php 	echo($g_language!=3?'g/':'')?>germany.png" width="25" alt="de" /></a>
							<a href="http://es.chardev.org<?php echo'?'.htmlspecialchars($_SERVER['QUERY_STRING'])?>"	onmouseover="if(this.firstChild.src!='images/flags/spain.png') this.firstChild.src='images/flags/spain.png'"<?php 		echo($g_language!=6?" onmouseout=\"this.firstChild.src='images/flags/g/spain.png'\"":"")?>><img src="images/flags/<?php 	echo($g_language!=6?'g/':'')?>spain.png" width="25" alt="es" /></a>
							<a href="http://ru.chardev.org<?php echo'?'.htmlspecialchars($_SERVER['QUERY_STRING'])?>"	onmouseover="if(this.firstChild.src!='images/flags/russia.png') this.firstChild.src='images/flags/russia.png'"<?php 	echo($g_language!=8?" onmouseout=\"this.firstChild.src='images/flags/g/russia.png'\"":"")?>><img src="images/flags/<?php 	echo($g_language!=8?'g/':'')?>russia.png" width="25" alt="ru" /></a>
						</div>
					</div>
					<div class='ix_register'>
						<div id='register_logged_in' <?php echo $loggedIn ? '' : ' style="display:none;"' ?>>
							<span style='font-size:10px'>You are logged in as:</span><br/>
							<span style='font-size:14px; font-weight:bold'>
								<a href='?account' class='link' id='register_user_name'><?php echo $_SESSION['user_name']; ?></a>
							</span>
						</div>
						<div id='register_logged_out'  <?php echo $loggedIn ? ' style="display:none;"' : '' ?>>
							<span style='font-size:10px'>You are not logged in,<br/>
							<a href='?register' class='ix_reg_link'>register</a> now!</span>
						</div>
					</div>	
				</div>
				<div id="mm_w" class="mm_w">
					<div class="mm_c">
						<table id="main_menu" cellpadding="0" cellspacing="0">
							<tr>
								<!--  onmouseover="this.parentNode.className='link_main_menu_parent_hover'" onmouseout="this.parentNode.className=''"  -->
								<td valign="bottom"><a class="link_main_menu<?php echo ($page==PAGE_HOME?"_active":"")?>" href="?home"><?php echo $locale['Home']?></a></td>
								<td valign="bottom"><a class="link_main_menu<?php echo ($page==PAGE_PLANNER||$page==PAGE_PLANNER_START?"_active":"")?>" href="?planner"><?php echo $locale['CharacterPlanner']?></a></td>
								<!--
								<td valign="bottom">
									<div class="talent_menu_parent">
										<a href="?t" class="link_main_menu<?php echo ($page==2?"_active":"")?>"><?php echo $locale['TalentPlanner']?></a>
										<div class="link_hover_div">
											<a href="?t">character</a>
											<br/>
											<a href="?p">pet</a>
										</div>
									</div>
								</td>
								-->
								<td valign="bottom"><a class="link_main_menu<?php echo ($page==PAGE_FORUM?"_active":"")?>" href="?forum"><?php echo $locale['Forum']?></a></td>
								<td valign="bottom"><a class="link_main_menu<?php echo ($page==PAGE_DONATE?"_active":"")?>" href="?donate"><?php echo $locale['Donate']?></a></td>
								<td valign="bottom"><a class="link_main_menu" href="https://github.com/chardev">source</a></td>
								<!--
								<td valign="bottom"><a class="link_main_menu<?php echo ($page==PAGE_CACHE_UPLOAD?"_active":"")?>" href="?cache"><?php echo $locale['CacheUpload']?></a></td>
								<td valign="bottom"><a class="link_main_menu<?php echo ($page==PAGE_LOGIN||$page==PAGE_LOGOUT?"_active":"")?>" href="?login"><?php echo ($loggedIn?$locale['Logout']:$locale['Login'])?></a></td>
								-->
								</tr>
						</table>
					</div>
				</div>
				<div class='clear_both'></div>
				<div class="content_r" style="background: url(images/site/c_bg_r.jpg) 0px 577px repeat-y;">
					<div class="content_m"  style="background: url(images/site/c_bg_m.jpg) 0px 60px no-repeat;">
						<div class="content_t"  style="background: url(images/site/c_bg_t.jpg) 0px 0px no-repeat;">
							<div class="content_b"  style="background: url(images/site/c_bg_b.jpg) left bottom no-repeat;">		
								<div class="content">
									<div id="mtf_p" class="mtf_p2"></div>
									<div id="content"><?php if(isset($g_content)) echo $g_content; ?></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<?php 
				if( $show_ads) {
					echo "
						<div id='advertisement_h' class='ix_ad_h'>
							<script type='text/javascript'><!--
							google_ad_client = 'pub-7339088166028367';
							google_ad_slot = '8748092503';
							google_ad_width = 728;
							google_ad_height = 90;
							//-->
							</script>
							<script type='text/javascript'
							src='http://pagead2.googlesyndication.com/pagead/show_ads.js'>
							</script>
						</div>";
				}
				?>
				<div class='ix_bottom_link_bar'>
					<a class='ix_bottom_link' href='/chardev7/?character'>[Pre 4.0.1 Character Planner]</a>
					<a class='ix_bottom_link' href='?base_stats'>[Base Stats]</a>
				</div>
				<div class="ix_copy">&copy; 2007-2011 chardev.org - Design and Code by Martin 'LeMartin' Wa&szlig;mann - Build: <?php echo $build_number ?><span id='chardev_core_version'></span></div>
				<div class="ix_disclaimer">World of Warcraft and Blizzard Entertainment are trademarks or registered trademarks of Blizzard Entertainment in the U.S. and/or other countries.</div>
			</div>
			<div class="ix_right">
				<div class='ix_login'>
					<?php
						if( $page != PAGE_LOGIN && $page != PAGE_LOGOUT )
						{
							include './php/content/user.php';
						}
					?>
				</div>
				<?php 
					if( $show_ads ) {
						echo '
						<div id="advertisement_v" class="ix_ad_v">
<script type="text/javascript"><!--
google_ad_client = "ca-pub-7339088166028367";
/* 160x600, Erstellt 01.12.10 */
google_ad_slot = "9407904006";
google_ad_width = 160;
google_ad_height = 600;
//-->
</script>
<script type="text/javascript"
src="http://pagead2.googlesyndication.com/pagead/show_ads.js">
</script>
</div>						';
					}
				?>
			</div>
		</div>
		<div class="clear_both"></div>
		<div id='error_console'></div>		
	<!-- Google Analytics -->
		<script type="text/javascript">
			var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
			document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
			</script>
			<script type="text/javascript">
			var pageTracker = _gat._getTracker("UA-5069604-2");
			pageTracker._initData();
			pageTracker._trackPageview();
		</script>
	</div>
</body>
</html>