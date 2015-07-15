<?php

	include '../js_files.php';

	chdir("./../../");

	set_time_limit(0);
	
	$output_file = "./js/all.js";
	
	unlink($output_file);
	
	$js_files_content = "";
	for( $i=0; $i<count($js_files); $i++ ) {
		$abs_file_path = $js_files[$i][0].$js_files[$i][1];
		echo "forced first: ".$abs_file_path."\n";
		$js_files_content .= file_get_contents ( $abs_file_path )."\n\n";
	}
			
	write_to_file( 
		$js_files_content,
		$output_file
	);	
	
	function read ( $dir_str ) {
	
		if( ! is_dir($dir_str) ) {
			return "";
		}
		
		$merged = "";
				
		$dir = opendir( $dir_str );
		
		while( $file = readdir($dir) ) {
		
			if( substr ( $file, 0, 1 ) == "." ) {
				continue;
			}
			
			$skip = false;
			for( $i=0; $i<count($GLOBALS['exlude']); $i++ ) {
				if( $GLOBALS['exlude'][$i] == $file ) {
					echo "Skipping ".$file."\n";
					$skip = true;
					break;
				}
			}
			for( $i=0; $i<count($GLOBALS['forceFirst']); $i++ ) {
				if( $GLOBALS['forceFirst'][$i][1] == $file ) {
					echo "Skipping ".$file."\n";
					$skip = true;
					break;
				}
			}
			for( $i=0; $i<count($GLOBALS['forceLast']); $i++ ) {
				if( $GLOBALS['forceLast'][$i][1] == $file ) {
					echo "Skipping ".$file."\n";
					$skip = true;
					break;
				}
			}
			if( $skip ) {
				continue;
			}
			
			$abs_file_path = $dir_str . "/" . $file;
			
			if( is_dir( $abs_file_path )) {
			
				$merged .= read( $abs_file_path );
				
				continue;
			}
			
			if( !preg_match('/^.*\.js$/i',$file) ) {
				echo "Wrong extension $file!\n";
				continue;
			}
			
			echo $abs_file_path."\n";
			$merged .="
//#############################################################################
//
//	".strtoupper($file)."
//
//#############################################################################
";
			
			$merged .= file_get_contents ( $abs_file_path );
			
		}
		
		return $merged;
	}
	
	function write_to_file ( $str, $file ) {
	
		if( file_exists ( $file )  &&  ! is_writable($file) ) {
			echo "Unable to write to ".$file."!\n";
			return;
		}
		
		if ( ! $handle = fopen($file, "w")) {
			echo "Unable to open $file";
			return;
		}
		
		if (!fwrite($handle, $str)) {
			echo "Unable to write content to $file";
		}
		
		fclose($handle);
	}	
?>