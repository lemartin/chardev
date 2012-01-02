<?php
	if(!isset($_GET['userId'])){ echo "no user name"; die;}
	else if(!isset($_GET['password'])){ echo "no password"; die;}
	else if(!isset($_GET['guid'])){ echo "no old password"; die;}
	
	include('../../db.php');
	
	if($_GET['password'] == md5(md5("")))
	{
		echo json_encode(array(1,"Invalid password"));
		die;
	}
	
	$record = mysql_fetch_assoc(
		mysql_query(
			"SELECT * FROM chardev.user WHERE userID = '".(int)$_GET['userId'].
			"' AND MD5(pw) LIKE '".mysql_real_escape_string($_GET['guid'])."'"
		)
	);
	if( $record ){
		mysql_query(
			"UPDATE chardev.user SET pw='".mysql_real_escape_string($_GET['password']).
			"' WHERE userID = '".mysql_real_escape_string($_GET['userId']).
			"' AND MD5(pw) LIKE '".mysql_real_escape_string($_GET['guid'])."'"
		);
		echo json_encode(array(0,"The password has been changed!"));
	}
	else {
		echo json_encode(array(1,"Invalid inputs"));
	}
?>