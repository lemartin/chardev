/**
 * @constructor
 */
function PostEditable() {
	Editable.call(this);
	
	this.div = Dom.create('div', {});

	this.form = Dom.create('form',{'action':'javascript:'});
	this.textArea = Dom.createAt( this.form, 'textarea',{'class': 'textarea fo_edit'});

	Listener.add( this.textArea, 'blur', this.edit, this, [false] );
	
	Listener.add( this.div, 'click', this.edit, this, [true] );	

	
	Listener.add( this.form, 'submit', this.__onChange, this, [] );
}

PostEditable.prototype = new Editable;
PostEditable.prototype.textArea = null;
PostEditable.prototype.div = null;
PostEditable.prototype.form = null;
PostEditable.prototype.data = null;

PostEditable.prototype.setData = function(data) {
	this.data = data['PlainContent'];
	this.textArea.value = data['PlainContent'];
	this.disabled = false;
	
	this.div.innerHTML = data['ParsedContent'] ? data['ParsedContent'] : "<span class='ui_data_nothing'>Empty</span>";
	Dom.set(this.node, this.div);
};
PostEditable.prototype.edit = function( b ) {
	if( b ) {
		if( this.disabled || this.isReadOnly ) {
			return;
		}
		
		this.textArea.style.height = Math.max( 100, this.div.offsetHeight ) + "px";
		
		Dom.set(this.node, this.form);
		this.textArea.focus();
	}
	else {
		Dom.set(this.node, this.div);
		this.textArea.value = this.data;
	}
};
PostEditable.prototype.__onChange = function() {
	this.eventMgr.fire('change', { 'data': this.textArea.value });
	Dom.set( this.node, Dom.create('img',{'src': '/images/site/bar_loading.gif', 'class': 'ui_bar_loading'}));
	this.disabled = true;
};
