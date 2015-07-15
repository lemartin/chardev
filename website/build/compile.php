<?php

include 'js_files.php';

$build_file = '.build';

$build = (int)file_get_contents( $build_file );

$joined = '';

for( $i=0; $i<count($js_files); $i++ ) {
	$joined .= " --js ../public/".$js_files[$i];
}

$tmp_file = ".tmp";

if( file_exists($tmp_file)) {
	if( ! unlink($tmp_file)) {
		die("Unable to delete file $tmp_file!");
	}
}

exec( 
	"java -jar closure_compiler/compiler.jar "
	.$joined
	." --js ../public/js/build.js "
	." --compilation_level ADVANCED_OPTIMIZATIONS --js_output_file ../public/js/all_optimised.js --externs ../public/js/cc_externs.js --externs jquery-1.7.js --warning_level VERBOSE"
	."  1> $tmp_file 2>&1" 
);

$r = "";
if( file_exists($tmp_file)) {
	$r = file_get_contents($tmp_file);
	if( $r ) {
		die($r);
	}
}
else {
	die("Unable to read output file $tmp_file");
}

file_put_contents( $build_file, $build + 1 );
file_put_contents( '../public/js/build.js', 'window["CHARDEV_CORE_BUILD"]='.($build+1).';' );

echo "build: ".($build + 1)."\n";
?>