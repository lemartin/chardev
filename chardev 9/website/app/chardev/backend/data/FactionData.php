<?php
namespace chardev\backend\data;

use chardev\backend\Database;

use chardev\backend\DatabaseHelper;

class FactionData extends Data
{
	protected static $instance = null;
	/**
	 *	@return FactionData
	 */
	public static function getInstance() 
	{
		if( self::$instance == null ) {
			self::$instance = new FactionData( /*args*/);
		}
		return self::$instance;
	}
	
	protected function __construct( /*args*/) {
		//TODO: Auto generated stub
	}
	
	protected function getData( $id ) {
		$record = DatabaseHelper::fetchOne(Database::getConnection(), "SELECT * FROM `faction` WHERE `ID` = ?", array($id));
	
		if( $record ) {
			return array($record['Name']);
		}
		else {
			return null;
		}
	}
}

?>