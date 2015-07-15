<?php
namespace Chardev\Forum;

interface IForum {
	public function deleteHook( Chardev_IHook $hook );
	public function deleteThread( Chardev_IThread $thread );
	public function deletePost( Chardev_IPost $post );
	
	/**
	 * 
	 * 
	 * @param Chardev_IPost $post
	 * @param string $newContent
	 */
	public function editPost( Chardev_IPost $post, $newContent );
	public function getThread( $threadId );
	public function getHook( $hookId );
	
	public function getPost( $postId );
}

