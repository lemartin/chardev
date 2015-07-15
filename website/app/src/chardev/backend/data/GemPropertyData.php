<?php
namespace chardev\backend\data;

use chardev\backend\DoesNotExistException;

use chardev\backend\DatabaseHelper;
use chardev\backend\Database;

class GemPropertyData extends Data
{

	protected static $instance = null;

	/**
	 *
	 * @return GemPropertyData
	 */
	public static function getInstance ()
	{
		if (self::$instance == null) {
			self::$instance = new GemPropertyData();
		}
		return self::$instance;
	}

	protected function __construct() {
		//
	}

	protected function getData ( $id )
	{
		$record = DatabaseHelper::fetchOne(
				Database::getConnection(), 
				"SELECT * FROM `gemproperties` WHERE `ID` = ?", 
				array($id)
		);
		
		if ($record && $record['SpellItemEnchantmentID']) {
			return array(
				SpellItemEnchantmentData::getInstance()->fromId($record['SpellItemEnchantmentID']), 
				(int) $record['MinItemLevel']
			);
		}
		throw new DoesNotExistException("Gem property $id");
	}
}

?>