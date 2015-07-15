<?php

set_time_limit(0);

$sz_dir = __DIR__ . "/../../../public/images/icons/";
//mkdir(__DIR__ . "/../../../public/images/icons");
//mkdir(__DIR__ . "/../../../public/images/icons/small");
//mkdir(__DIR__ . "/../../../public/images/icons/large");
//mkdir(__DIR__ . "/../../../public/images/icons/medium");
//mkdir(__DIR__ . "/../../../public/images/icons/half");
//mkdir(__DIR__ . "/../../../public/images/icons/gem");
//mkdir(__DIR__ . "/../../../public/images/icons/g");
//mkdir(__DIR__ . "/../../../public/images/icons/g/small");
//mkdir(__DIR__ . "/../../../public/images/icons/g/large");
//mkdir(__DIR__ . "/../../../public/images/icons/g/medium");
//mkdir(__DIR__ . "/../../../public/images/icons/g/half");
//mkdir(__DIR__ . "/../../../public/images/icons/g/gem");
//mkdir(__DIR__ . "/../../../public/images/icons/r");
//mkdir(__DIR__ . "/../../../public/images/icons/r/small");
//mkdir(__DIR__ . "/../../../public/images/icons/r/large");
//mkdir(__DIR__ . "/../../../public/images/icons/r/medium");
//mkdir(__DIR__ . "/../../../public/images/icons/r/half");
//mkdir(__DIR__ . "/../../../public/images/icons/r/gem");
$dir = opendir($sz_dir);
$n = 0;


$im = imagecreatetruecolor(48, 48);
imagealphablending($im, false);
imagesavealpha($im, true);
$im2 = imagecreatetruecolor(24, 24);
imagealphablending($im2, false);
imagesavealpha($im2, true);
$im3 = imagecreatetruecolor(54, 54);
imagealphablending($im3, false);
imagesavealpha($im3, true);
$im4 = imagecreatetruecolor(32, 32);
imagealphablending($im4, false);
imagesavealpha($im4, true);
$im5 = imagecreatetruecolor(14, 14);
imagealphablending($im5, false);
imagesavealpha($im5, true);

while ($file = readdir($dir)) {
    if (!preg_match('/^.+\.png$/', $file) || preg_match('/^resized_/', $file)) {
        continue;
    }
    //echo $sz_dir.$file."@".ceil(filesize($sz_dir.$file));
    echo $n++ . "\n";
    $res = imagecreatefrompng($sz_dir . $file);
    imagealphablending($res, false);
    imagesavealpha($res, true);
    //
    //	Remove spaces
    //
    $file = str_replace(' ', '', strtolower($file));

    imagecopyresampled($im, $res, 0, 0, 5, 5, 48, 48, 54, 54);
    imagecopyresampled($im2, $res, 0, 0, 5, 5, 24, 24, 54, 54);
    imagecopyresampled($im3, $res, 0, 0, 5, 5, 54, 54, 54, 54);
    imagecopyresampled($im4, $res, 0, 0, 5, 5, 32, 32, 54, 54);
    imagecopyresampled($im5, $res, 0, 0, 5, 5, 14, 14, 54, 54);

    imagepng($im, $sz_dir . "medium/" . $file);
    imagepng($im2, $sz_dir . "small/" . $file);
    imagepng($im3, $sz_dir . "large/" . $file);
    imagepng($im4, $sz_dir . "half/" . $file);
    imagepng($im5, $sz_dir . "gem/" . $file);

    convert($res, $sz_dir, $file);
    convert($im, $sz_dir, "medium/" . $file);
    convert($im2, $sz_dir, "small/" . $file);
    convert($im3, $sz_dir, "large/" . $file);
    convert($im4, $sz_dir, "half/" . $file);
    convert($im5, $sz_dir, "gem/" . $file);
}

function convert( $im, $dir, $file ) {

    imagefilter($im, IMG_FILTER_GRAYSCALE);
    imagepng($im, $dir . "g/" . $file);

    imagefilter($im, IMG_FILTER_CONTRAST, -32);
    imagefilter($im, IMG_FILTER_COLORIZE, 200, 0, 0);
    imagepng($im, $dir . "r/" . $file);
}