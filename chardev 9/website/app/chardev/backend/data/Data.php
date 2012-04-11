<?php
namespace chardev\backend\data;

use chardev\backend\IDatabase;

use chardev\Language;

use chardev\backend\CacheException;
use chardev\backend\Constants;
use chardev\backend\DoesNotExistException;
use chardev\backend\cache\Cache;

/**
 * Base class for all data entities This class enables the use of a cache for
 * all sub-classes. The cache used is realised in {@link Cache}.  
 */
abstract class Data
{
	protected $database = null;
	protected $language = null;
	
	/**
	 * This Method is called whenever requested entity data was not available
	 * through used caching mechanisms. Sub-classes should use this method to
	 * retrieve the requested data from the database.
	 * 
	 * @param $id int ID of the to be retrieved data
	 * @return array Entity data
	 */
	protected abstract function getData($id);
	
	/**
	 * Returns an array containing the data of the entity identified by given
	 * ID.
	 * 
	 * @param $id int ID of the to be retrieved data
	 * @return array Entity data
	 */
	public function fromId($id)
	{
		try 
		{
			if ($id < 1)
			{
				return null;
			}
			//
			// use caching?
			if (Constants::USE_CACHE)
			{
				//
				// try to retrieve the requested entity data
				$key = $this->getKey($id);
				//
				// if succesful, return the cached data
				if (false !== ($value = Cache::getInstance()->get( $key )))
				{
					return $value;
				} 			
				//
				// else query the getData method
				else
				{
					return Cache::getInstance()->set( $key, $this->getData ( $id ) );
				}
			} 
			else
			{
				//
				// no caching, always query getData
				return $this->getData ( $id );
			}
		}
		catch( DoesNotExistException $dnee ) 
		{
			if( Constants::STRICT ) {
				throw new \Exception( "Unable to load " . get_class($this) . " (id: {$id})", 0, $dnee );
			}	
			else {
				return null;
			}
		}
	}
	
	public function fromIds( $ids ) {
		$datas = array();
		if( ! Constants::USE_CACHE ) {
			for( $i=0; $i<count($ids); $i++ ) {
				$datas[$i] = $this->fromId($ids[$i]);
			}
		}
		else {
			$n = count($ids);
			for( $i=0; $i<$n; $i++ ) {
				$id = $ids[$i];
				$key = $this->getKey( $id );
				if(false !== ($value = Cache::getInstance()->get($key))) {
					$datas[$i] = $value;
				}
				else {
					try
					{
						$datas[$i] = Cache::getInstance()->set( $key, $this->getData ($id) );
					}
					catch( DoesNotExistException $dnee ) 
					{
						if( Constants::STRICT ) {
							throw new \Exception( "Unable to load " . get_class($this) . " (id: {$id})", 0, $dnee );
						}	
						else {
							$datas[$i] = null;
						}
					}
				}
			}
		}
		return $datas;
	}
	
	private function getKey( $id ) {
		return preg_replace('/\\\\/', '', get_class($this) . Language::getInstance()->toSuffixString() . $id);
	}
}

?>