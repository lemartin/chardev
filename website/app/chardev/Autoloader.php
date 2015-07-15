<?php
namespace chardev;

class Autoloader
{
	
	
	public function __construct() {	
		set_include_path(get_include_path().PATH_SEPARATOR .__DIR__. DIRECTORY_SEPARATOR . ".." );
		
		spl_autoload_register(array($this, 'load'));
	}
	private function load($className) {
		
		$fileName = preg_replace('/\\\\/', DIRECTORY_SEPARATOR, $className) . '.php'; 
		include $fileName;
	}
}

new Autoloader();
?>