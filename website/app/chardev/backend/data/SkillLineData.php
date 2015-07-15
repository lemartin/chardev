<?php
namespace chardev\backend\data;

use chardev\backend\DoesNotExistException;

use chardev\backend\Database;

use chardev\backend\DatabaseHelper;

class SkillLineData extends Data
{
	protected static $instance = null;
	public static function getInstance() 
	{
		if( self::$instance == null ) {
			self::$instance = new SkillLineData( /*args*/);
		}
		return self::$instance;
	}
	
	protected function __construct( /*args*/) {
		//TODO: Auto generated stub
	}
	
	protected function getData( $id ) {
		$record = DatabaseHelper::fetchOne(Database::getConnection(), "SELECT * FROM `skillline` where `ID` = ?", array($id)); 
		if( $record ) {
			return array(
				$record['ID'],
				$record['Name'],
				$record['Category']
			);
		}
		else {
			throw new DoesNotExistException("Skill line $id");
		}
	}
}

?>