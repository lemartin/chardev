/**
 * @constructor
 */
function InputEditable() {
	Editable.call(this);
	
	this.div = DOM.create('div', {});
	
	this.input = new Input();

	Listener.add( this.input.node, 'blur', this.__edit, this, [false] );
	
	Listener.add( this.div, 'click', this.__edit, this, [true] );	

	this.form = DOM.create('form',{'action':'javascript:'});
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
	
	this.div.innerHTML = v ? v : "<span class='ui_data_nothing'>None</span>";
	DOM.set(this.node, this.div);
};
InputEditable.prototype.__edit = function( b ) {
	if( b ) {
		if( this.disabled || this.isReadOnly ) {
			return;
		}
		DOM.set(this.node, this.form);
		this.input.node.focus();
	}
	else {
		DOM.set(this.node, this.div);
		this.input.setValue(this.data);
	}
};
InputEditable.prototype.__onChange = function() {
	this.eventMgr.fire('change', { 'data': this.input.getValue()});
	DOM.set( this.node, DOM.create('img',{'src': 'images/site/bar_loading.gif', 'class': 'ui_bar_loading'}));
	this.disabled = true;
};
