<?php

namespace chardev\backend;

class DatabaseHelper {
	public static function testStatement( \PDOStatement $stmt ) {
		if( $stmt->errorCode() != 0 ) {
			$info = $stmt->errorInfo();
			throw new DatabaseException(print_r($stmt,true)."\n".print_r($info,true));
		}
	}
	
	public static function fetchOne( \PDO $db, $sql, $args = null ) {
	    $stmt = self::query($db, $sql, $args);
	    $record = $stmt->fetch();
	    $stmt->closeCursor();
	    return $record;
	}
	
	public static function fetchMany( \PDO $db, $sql, $args = null ) {	
	    $stmt = self::query($db, $sql, $args);
	    $records = $stmt->fetchAll();
	    $stmt->closeCursor();
	    return $records;
	}
	
	/**
	 * Executes given sql with specified args and returns the resulting statement  
	 * @param \PDO $db
	 * @param string $sql
	 * @param array $args
	 * @return \PDOStatement
     * @throws DatabaseException$sql
	 */
	public static function query( \PDO $db, $sql, $args = null ) {
		$stmt = $db->prepare($sql);
		$stmt->execute($args);

        if( $stmt->errorCode() != 0 ) {
            $info = $stmt->errorInfo();
            throw new DatabaseException(print_r($stmt,true)."\n".print_r($info,true));
        }

		return $stmt;
	}
	
	public static function execute( \PDO $db, $sql, $args = null ) {
		$stmt = $db->prepare($sql);
		$stmt->execute($args);

        if( $stmt->errorCode() != 0 ) {
            $info = $stmt->errorInfo();
            throw new DatabaseException(print_r($stmt,true)."\n".print_r($info,true));
        }

		$stmt->closeCursor();
	}
	
	public static function unlock( \PDO $db ) {
		$db->exec("UNLOCK TABLES");
	}
	
	public static function format( $sql, $args = null ) {
		$str = $sql;
		
		if( $args ) {
			for( $i =0; $i<count($args); $i++ ) {
				$str = preg_replace('/\?/', $args[$i], $str, 1);
			}
		}
		
		return $sql;
	} 
}