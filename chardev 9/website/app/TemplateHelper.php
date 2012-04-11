<?php

class TemplateHelper {
	private $styleSheets = array();
	private $scripts = array();
	private $template = "";
	private $args = null;
	private $content = "";
	
	public function setTemplate( $template, $args = null ) {
		if( $this->template ) {
			throw new \Exception("Re-setting the to be rendered template is not allowed!");
		}
		$this->args = $args;
		$this->loadTemplate($template);
		$this->template = $template;
	}
	
	public function getArg( $key ) {
		if( $this->args == null || ! isset($this->args[$key]) ) {
			return "";
		}
		return $this->args[$key];
	}
	
	public function getContent() {
		return $this->content;
	}
	
	public function getTemplate() {
		return $this->template;
	}
	
	private function loadTemplate($template) {
		$ex = null;
		$b = true;
		ob_start();
		try {
			$b = include __DIR__ . '/views/' . lcfirst($template) . '.phtml';
		}
		catch( \Exception $e ) {
			$ex = $e;
		} 
		$content = ob_get_contents();
		ob_end_clean();
		if( $ex ) {
			throw new \Exception("Error while loading template", 0, $ex);
		}
		if( !$b ) {
			throw new \Exception("Unable to render ".$template.", file not found!");
		}
		$this->content = $content;
	}
	
	public function addStyleSheet( $url ) {
		$this->styleSheets[] = $url;
	}
	
	public function getStyleSheets() {
		return $this->styleSheets;
	}
	
	public function addStyleSheets( $urls ) {
		foreach( $urls as $url ) {
			$this->addStyleSheet($url);
		}
	}
	
	public function addScript( $url ) {
		$this->scripts[] = $url;
	}
	
	public function getScripts() {
		return $this->scripts;
	}
	
	public function addScripts( $urls ) {
		foreach( $urls as $url ) {
			$this->addScript($url);
		}
	}
	
	public function getHeadLinks() {
		$head = "";
		$basePath = self::getBasePath();
	
		foreach( $this->styleSheets as $link ) {
			$head .= "<link type=\"text/css\" href=\"{$basePath}{$link}?".BUILD."\" rel=\"stylesheet\" />\n";
		}
	
		foreach( $this->scripts as $script ) {
			$head .= "<script src='{$basePath}{$script}?".BUILD."' type='text/javascript'></script>\n";
		}
	
		return $head;
	}
	
	private static $basePath = false;
	public static function getBasePath() {
		if( self::$basePath === false ) {
			$depth = substr_count(preg_replace('/\?.+$/', '', $_SERVER['REQUEST_URI']),'/') - 1;
			if( $depth <= 0 ) {
				self::$basePath = "";
			}
			else {
				self::$basePath = implode('', array_fill(0, $depth, '../'));
			}
		}
		
		return self::$basePath;
	}
}