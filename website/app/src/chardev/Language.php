<?php

namespace chardev;

class Language {
	const ENGLISH = 0;
	const FRENCH = 2;
	const GERMAN = 3;
	const SPANISH = 6;
	const RUSSIAN = 8;
	
	protected $language = self::ENGLISH;
	protected $locale = null;
	
	private static $instance = null;
	
	/**
	 * @return Language
	 */
	public static function getInstance() {
		if( self::$instance == null ) {
			
			$language = self::ENGLISH;
			
			if( isset($_GET['language'])) {
				switch($_GET['language']) {
					case 'en': $language = self::ENGLISH; break;
					case 'fr': $language = self::FRENCH; break;
					case 'de': $language = self::GERMAN; break;
					case 'es': $language = self::SPANISH; break;
					case 'ru': $language = self::RUSSIAN; break;
				}
			}
			else if( isset($_SERVER['HTTP_HOST']) ) {
				if(strpos($_SERVER['HTTP_HOST'],"en.")!==false){
					$language = self::ENGLISH;
				}
				else if(strpos($_SERVER['HTTP_HOST'],"fr.")!==false){
					$language = self::FRENCH;
				}
				else if(strpos($_SERVER['HTTP_HOST'],"de.")!==false){
					$language = self::GERMAN;
				}
				else if(strpos($_SERVER['HTTP_HOST'],"es.")!==false){
					$language = self::SPANISH;
				}
				else if(strpos($_SERVER['HTTP_HOST'],"ru.")!==false){
					$language = self::RUSSIAN;
				}
			}
			else if( isset($_SESSION['language']) ){
				$language = $_SESSION['language'];
			}
			self::$instance = new Language( $language);
		}
		return self::$instance;
	}
	
	protected function __construct($language) {
		$this->language = $language;
		$this->setLocaleArray();
	}
	
	private function setLocaleArray() {
        $locale = array();

		include(__DIR__ . '/../../locale/en.php');
		
		//	override language files and game data bases
		switch($this->language){
			case self::FRENCH:
				include(__DIR__ . '/../../locale/fr.php');
				break;
			case self::GERMAN:
				include(__DIR__ . '/../../locale/de.php');
				break;
			case self::SPANISH:
				include(__DIR__ . '/../../locale/es.php');
				break;
			case self::RUSSIAN:
				include(__DIR__ . '/../../locale/ru.php');
				break;
		}
		$this->locale = $locale;
	}
	
	public function getLocaleArray() {
		return $this->locale;
	}
	
	public function getLanguage() {
		return $this->language;
	}
	
	public function toSuffixString() {
		switch( $this->language ) {
			case self::FRENCH: return 'fr';
			case self::GERMAN: return 'de';
			case self::SPANISH: return 'es';
			case self::RUSSIAN: return 'ru';
			default: return '';
		}
	}
	
	public function toDatabaseSuffix() {
		switch( $this->language ) {
			case self::FRENCH: return '_fr';
			case self::GERMAN: return '_de';
			case self::SPANISH: return '_es';
			case self::RUSSIAN: return '_ru';
			default: return '';
		}
	}
	
	public function toColumnSuffix() {
		switch( $this->language ) {
			case self::FRENCH: return 'FR';
			case self::GERMAN: return 'DE';
			case self::SPANISH: return 'ES';
			case self::RUSSIAN: return 'RU';
			default: return 'EN';
		}
	}
}