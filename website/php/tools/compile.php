<?php

include '../js_files.php';

$build_file = '../../.build';

$build = (int)file_get_contents( $build_file );

$joined = '';

for( $i=0; $i<count($js_files); $i++ ) {
	$joined .= " --js ".$js_files[$i][0].$js_files[$i][1];
}

write_to_file ( 'window["CHARDEV_CORE_BUILD"]='.($build+1).';', '../../js/build.js' );

system( 
	"cd ../../ && java -jar c:\_projekte\compiler.jar "
	.$joined
	." --js ./js/build.js "
	." --compilation_level ADVANCED_OPTIMIZATIONS --js_output_file ./js/all_optimised.js --externs ./js/cc_externs.js --warning_level VERBOSE" 
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