/**
 * @constructor
 * @param {number} postId
 * @param {Object} data
 * @param {Editable} editable
 */
function PostEditableObserver( postId, data, editable ) {
	GenericObserver.call( this, ['change'], new Handler( this.__onChange, this )); 
	this.postId = postId;
	this.data = data;
	this.editable = editable;
	this.editable.setData(this.data);
	this.editable.addObserver(this);
}

PostEditableObserver.prototype = new GenericObserver([],null);
PostEditableObserver.prototype.postId = "";
PostEditableObserver.prototype.data = null;
PostEditableObserver.prototype.editable = null;
PostEditableObserver.prototype.__onChange = function( e ) {
	if( e.is('change') ) {
		//TODO change to new api interface
		Ajax.post(
			'/php/interface/forum/forum.php', {
				'action': 'edit',
				'post': this.postId,
				'content': e.get('data')
			}, 
			new Handler(Chardev.__checkEdit_callback, Chardev), 
			null
		);
	}
};
PostEditableObserver.prototype.__saveCallback = function( response ) {
	try {	
		var newVal = Ajax.getResponseObject(response);
		this.data = newVal == null ? "" : newVal;			
	}
	catch( e ) {
		Tooltip.showError(e);
	}
	
	this.editable.setData(this.data);
};