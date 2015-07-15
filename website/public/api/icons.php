<?php 

define("ICONS_PER_PAGE", 8*16);

$page = isset($_GET['page']) ? (int)$_GET['page'] : 1; if( $page < 1 ) $page = 1; 
$name = isset($_GET['name']) ? (string)$_GET['name'] : ""; $name = "%".$name."%";

$db = new \PDO("mysql:dbname=chardev_user;host=127.0.0.1", "root", "");


$ipp = ICONS_PER_PAGE;
$sp = ICONS_PER_PAGE * ( $page - 1);

$prep_stmt = $db->prepare("SELECT SQL_CALC_FOUND_ROWS * FROM chardev_user.`icons` WHERE `name` LIKE ? LIMIT {$sp},{$ipp}");
$prep_stmt->execute(array($name));

$src = array();
while( $record = $prep_stmt->fetch()) {
	$src[] = $record['name'];
}

$found = $db->query("SELECT FOUND_ROWS() AS rows")->fetch();

echo json_encode(array($src,(int)$found['rows'],ICONS_PER_PAGE,$page));

?>