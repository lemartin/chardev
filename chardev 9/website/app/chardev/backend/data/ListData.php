<?php
namespace chardev\backend\data;

define("EQ",1<<0,true);
define("NE",1<<1,true);
define("GE",1<<2,true);
define("LE",1<<3,true);
define("GT",1<<4,true);
define("LT",1<<5,true);
define("BA",1<<6,true);
define("BO",1<<7,true);
define("BX",1<<8,true);
define("LIKE",1<<9,true);
define("NLIK",1<<10,true);
define("WLIKE",1<<11,true);
define("WNLIK",1<<12,true);
define("BNA",1<<13,true);
define("BNO",1<<14,true);
define("BNX",1<<15,true);
define("IN",1<<16,true);
define("NIN",1<<17,true);
define("BTW",1<<18,true);

abstract class ListData
{	
// 	const EQ = 1;
// 	const NE = 2;
// 	const GE = 4;
// 	const LE = 8;
// 	const GT = 16;
// 	const LT = 32;
// 	const BA = 64;
// 	const BO = 128;
// 	const BX = 256;
// 	const LIKE = 512;
// 	const NLIK = 1024;
// 	const WLIKE = 2048;
// 	const WNLIK = 4096;
// 	const BNA = 8192;
// 	const BNO = 16384;
// 	const BNX = 32768;
// 	const IN = 65536;
// 	const NIN = 131072;
// 	const BTW = 262144;
	
	protected static $g_operator_to_mysql = array(
		1=>"=", 2=>"!=", 4=>">=", 8=>"<=", 16=>">", 32=>"<", 64=>"&",
		128=>"|", 256=>"^", 512=>" LIKE ", 1024=>" NOT LIKE ", 
		2048=>" LIKE ", 4096=>" NOT LIKE "
	);
	
	protected function parseStringArgument( &$where, &$values, $operator, $value, $column )
	{
		$op_str = self::$g_operator_to_mysql[$operator];
	
		if( ($operator&(LIKE|NLIK|WLIKE|WNLIK)) == 0 ) {
			throw new \Exception("Invalid operator: ".$op_str);
			return;
		}
		if( ($operator&(WLIKE|WNLIK)) != 0 ) {
			$tmp = explode(" ",$value);
			foreach( $tmp as $word ) {
				$where .= ( $where?" AND ":"" ) . $column . $op_str . "?";
				$values[] = '%'.$word.'%';
			}
		}
		else {
			$where .= ( $where?" AND ":"" ) . $column . $op_str . "?";
			$values[] = '%'.$value.'%';
		}
	}
	
	protected function parseNumericArgument( &$where, &$values, $operator, $value, $column )
	{
		$str = "";
	
		if( ($operator&(LIKE|NLIK|WLIKE|WNLIK)) != 0 ) {
			throw new \Exception("Invalid operator: ".self::$g_operator_to_mysql[$operator]);
			return;
		}
		if( ($operator&(BA|BO|BX|BNA|BNO|BNX)) != 0 ) {
			$str = " ((1<<". $column . ") " . self::$g_operator_to_mysql[$operator] . "?)";
			$values[] = $value;
		}
		else if(($operator&(IN|NIN)) != 0 ) {
			//TODO implement me!
			throw new \Exception("Not yet implemented!");
		}
		else if(($operator&(BTW)) != 0 ) {
			$tmp = explode('-',$value);
	
			if( $tmp[0] ) {
				$str .= $column . ">= ?";
				$values[] = (float)$tmp[0];
			}
			if( $tmp[1] ) {
				$str .= ( $str ? " AND " : "" ) . $column . "<= ?";
				$values[] = (float)$tmp[1];
			}
	
			$str = $str ? "(".$str.")" : "";
		}
		else {
			$str = "(" . $column . self::$g_operator_to_mysql[$operator] . "?)";
			$values[] = $value;
		}
		if( $str ) {
			$where .= ( $where?" AND ":"" ) . $str ;
		}
	}
	
	protected function parseBinaryArgument( &$where, &$values, $operator, $value, $column, $notRequired = false )
	{
		$op_str = self::$g_operator_to_mysql[$operator];
		$str = "";
	
		if( ($operator&(LIKE|NLIK|WLIKE|WNLIK)) != 0 ) {
			throw new \Exception("Invalid operator: ".$op_str);
			return;
		}
		if( ($operator&(BA|BO|BX|BNA|BNO|BNX)) != 0 ) {
			//TODO <= 0 ?
			$str = " (". $column . " " . $op_str . "?" . ( $notRequired ? " OR ". $column . " <= '0'" : "" ) .  ")";
			$values[] = $value;
		}
		else {
			throw new \Exception("Not yet implemented!");
		}
	
		$where .= ( $where?" AND ":"" ) . $str ;
	}
	
	protected function parseArguments( $arguments, &$matches) {
		preg_match_all('/(?:^|;)([\w]+)\.(eq|ne|ge|le|lt|gt|ba|bo|bx|bna|bno|bnx|like|nlik|wlike|wnlik|in|nin|btw)\.([^;]+)/',$arguments,$matches,PREG_SET_ORDER);
	}
	
	protected function parseOrder( $order, $map ) {
		$matches = array();
		$orderClause = "";
		preg_match_all('/(?:^|;)([\w]*)\.(?:(asc)|(desc))/',$order,$matches,PREG_SET_ORDER);
	
		for( $i=0; $i<count($matches); $i++ ) {
			if( isset($map[$matches[$i][1]])) {
				$orderClause .= ($orderClause ? ", " : "") . $map[$matches[$i][1]] . ( $matches[$i][2] ? " ASC" : " DESC" );
			}
		}
	
		return $orderClause;
	}
	
	protected function parseFlags( $flags, &$matches ) {
		preg_match_all('/(?:^|;)(!?)(\w+)/',$flags,$matches,PREG_SET_ORDER);
	}
}

?>