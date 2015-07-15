<?php
namespace chardev\backend\data;

use chardev\backend\DoesNotExistException;

use chardev\backend\Database;

use chardev\backend\DatabaseHelper;

class SkillLineData extends Data
{
	protected static $instance = null;
	/**
	 * @return SkillLineData
	 */
	public static function getInstance() 
	{
		if( self::$instance == null ) {
			self::$instance = new SkillLineData();
		}
		return self::$instance;
	}
	
	protected function __construct() {
		//T
	}
	
	protected function getData( $id ) {
		$record = DatabaseHelper::fetchOne(Database::getConnection(), "SELECT * FROM `skillline` where `ID` = ?", array($id)); 
		if( $record ) {
			return array(
				$record['ID'],
				$record['Name'],
				$record['Category'],
				$record['Description'],
			);
		}
		else {
			throw new DoesNotExistException("Skill line $id");
		}
	}
}

?>