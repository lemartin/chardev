<?php
namespace chardev\backend\data;

use chardev\FormatHelper;

use chardev\backend\Constants;

class ProfileListData extends \chardev\backend\data\ListData {
	private static $instance = null;
	
	/**
	 *	@return ProfileListData
	 */
	public static function getInstance() {
		if( self::$instance == null ) {
			self::$instance = new ProfileListData(/*args*/);
		}
		return self::$instance;
	}
	
	protected function __construct(/*args*/) {
		// TODO: Auto-generated stub
	}
	
	public function getProfiles ( $arguments, $flags, $order, $page ) {
		$page = $page < 1 ? 1 : $page;
		$where = "";
		$orderClause = "";
		$profiles = array();
		$values = array(); 
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
						if( (int)$match[3] == 0 ) {
							$where .= ( $where ? " AND " : "" ) . "`Deleted`='0'";
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
		// order
		$orderClause = $this->parseOrder( $order, array( "time" => "`Timestamp`", "id" => "`ID`") );
		
		$query = "SELECT * FROM chardev_user.`chardev_characters` WHERE `History` = 0 " . ($where?" AND ".$where:"") . ( $orderClause ? " ORDER BY ".$orderClause : "" ) . " LIMIT ".Constants::PROFILES_PER_PAGE *($page-1).",".(Constants::PROFILES_PER_PAGE+1);
		
		$db = \chardev\backend\Database::getConnection();
		$stmt = \chardev\backend\DatabaseHelper::query($db,$query,$values);
		$found = \chardev\backend\DatabaseHelper::fetchOne($db, "SELECT FOUND_ROWS() AS rows");
		
		$profiles[0] = array($found['rows'], Constants::PROFILES_PER_PAGE);
		$id = ItemData::getInstance();
		while( false !== ($record = $stmt->fetch()) ) {
			$profiles[] = array(
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
		$stmt->closeCursor();
		return $profiles;
	}
}