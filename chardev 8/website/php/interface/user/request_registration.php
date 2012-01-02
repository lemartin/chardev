<?php
	if(!isset($_GET['u'])){ echo "no user name"; die;}
	else if(!isset($_GET['pw'])){ echo "no pw"; die;}
	else if(!isset($_GET['e'])){ echo "no mail"; die;}
	
	include('./../../db.php');
	
	if( !is_string($_GET['u']) || !$_GET['u'] || strlen($_GET['u']) < 4 || !preg_match('/^[a-zA-Z][a-zA-Z1-9]*$/',$_GET['u'])) die('error_username');
	if( !is_string($_GET['e']) || !$_GET['e'] ) die('error_email');
	
	$stmt=mysql_query("SELECT * FROM `user` WHERE name LIKE '".mysql_real_escape_string($_GET['u'])."'");
	if($result=mysql_fetch_assoc($stmt)){echo "user name is already used";die;}
	
	$stmt=mysql_query("SELECT * FROM `user` WHERE email LIKE '".mysql_real_escape_string($_GET['e'])."'");
	if($result=mysql_fetch_assoc($stmt)){ echo "e-mail adress is already used";die;}
	
	$stmt=mysql_query("SELECT * FROM `pending` WHERE name LIKE '".mysql_real_escape_string($_GET['u'])."'");
	if($result=mysql_fetch_assoc($stmt)){echo "user name is already used - waiting for confirmation";die;}
	
	$stmt=mysql_query("SELECT * FROM `pending` WHERE email LIKE '".mysql_real_escape_string($_GET['e'])."'");
	if($result=mysql_fetch_assoc($stmt)){ echo "e-mail adress is already used - waiting for confirmation";die;}
	$guid=md5(time()."".$_GET['u']);
	$mail=$_GET['e'];
	
	include("./mail.php");
    try
	{	
		mail($mail,"Your registration at chardev.org",$content,$headers);
	}
	catch(Exception $e)
	{
		echo "error ".$e;
		die;	
	}
	
	mysql_query("INSERT INTO `pending` VALUES ('".mysql_real_escape_string($_GET['u'])."','".mysql_real_escape_string($_GET['pw'])."','".mysql_real_escape_string($_GET['e'])."','".time()."','".$guid."')");
	echo "register_success";
?>