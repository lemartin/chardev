<?php 
/*
 * column/mysql statement
 * 		s.`SomeColumn`
 * 		[s.`c1`,s.`c2`]
 * Valid Operators
 * 		NUMERIC = LT|GT|LE|GE|EQ|...
 * 		BINARY = AND|OR|...
 * 		STRING = LIKE|NLIKE|WLIKE|...
 * Variable name
 * 		itemsubclass
 * 		inventoryslot
 * 		...
 * 
 * [inventoryslot,MULTISELECT,[[1,'Head'],[2,'Neck'],...]]
 * [isunique,SELECT,[[1,'yes'],[0,'no']]]
 * [dps,INPUTRANGE,]
 */
	
	define("MISC_SLOT_MASK",1<<2|1<<11|1<<12|1<<19|1<<23);
	define("CLOTH_SLOT_MASK",1<<1|1<<3|1<<4|1<<5|1<<6|1<<7|1<<8|1<<9|1<<10|1<<16);
	define("LEATHER_SLOT_MASK",1<<1|1<<3|1<<5|1<<6|1<<7|1<<8|1<<9|1<<10);
	define("MAIL_SLOT_MASK",1<<1|1<<3|1<<5|1<<6|1<<7|1<<8|1<<9|1<<10);
	define("PLATE_SLOT_MASK",1<<1|1<<3|1<<5|1<<6|1<<7|1<<8|1<<9|1<<10);
	
	function filter_redirect() {
		if (isset($_POST['filter_redirect'])) {
			header("Location: ?items".parse_filter_post($_POST));
			die;
		}
	}

	function parse_filter_post() {
		$query = '';
		$arguments = '';
		parse_item_class($item_class,$item_sub_class_mask);
		
		if( $item_class >= 0 ) {
			$query .= '='.$item_class;
			if( isset($_POST['fms_subclass']) ) {
				$item_sub_class_mask = get_mask_from_array($_POST['fms_subclass']);
				$query.= '.'.$item_sub_class_mask;
			}
			//var_dump($_POST);
			for( $h=0; count($_POST['fx']) ; $h++) {
				$n = $_POST['fx'][$h];
				if( !isset($_POST['fv'.$n])) {
					break;
				}
				if( isset($_POST['fms'.$n]) && isset($_POST['fv'.$n]) ) {
					$arguments .= $_POST['fv'.$n].'.ba.'.get_mask_from_array($_POST['fms'.$n]).';';
				}
				else if( 
					isset($_POST['fi_min'.$n]) && 
					isset($_POST['fv'.$n])) 
				{
					$min = $_POST['fi_min'.$n] ? (int)$_POST['fi_min'.$n] : -1;
					$max = $_POST['fi_max'.$n] ? (int)$_POST['fi_max'.$n] : -1;
					if( $min == -1 && $max != -1 ) {
						$arguments .= $_POST['fv'.$n].'.le.'.$max.';';
					}
					else if( $min != -1 && $max == -1 ) {
						$arguments .= $_POST['fv'.$n].'.ge.'.$min.';';
					}
					else if( $min != -1 && $max != -1 ) {
						if( $min > $max ) {
							$tmp = $max;
							$max = $min;
							$min = $tmp;
						}
						$arguments .= $_POST['fv'.$n].'.btw.'.($min>=0?$min:0).'-'.(int)$_POST['fi_max'.$n].';';
					}
				}
				else if( 
					isset($_POST['fi'.$n]) && 
					isset($_POST['fv'.$n]) && 
					isset($_POST['fo'.$n]) && 
					$_POST['fi'.$n] !== '')
				{
					$arguments .= $_POST['fv'.$n].'.'.$_POST['fo'.$n].'.'.(int)$_POST['fi'.$n].';';
				}
			}
		}
		return $query.($arguments?'&a='.$arguments:'');
	}
	
	function get_mask_from_array($arr) {
		$mask = 0;
		for( $i = 0; $i < count($arr); $i++ ) 
		{
			$mask += 1<<(int)$arr[$i];
		}
		return $mask;
	}
	
	function parse_item_class( 
		&$item_class, 
		&$item_sub_class_mask
	) 
	{
		$item_class = -1;
		$item_sub_class = 0;
		$slot = 0;
		if( isset($_GET['items']) ) {
			$tmp = $_GET['items'];
			$tmp = explode(".",$tmp);
			$item_class = (int)$tmp[0];
			$item_sub_class_mask = isset($tmp[1]) ? (int)$tmp[1] : 0;
		}
	}
?>