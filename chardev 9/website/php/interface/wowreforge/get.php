<?php 
	include '../../db.php';
	include '../../common.php';
	
	echo json_encode(get_storage_token());
?>