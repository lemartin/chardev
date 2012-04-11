<?php

include 'js_files.php';

$build_file = '.build';

$build = (int)file_get_contents( $build_file );

$joined = '';

for( $i=0; $i<count($js_files); $i++ ) {
	$joined .= " --js ../public/".$js_files[$i];
}

write_to_file ( 'window["CHARDEV_CORE_BUILD"]='.($build+1).';', '../public/js/build.js' );

$r = system( 
	"java -jar closure_compiler/compiler.jar "
	.$joined
	." --js ../public/js/build.js "
	." --compilation_level ADVANCED_OPTIMIZATIONS --js_output_file ../public/js/all_optimised.js --externs ../public/js/cc_externs.js --externs jquery-1.7.js --warning_level VERBOSE" 
);

write_to_file( $build + 1, $build_file );

echo "build: ".($build + 1)."\n";

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