<?php
namespace chardev\backend\data;

use chardev\backend\Database;

use chardev\backend\DatabaseHelper;

use chardev\FormatHelper;

use chardev\backend\Constants;

class ProfileListData extends \chardev\backend\data\ListData {
	private static $instance = null;
	
	/**
	 *	@return ProfileListData
	 */
	public static function getInstance() {
		if( self::$instance == null ) {
			self::$instance = new ProfileListData();
		}
		return self::$instance;
	}
	
	protected function __construct() {
		//
	}
	
	public function getProfiles ( $arguments, $flags, $order, $page ) {
		$page = $page < 1 ? 1 : $page;
		$where = "";
		$orderClause = "";
		$profiles = array();
		$values = array(); 
		$showDeleted = false;
		// arguments
		$this->parseArguments( $arguments, $matches );
		foreach($matches as $match) {
			$operator = constant($match[2]);
			switch( $match[1] ) {
				case "ismine":
					$user = \chardev\Session::getLoggedInUser();
					
					if( ! $user ) {
						break;
					}
					else if( $operator != EQ ) {
						throw new \Exception("Operator ".$match[2]." is not supported");
					}
					else {
						$where .= ( $where ? " AND " : "" ) . ( (int)$match[3] == 0 ? " NOT " : "" ) .  "( `UserID` = ? )";
						$values[] = $user->getId();
					}
					break;
				case "showdeleted":
					if( $operator != EQ ) {
						throw new \Exception("Operator ".$match[2]." is not supported");
					}
					else {
						if( (int)$match[3] == 1 ) {
							$showDeleted = true;
						}
					}
					break;
				case "lvl":
					$this->parseNumericArgument($where,$values,$operator,$match[3],"`Level`");
					break;
				default:
					echo "unknown argument: ".$match[1];
					break;
			}
		}
		if( $showDeleted ) {
			$where .= ( $where ? " AND " : "" ) . "`Deleted`='1'";
		}
		else {
			$where .= ( $where ? " AND " : "" ) . "`Deleted`='0'";
		}
		// order
		$orderClause = $this->parseOrder( $order, array( "time" => "`Timestamp`", "id" => "`ID`") );
		
		$query = "SELECT * FROM chardev_user.`chardev_characters_mop` WHERE `History` = 0 " . ($where?" AND ".$where:"") . ( $orderClause ? " ORDER BY ".$orderClause : "" ) . " LIMIT ".Constants::PROFILES_PER_PAGE *($page-1).",".(Constants::PROFILES_PER_PAGE+1);
		
		$records = DatabaseHelper::fetchMany(Database::getConnection(), $query,$values);
		
		$profiles[0] = array(count($records), Constants::PROFILES_PER_PAGE);
		
		$n = min(count($records),Constants::PROFILES_PER_PAGE);
		for( $i=0; $i<$n; $i++ ) {
			$record = $records[$i];
			$profiles[$i+1] = array(
				(int)$record['ID'],
				(int)$record['UserID'],
				(string)$record['Name'],
				(string)$record['Description'],
				(int)$record['ChrRaceID'],
				(int)$record['ChrClassID'],
				(int)$record['Level'],
				date("D, d M Y g:ia",(int)$record['Timestamp']),
				\chardev\FormatHelper::getProfileLink($record['ID'], $record['Name'])
			);
		}
		return $profiles;
	}
}