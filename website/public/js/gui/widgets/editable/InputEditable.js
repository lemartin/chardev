/**
 * @constructor
 */
function InputEditable() {
	Editable.call(this);
	
	this.div = Dom.create('div', {});
	
	this.input = new Input();

	Listener.add( this.input.node, 'blur', this.__edit, this, [false] );
	
	Listener.add( this.div, 'click', this.__edit, this, [true] );	

	this.form = Dom.create('form',{'action':'javascript:'});
	this.form.appendChild( this.input.node );
	
	Listener.add( this.form, 'submit', this.__onChange, this, [] );
}

InputEditable.prototype = new Editable;
InputEditable.prototype.input = null;
InputEditable.prototype.div = null;
InputEditable.prototype.form = null;
InputEditable.prototype.data = null;

InputEditable.prototype.setData = function(data) {
	this.data = data;
	this.input.setValue(data);
	this.disabled = false;
	
	var v = this.input.getValue();
	
	this.div.innerHTML = Editable.formatValue(v);
	Dom.set(this.node, this.div);
};
InputEditable.prototype.__edit = function( b ) {
	if( b ) {
		if( this.disabled || this.isReadOnly ) {
			return;
		}
		Dom.set(this.node, this.form);
		this.input.node.focus();
	}
	else {
		Dom.set(this.node, this.div);
		this.input.setValue(this.data);
	}
};
InputEditable.prototype.__onChange = function() {
	this.eventMgr.fire('change', { 'data': this.input.getValue()});
	Dom.set( this.node, Dom.create('img',{'src': '/images/site/bar_loading.gif', 'class': 'ui_bar_loading'}));
	this.disabled = true;
};
