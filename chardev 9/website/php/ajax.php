<?php
class Ajax {
	public static function dieOnError( $error_msg, $description = null ) {
		header("error: yes");
		if( $description ) {
			header("error_description: ".urlencode($description));
		}
		die($error_msg);
	}

	public static function dieOnException( Exception $e ) {
		header("error: yes");
		$str = "<div class='ajax_exception'>".$e->__toString()."</div>";

		$cause_str = "";
		while( $cause = $e->getPrevious() ) {
			$cause_str .= "<div>".$cause->__toString()."</div>";
			$e = $cause;
		}
		if( $cause_str ) {
			$str .= "<div class='ajax_exception_cause'><div>Cause</div>".$cause_str."</div>";
		}
		die($str);
	}
}

?>