<?php 
	include '../db.php';

	$sz_dir = "./../../images/icons/";
	if(!is_dir($sz_dir)) die("asdasd");
	$dir = opendir($sz_dir);
	$n = 0;
	$im;
	$im2;
	while($file = readdir($dir)){
		if( !preg_match('/^.+\.png$/', $file) ) {
			continue;
		}
		
		$file = str_ireplace(".png", "", $file);
		
		mysql_query("insert into chardev_user.icons values ('".mysql_real_escape_string($file)."');");
	}
		
		?>