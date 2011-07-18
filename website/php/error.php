<?php
	function set_error_header( $error_desc )
	{
		header("error: " . $error_desc );
	}
?>