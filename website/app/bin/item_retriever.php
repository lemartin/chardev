<?php


//if( $argc == 1 ) {
//    $maxId = 95000;
//    $threads = 10;
//    $idsPerThread = $maxId / $threads;
//
//    for( $i=0; $i<$threads; $i++ ) {
//        $start = $i * $idsPerThread;
//        $stop = ($i+1) * $idsPerThread;
//        echo "start /B php item_retriever.php $start $stop\n";
//    }
//}
//else if ( $argc == 3 ) {
//    require __DIR__ . '/../bootstrap.php';
//    require __DIR__ . '/../resources/BNET_KEYS.inc';
//
//    $dr = new \chardev\util\DataRetriever();
//    $dr->retrieveItems( $argv[1], $argv[2] );
//}
//else {
//    echo "Usage:\n".
//        "\titem_retriever.php PROCESSES\n" .
//        "\tUsage: item_retriever.php ID_START ID_STOP\n";
//}


require __DIR__ . '/../bootstrap.php';
require __DIR__ . '/../resources/BNET_KEYS.inc';

$dr = new \chardev\util\DataRetriever();
$dr->setCpc(new \chardev\profiles\CommunityPlatformClient(BNET_PRIVATE_KEY, BNET_PUBLIC_KEY));
$dr->retrieveItems();