<?php
class ajax_response {
	public static function die_on_error( $error_msg, $description = null ) {
		header("error: yes");
		if( $description ) {
			header("error_description: ".urlencode($description));
		}
		die($error_msg);
	}

	public static function die_on_exception( Exception $e ) {
		header("error: yes");
		$str = "<div class='ajax_exception'>".$e->getMessage()."</div>";

		$cause_str = "";
		while( $cause = $e->getPrevious() ) {
			$cause_str .= "<div>".nl2br($cause->getMessage())."</div>";
			$e = $cause;
		}
		if( $cause_str ) {
			$str .= "<div class='ajax_exception_cause'>".$cause_str."</div>";
		}
		die($str);
	}
	
	public static function auto_redirect( $url ) {
		header("auto_redirect: yes");
		die(json_encode($url));
	}
}

?>