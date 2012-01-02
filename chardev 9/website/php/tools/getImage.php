<?php
	if(!isset($_GET['url'])) die;
	$url = "../../images/icons/".$_GET['url'].".png";
	if(!file_exists($url)) die;
	function imagetograyscale($im)
	{
		if (imageistruecolor($im)) {
			imagetruecolortopalette($im, false, 256);
		}
	
		for ($c = 0; $c < imagecolorstotal($im); $c++) {
			$col = imagecolorsforindex($im, $c);
			$gray = round(0.299 * $col['red'] + 0.587 * $col['green'] + 0.114 * $col['blue']);
			imagecolorset($im, $c, $gray, $gray, $gray);
		}
	}
	$res	=	imagecreatefrompng($url);
	imagetograyscale($res);
	imagepng($res);
?>