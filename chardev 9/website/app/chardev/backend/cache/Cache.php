<?php
namespace chardev\backend\cache;

/**
 * Implementation of a cache using memcached ({@link http://memcached.org/}).
 * Requires the Memcache PHP extension {@link
 * http://php.net/manual/en/book.memcache.php} TODO: Evaluate advantages of
 * Memcached
 * 
 * @author Martin Waßmann
 */
class Cache
{
	protected static $instance = null;
	/**
	 * Returns an instance of {@link Cache}
	 * 
	 * @return Cache
	 */
	public static function getInstance()
	{
		if (self::$instance == null)
		{
			self::$instance = new Cache( /*args*/);
		}
		return self::$instance;
	}
	
	protected $mc;
	protected function __construct( /*args*/) {
		$this->mc = new \Memcache ();
		$this->mc->connect ( 'localhost' );
	}
	
	/**
	 * Retrieves the value identified by given key from the cache
	 * 
	 * @param $key mixed
	 *       	 Key identifying the to be retrieved value
	 * @return mixed Retrieved value
	 */
	public function get($key)
	{
		return $this->mc->get ( $key );
	}
	
	/**
	 * Stores given value identified by given unique key in the cache
	 * 
	 * @param $key mixed
	 *       	 Unique key identifying the value
	 * @param $value mixed
	 *       	 Value to cache
	 * @throws \Exception If unable to add to cache
	 * @return mixed Stored value
	 */
	public function set($key, $value)
	{
		if (! $this->mc->set ( $key, $value, 1296000 ))
		{
			throw new \Exception ( "Unable to set cache" );
		}
		return $value;
	}
	
	public function flush() {
		return $this->mc->flush();
	}
}
?>