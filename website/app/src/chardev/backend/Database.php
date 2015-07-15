<?php

namespace chardev\backend;

use chardev\profiles\CommunityPlatformClient;

class Database {
	
	private static $connection = null;
	
	public static function connect() {
		if( self::$connection ) {
			self::$connection->close();
		}
		//TODO multi-lang support
		//$suffix = \chardev\Language::getInstance()->toDatabaseSuffix();
		$suffix = "";
		self::$connection = new \PDO("mysql:dbname=chardev_mop{$suffix};host=127.0.0.1", "root", "");
		self::$connection->setAttribute(\PDO::ATTR_DEFAULT_FETCH_MODE, \PDO::FETCH_ASSOC);
		self::$connection->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
	}
	
	/**
	 * @return \PDO
	 */
	public static function getConnection ()
	{
		if (self::$connection == null) {
			self::connect();
		}
		return self::$connection;
	}
	
	public static function getTotalAmountDonated () {
		$record = DatabaseHelper::fetchOne(self::getConnection(),"SELECT sum(`amount`) as `Total` FROM chardev.`donations`");
		
		return $record["Total"];
	}
}