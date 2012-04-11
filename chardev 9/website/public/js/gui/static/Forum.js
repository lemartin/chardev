/**
 * @constructor
 * @param posts
 */
function Forum( posts ) {
	var e;
	for( var k in posts ) {
		e = new PostEditable();
		new PostEditableObserver(posts[k]['PostID'], posts[k]['Data'], e);
		DOM.set('p'+posts[k]['PostID']+'_content', e.node);
	}
}