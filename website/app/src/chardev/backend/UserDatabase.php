<?php

namespace chardev\backend;

use chardev\backend\entities\User;

use chardev\Session;

use chardev\profiles\CommunityPlatformClient;

class UserDatabase {
	const ACTIVATION_TIMEOUT =  172800;
	/**
	 * @var UserDatabase
	 */
	private static $instance;
	private $db;
	
	/**
	 * @return UserDatabase Singleton
	 */
	public static function getInstance() {
		if( self::$instance == null ) {
			self::$instance = new UserDatabase();
		}
		return self::$instance;
	}
	
	private function __construct() {
		$this->db = new \PDO("mysql:dbname=chardev;host=127.0.0.1", "root", "");
	}
	
	public function getUserData( $userId ) {
		$data = DatabaseHelper::fetchOne(
				$this->db,
				'SELECT * FROM chardev.`user` u LEFT JOIN chardev_user.`user_data` ud ON u.`userID` = ud.`UserID` WHERE u.`userID`= ?',
				array($userId)
		);
		
		if( ! $data ) {
			throw new \chardev\backend\DoesNotExistException("User {$userId} not found!");
		}
		
		$donatedRecord = DatabaseHelper::fetchOne(
				$this->db, 
				"SELECT SUM(amount) as sum FROM chardev.`donations` WHERE `userID`=?", 
				array($userId)
		);
		
		$data['AmountDonated'] = $donatedRecord["sum"];
		
		return $data;
	} 
	
	public function getUserIdForName( $userName ) {
		$record = DatabaseHelper::fetchOne( $this->db, 'SELECT `userID` FROM chardev.`user` WHERE `name` LIKE ?', array($userName));
		if( ! $record ) {
			throw new \chardev\backend\DoesNotExistException("User {$userName} not found!");
		}
		return $record['userID'];
	}
	
	public function getUserIdForEmail( $email ) {
		$record = DatabaseHelper::fetchOne( $this->db, 'SELECT `userID` FROM chardev.`user` WHERE `email` LIKE ?', array($email));
		if( ! $record ) {
			throw new \chardev\backend\DoesNotExistException("User with e-mail {$email} not found!");
		}
		return $record['userID'];
	}
	
	public function changePassword( $userId, $password ) {
		DatabaseHelper::execute($this->db, "UPDATE chardev.`user` SET `pw` = ? WHERE `userID` = ?", array($password,$userId));
	}
	
	public function getBattleNetProfiles( $userId ) {
		$stmt = $this->db->prepare('
				SELECT * FROM
				chardev_user.`userbattlenetprofilerelation` ubnpr
				INNER JOIN chardev_user.`battlenetprofile` bnp ON ubnpr.`battlenetprofileID` = bnp.`ID`
				WHERE `UserID` = ?'
		);
		$stmt->execute(array((int)$userId));
		DatabaseHelper::testStatement($stmt);
		
		$profiles = array();
		while( false !== ($record = $stmt->fetch()) ) {
			$profiles[] = array(
					"Name" => $record['Name'],
					"Realm" => $record['Realm'],
					"Region" => $record['Region'],
					"CharacterRaceID" => (int)$record['CharacterRaceID'],
					"CharacterClassID" => (int)$record['CharacterClassID'],
					"Level" => (int)$record['Level']
			);
		}
		$stmt->closeCursor();
		
		return $profiles;
	}
	
	public function addBattleNetProfile( $userId, $name, $realm, $region ) {
		try {
			$profile = new \chardev\profiles\BattleNetProfile( $name, $realm, $region );
		}
		catch( \Exception $e ) {
			throw new \chardev\profiles\UnableToValidateProfileException( $name, $realm, $region, $e );
		}
		
		$profileId = $this->_getBattleNetProfileId($profile);
		$alreadyAdded = false;
		
		if( $profileId > 0 ) {		
			$stmt = $this->db->prepare(
					"SELECT * FROM
						chardev_user.`userbattlenetprofilerelation`
					WHERE `UserID` = ? AND `battlenetprofileID` = ?"
			);
			$stmt->execute(array($userId,$profileId));
			DatabaseHelper::testStatement($stmt);
		
			$alreadyAdded = false !== ($record = $stmt->fetch());
			$stmt->closeCursor();
			
			$updateStmt = $this->db->prepare("
					UPDATE chardev_user.`battlenetprofile` 
					SET `CharacterRaceID`=? AND `CharacterClassID`=? AND `Level`=? AND `Serialized`=? WHERE `ID`=?"
			);
			$updateStmt->execute(array(
					$profile->getCharacterRaceId(),
					$profile->getCharacterClassId(),
					$profile->getLevel(),
					serialize($profile->getProfileData()),
					$profileId
			));
			
			DatabaseHelper::testStatement($updateStmt);
			$updateStmt->closeCursor();
		}
		else {
			$insertStmt = $this->db->prepare("INSERT INTO chardev_user.`battlenetprofile` VALUES (NULL,?,?,?,?,?,?,?)");
			$insertStmt->execute(array(
					$profile->getName(),
					$profile->getRealm(),
					$profile->getRegion(),
					$profile->getCharacterRaceId(),
					$profile->getCharacterClassId(),
					$profile->getLevel(),
					serialize($profile->getProfileData())
			));
			DatabaseHelper::testStatement($insertStmt);
			$insertStmt->closeCursor();
			
			$profileId = $this->db->lastInsertId();
		}
		
		if( $alreadyAdded ) {
			throw new \chardev\profiles\ProfileAlreadyAddedException( $name, $realm, $region );
		}
		
		$insertStmt = $this->db->prepare("INSERT INTO chardev_user.`userbattlenetprofilerelation` VALUES (?,?)");
		$insertStmt->execute(array($userId,$profileId));
		DatabaseHelper::testStatement($insertStmt);
		$insertStmt->closeCursor();
	}
	
	public function removeBattleNetProfile( $userId, $name, $realm, $region ) {
		$stmt = $this->db->prepare("
				DELETE FROM
					chardev_user.`userbattlenetprofilerelation`
				WHERE
					`UserID` = ? AND
					`battlenetprofileID` IN ( SELECT `ID` FROM chardev_user.`battlenetprofile` WHERE `Name` =? AND `Realm` =? AND `Region` =?)"
		);
		$stmt->execute(array($userId, $name, $realm, $region));
		DatabaseHelper::testStatement($stmt);
	}
	
	private function _getBattleNetProfileId( \chardev\profiles\BattleNetProfile $profile ) {
		$stmt = $this->db->prepare(
				"SELECT * FROM chardev_user.`battlenetprofile` 
				WHERE `Name` LIKE ? AND `Realm` LIKE ? AND `Region` LIKE ?"
		);
		$stmt->execute(array($profile->getName(), $profile->getRealm(), $profile->getRegion()));
		DatabaseHelper::testStatement($stmt);
		
		$id = 0;
		
		if( false !== ( $record = $stmt->fetch())) {
			$id = (int)$record['ID'];
		}
		
		$stmt->closeCursor();
		return $id;
	}
	
	public function setUserData( $userId, $key, $value ) {
		
		$stmt = $this->db->prepare("SELECT `$key` FROM chardev_user.`user_data` WHERE `UserID`=?");
		$stmt->execute(array($userId));
		DatabaseHelper::testStatement($stmt);
		
		if( false === $stmt->fetch()) {
			$insertStmt = $this->db->prepare("INSERT INTO chardev_user.`user_data` (`UserID`) VALUES (?)");
			$insertStmt->execute(array($userId));
			DatabaseHelper::testStatement($insertStmt);
			$insertStmt->closeCursor();
		}
		$stmt->closeCursor();
		
		$updateStmt = $this->db->prepare("UPDATE chardev_user.`user_data` SET `$key`=? WHERE `UserID`=?");
		$updateStmt->execute(array($value,$userId));
		DatabaseHelper::testStatement($updateStmt);
		$updateStmt->closeCursor();
		
		$stmt = $this->db->prepare("SELECT `$key` FROM chardev_user.`user_data` WHERE `UserID`=?");
		$stmt->execute(array($userId));
		DatabaseHelper::testStatement($stmt);
		
		$record = $stmt->fetch();
		$stmt->closeCursor();
		
		return $record[$key];
	}
	
	public function getRealmList() {
		$n = rand( 0, 100 );
		
		if( $n == 0 ) {
			require_once __DIR__ . '/../../../resources/BNET_KEYS.inc';
			
			$client = new CommunityPlatformClient( BNET_PRIVATE_KEY, BNET_PUBLIC_KEY );
	
			$regions = array( 'us', 'eu', 'kr', 'cn', 'tw' );
			$typeStrToMask = array( 'pve' => 0, 'pvp' => 1, 'rp'=> 2, 'rppvp' => 3 );
			
			foreach( $regions as $val ) {
				$json = $client->getRealmList($val);
				
				$cached = array();
			
				if( ! $json ) {
					continue;
				}
				
				$obj = json_decode($json);
				
				$realms = $obj->realms;
				
				for( $i=0; $i<count($realms); $i++ ) {
					
					$realm = $realms[$i];
					
					$stmt = $this->db->prepare("REPLACE INTO chardev_user.`realm` VALUES (?,?,?,?)");
					$stmt->execute(array($realm->name, $val, (int)$typeStrToMask[$realm->type], $realm->slug));
					DatabaseHelper::testStatement($stmt);
					
					$cached[] = $realm->name;
				}
				
				DatabaseHelper::execute(
						$this->db, 
						"UPDATE chardev_user.`region` SET `CachedRealmList` = ? WHERE `Region` = ?",
						array(serialize($cached), $val)
				);
			}
		}
		
		$stmt = $this->db->prepare("SELECT * FROM chardev_user.`region`");
		$stmt->execute();
		DatabaseHelper::testStatement($stmt);
		
		$lists = array();
		while($record = $stmt->fetch()) {
			$lists[$record['Region']] = unserialize($record['CachedRealmList']);
		}
		
		return $lists;
	}
	
	public function getTotalDonations() {
		$record = DatabaseHelper::fetchOne($this->db, "SELECT sum(`amount`) as `Total` FROM `donations`");
		return $record["Total"];
	}
	
	public function authenticate( $userName, $password ) {
		
		if( ! $userName || mb_strlen($userName) < 2 ) {
			throw new \InvalidArgumentException("User name is empty or too short!");
		}
		if( ! $password ) {
			throw new \InvalidArgumentException("Password is empty or too short!");
		}
		
		
		$record = DatabaseHelper::fetchOne(
				$this->db, 
				"SELECT * FROM `user` WHERE `name` LIKE ? AND `pw` LIKE ?",
				array($userName,$password)
		);
		
		if( ! $record ) {
			$recordPending = DatabaseHelper::fetchOne(
					$this->db,
					"SELECT * FROM `pending` WHERE `name` LIKE ? AND `pw` LIKE ?",
					array($userName,$password)
			);
			
			if( $recordPending ) {
				throw new RegistrationPendingException();
			}
			else {
				throw new WrongUserNamePasswordException();
			}
		}
		
		return new \chardev\backend\entities\User( $record['userID'] );
	}
	
	public function addProfile( $serialized ) {
		return $this->saveProfile($serialized);
	}
	
	public function updateProfile( $id, $serialized ) {
		if( $id == 0 ) {
			throw new \Exception("Unable to update profile (id: {$id})");
		}
		return $this->saveProfile($serialized, $id);
	}
	
	public function deleteProfile( $id ) {
		
		$loggedInUser = Session::getLoggedInUser();
		
		if( ! $loggedInUser ) {
			throw new \Exception("You need to be logged in to delete profiles!");
		}
		
		$record = DatabaseHelper::fetchOne(
				Database::getConnection(), 
				"SELECT `UserID` FROM chardev_user.`chardev_characters_mop` WHERE `ID`=? LIMIT 0,1", 
				array($id)
		);
		
		if( ! $record ) {
			throw new \Exception("This profile does not exist!");
		}
		
		if( $record['UserID'] != $loggedInUser->getId()) {
			throw new \Exception("You are not allowed to delete this profile!");
		} 
		
		$db = Database::getConnection();
		DatabaseHelper::execute($db, "LOCK TABLES chardev_user.`chardev_characters_mop` WRITE");
		
		DatabaseHelper::execute(
				$db, 
				"UPDATE chardev_user.`chardev_characters_mop` SET `Deleted`='1' WHERE `ID`=?",
				array($id)
		);
		
		DatabaseHelper::unlock($db);
	}
	
	public function getProfile($id, $legacy = false) {
	
		$record = DatabaseHelper::fetchOne(
				Database::getConnection(),
				"SELECT `UserID`, `Serialized` FROM chardev_user.`chardev_characters_mop` WHERE `ID`=? ORDER BY `History` ASC",
				array($id)
		);
	
		if( ! $record ) {
			throw new \chardev\backend\DoesNotExistException("Profile {$id}");
		}
	
		$itmdata = \chardev\backend\data\ItemData::getInstance();
		$sie = \chardev\backend\data\SpellItemEnchantmentData::getInstance();
	
		$r = unserialize($record['Serialized']);
		$r[0][2] = \chardev\backend\data\CharacterRaceData::getInstance()->fromId((int)$r[0][2]);
		$r[0][3] = \chardev\backend\data\CharacterClassData::getInstance()->fromId((int)$r[0][3]);
		for( $i=0; $i<count($r[1]); $i++ ) {
			if( $r[1][$i] == null ) {
				$r[1][$i] = null;
			}
			else {
				$r[1][$i][0] = $itmdata->fromId($r[1][$i][0]);
				$r[1][$i][1] = $itmdata->fromId($r[1][$i][1]);
				$r[1][$i][2] = $itmdata->fromId($r[1][$i][2]);
				$r[1][$i][3] = $itmdata->fromId($r[1][$i][3]);
				$r[1][$i][4] = $sie->fromId($r[1][$i][4]);
	
				if( isset($r[1][$i][7]) ) {
					for($j=0;$j<count($r[1][$i][7]);$j++) {
						$r[1][$i][7][$j] =  $sie->fromId($r[1][$i][7][$j]);
					}
				}
			}
		}
	
		$gd = \chardev\backend\data\GlyphData::getInstance();
		$sd = \chardev\backend\data\SpellData::getInstance();
	
		for( $i=0; $i<count($r[3]); $i++ ) {
			$r[3][$i] = $gd->fromId($r[3][$i]);
		}
		if( isset($r[6]) ) {
			for( $i=0; $i<count($r[6]); $i++ ) {
				if( is_array($r[6][$i]) ) {
					$r[6][$i] = array($sd->fromId($r[6][$i][0]), $r[6][$i][1]);
				}
				else if( is_numeric($r[6][$i])) {
					$r[6][$i] = array($sd->fromId($r[6][$i]), 1);
				}
			}
		}
		if( ! $legacy ) {
			$r["ProfileInfo"] = array(
					"ID" => $id,
					"UserID" => $record["UserID"],
					"Path" => \chardev\FormatHelper::getProfileLink($id, $r[0][0])
			);
		}
		return $r;
	}
	
	//
	// TODO: implement update via extra continuation column, as a fk to the original record
	private function saveProfile( $serialized, $id = 0 ) {
		if( !$serialized ) {
			throw new \ErrorException("No serialized profile found!");
		}
	
		if( !isset($serialized[0]) || !isset($serialized[0][0]) || !isset($serialized[0][1]) || !isset($serialized[0][2]) || !isset($serialized[0][3])) {
			throw new \ErrorException("Malformed serialized profile!");
		}
	
		$loggedInUser = \chardev\Session::getLoggedInUser();
		if( !$loggedInUser ) {
			throw new \Exception("You have to be logged in to save a profile!");
		}
	
		if( $id > 0 ) {
			$profile = DatabaseHelper::fetchOne($this->db, "SELECT * FROM chardev_user.`chardev_characters_mop` WHERE `Deleted`=0 AND `ID`=?",array($id));
				
			if( !$profile ) {
				throw new \Exception("The character profile you tried to update doesn't exists or is flagged as deleted!");
			}
			if( $profile['UserID'] != $loggedInUser->getId() ) {
				throw new \Exception("You're not allowed to update the given character profile!");
			}
		}
	
		$name = (string)$serialized[0][0];
		$description = (string)$serialized[0][1];
		$race_id = (int)$serialized[0][2];
		$class_id = (int)$serialized[0][3];
		$level = (int)$serialized[0][4];
	
		if( $race_id == 0 ) {
			throw new \Exception("Saving character profiles with no race set is not allowed!");
		}
		if( $class_id == 0 ) {
			throw new \Exception("Saving character profiles with no class set is not allowed!");
		}
	
		DatabaseHelper::execute($this->db, "LOCK TABLES chardev_user.`chardev_characters_mop` WRITE");
	
		$duplicate = DatabaseHelper::fetchOne($this->db, "SELECT * FROM chardev_user.`chardev_characters_mop` WHERE Serialized=? AND UserID=?", array(serialize($serialized),$loggedInUser->getId()));
		if( $duplicate ) {
			DatabaseHelper::unlock($this->db);
			throw new DuplicateProfileException($duplicate['ID']);
		}
	
	
		if( $id <= 0 ) {
			$idRecord = DatabaseHelper::fetchOne($this->db, "SELECT (max(`ID`)+1) AS `NextID` FROM chardev_user.`chardev_characters_mop`");

			if( $idRecord && $idRecord['NextID'] ) {
				$id = (int)$idRecord['NextID'];
			}
			else {
				$id = 1;
// 				DatabaseHelper::unlock($this->db);
// 				throw new \Exception("Unable to allocate new profile id!");
			}
		}
		else {
			DatabaseHelper::execute($this->db, "UPDATE chardev_user.`chardev_characters_mop` SET `History` = `History` + 1 WHERE `ID` = ? ORDER BY `History` DESC", array($id));
		}
	
		DatabaseHelper::execute($this->db, "INSERT INTO chardev_user.`chardev_characters_mop` VALUES (?,?,?,?,?,?,?,?,?,0,0)", array(
				$id,
				$loggedInUser->getId(),
				$name,
				$description,
				$race_id,
				$class_id,
				$level,
				time(),
				serialize($serialized)
		));
		
		DatabaseHelper::unlock($this->db);
	
		return $id;
	}
	
	public function deleteUser( \chardev\backend\entities\User $user ) {
		DatabaseHelper::execute($this->db, "DELETE FROM chardev_user.`userbattlenetprofilerelation` WHERE `UserID`= ?",array($user->getId()));
		DatabaseHelper::execute($this->db, "DELETE FROM chardev_user.`user_data` WHERE `UserID`= ?",array($user->getId()));
		DatabaseHelper::execute($this->db, "UPDATE chardev.`user` SET name = NULL, pw = NULL, email = NULL WHERE `userID`= ?",array($user->getId()));
	}
	
	public function addUser( $name, $email, $password, $language, $region ) {
		
		if( ! preg_match('/[a-zA-Z0-9]+/', $name) ) {
			throw new \Exception("User name contains invalid characters");
		}
		
		if( strlen($name) < 4 ) {
			throw new \Exception("User name is too short!");
		}
		
		if( ! preg_match('/^.+\@.+\.\w{2,6}$/', $email) ) {
			throw new \Exception("Invalid e-mail address!");
		}
		
		if( strlen($email) < 6 ) {
			throw new \Exception("E-mail is too short!");
		}
		
		DatabaseHelper::query(  $this->db, "LOCK TABLES chardev.`user` WRITE, chardev.`pending` WRITE");
		
		$record = DatabaseHelper::fetchOne($this->db, "SELECT * FROM chardev.`user` WHERE `name` LIKE ? OR `email` LIKE ?", array($name, $email));
		
		if( $record ) {
			if( $record['email'] == $email ) {
				DatabaseHelper::unlock($this->db);
				throw new \Exception("E-mail address is already in use!");
			}
			else if( $record['name'] == $name ) {
				DatabaseHelper::unlock($this->db);
				throw new \Exception("User name is already in use!");
			}
		}
		
		$record = DatabaseHelper::fetchOne($this->db, "SELECT * FROM `pending` WHERE `name` LIKE ? OR `email` LIKE ?", array($name, $email));
		if( $record ) {
			if( $record['email'] == $email ) {
				DatabaseHelper::unlock($this->db);
				throw new \Exception("An account using this e-mail address is waiting to be activated!");
			}
			else if( $record['name'] == $name ) {
				DatabaseHelper::unlock($this->db);
				throw new \Exception("An account using this user name is waiting to be activated!");
			}
		}
		
		if( rand(0,0) == 0) {
			DatabaseHelper::execute($this->db, "DELETE FROM `pending` WHERE `timestamp` < ?", array(time() - self::ACTIVATION_TIMEOUT));
		}
		
		$time = time();
		$token = md5($name . $time); 
		
		switch ($region) {
			case 'us': case 'eu': case 'kr': case 'cn': case 'tw': break;
			default: $region = 'us';
		}
		
		switch ($language) {
			case 0: case 2: case 3: case 6: case 8: break;
			default: $language = 0;
		}
		
		DatabaseHelper::execute($this->db, "INSERT INTO chardev.`pending` VALUES (?,?,?,?,?,?,?)", array(
				$name,
				$password,
				$email,
				$time,
				$token,
				(int)$language,
				$region
		));
		DatabaseHelper::unlock($this->db);
		
		$this->sendActivationMail( $name, $email, $token);
	}
	
	protected function sendActivationMail( $name, $email, $token ) {
		$url = "http://chardev.org/Register.html?Token=" . rawurlencode($token); 
		include __DIR__ . '/../../../resources/activationMail.inc';
		@mail($email,"Confirm your registration at chardev",$content,$headers);
	}
	
	public function resendActivationMail( $name ) {
		$record = DatabaseHelper::fetchOne($this->db, "SELECT * FROM chardev.`pending` WHERE `name` LIKE ?", array($name));
		
		if( ! $record ) {
			
			$activated = DatabaseHelper::fetchOne($this->db, "SELECT * FROM chardev.`user` WHERE `name` LIKE ?", array($name));
			
			if( $activated ) {
				throw new \Exception("The account is already active!");
			}
			else {
				throw new \Exception("No registration for user name: $name found!");
			}
		}
		
		$this->sendActivationMail($name, $record['email'], $record['guid']);
	}
	
	public function activateUser( $token ) {
		DatabaseHelper::execute($this->db, "LOCK TABLES chardev.`pending` WRITE, chardev.`user` WRITE");
		$record = DatabaseHelper::fetchOne($this->db, "SELECT * FROM chardev.`pending` WHERE `guid` = ?", array($token));
		
		if( !$record ) {
			DatabaseHelper::unlock($this->db);
			throw new \Exception("The token is invalid!");
		}
		
		DatabaseHelper::execute($this->db, "INSERT INTO chardev.`user` VALUES (NULL,?,?,?,?,0,NULL,0)", array(
				$record['name'],
				$record['pw'],
				$record['email'],
				$record['timestamp']
		));
		$id = $this->db->lastInsertId();
		
		DatabaseHelper::unlock($this->db);
		
		try {
			$user = new User($id);
			$user->setLanguage($record['Language']);
			$user->setRegion($record['Region']);
			
			DatabaseHelper::execute($this->db, "DELETE FROM chardev.`pending` WHERE `guid`=?",array($record["guid"]));
			
			return $user->getId();
		}
		catch( DoesNotExistException $dnee ) {
			throw new \Exception("Activation failed for unknown reason!");
		}
	}
}

class RegistrationPendingException extends \Exception {
	public function __construct() {
		parent::__construct();
	} 
}

class WrongUserNamePasswordException extends \Exception {
	public function __construct() {
		parent::__construct();
	}
}