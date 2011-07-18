<?php 

require_once './../db.php';
require_once './../common.php';

$char = get_battlenet_profile( 1, 'Mug\'thol', 'Xass', $error);

echo json_encode($char[1][1]);
echo ".\n".$error;
?>