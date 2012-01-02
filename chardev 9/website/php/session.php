<?php
	//#################################
	//	session
	//#################################
	session_start();
	
	$notice = '';
	$loggedIn = false; 
	$has_donated = false;
	$log_out = false; 
	
	if(isset($_GET['o'])){
		logout();
		$log_out = true;
	}
	else if(isset($_GET['login']) && isset($_POST['login_user_name']) && isset($_POST['login_password'])){
		authenticate( $_POST['login_user_name'], $_POST['login_password'], isset($_POST['login_cookie']), $notice );
	}
	else if(isset($_COOKIE['user_name']) && isset($_COOKIE['password']) && !isset($_GET['o'])){
		authenticate( $_COOKIE['user_name'], $_COOKIE['password'], isset($_POST['login_cookie']), $notice );
	}
	
	if( isset( $_SESSION['user_id'] ) )
	{	
		$loggedIn = true; 
	}
	
	if( $loggedIn || $log_out ) {
		if (isset($_POST['redirect_url'])) {
			header("Location: ?".$_POST['redirect_url']);
			die;
		}
	}
?>