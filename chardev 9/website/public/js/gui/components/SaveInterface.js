/**
 * @constructor
 */
function SaveInterface() {
	this.eventMgr = new GenericSubject();
	this.eventMgr.registerEvent('save',['name','desc']);
	this.eventMgr.registerEvent('update',[]);
	
	var div;
	
	this.node = DOM.create("div", {"class": 'im_parent'});
	//
	// Update	
	this.updateNode = DOM.create( 'form', {'action': 'javascript:'});
	Listener.add(this.updateNode,"submit",function() {
		this.eventMgr.fire('update');
	},this,[]);
	
	DOM.createAt( this.updateNode, 'div', {'class': 'content_header im_header','text':'Update the current profile'});

	DOM.append(
		DOM.createAt(this.updateNode, 'div', {'class': 'im_sa_b'}), 
		DOM.create('input', {'type': 'submit', 'value': 'Update', 'class': 'button button_light'})
	);
	
	DOM.append(DOM.createAt( this.node, "div", {'class': 'im_sa_inputs'}), this.updateNode);
	//
	// New
	this.newNode = DOM.create( 'form', {'action': 'javascript:'});
	Listener.add(this.newNode,"submit",function() {
		this.eventMgr.fire('save',{'name': DOM.getValue(this.nameInput), 'desc': DOM.getValue(this.descInput)});
	},this,[]);

	this.nameInput = DOM.create( 'input', {'class': 'input im_sa_in'});
	this.descInput = DOM.create( 'input', {'class': 'input im_sa_in'});
	
	DOM.createAt( this.newNode, 'div', {'class': 'content_header im_header','text':'Save as a profile'});
	
	div = DOM.createAt(this.newNode, 'div', {'class': 'im_sa_r'});
	DOM.createAt(div, 'div', {'class': 'im_sa_left', 'text': locale['S_ProfileName']});
	DOM.append(DOM.createAt(div, 'div', {'class': 'im_sa_right'}), this.nameInput);
	DOM.clear(div);
	
	div = DOM.createAt(this.newNode, 'div', {'class': 'im_sa_r'});
	DOM.createAt(div, 'div', {'class': 'im_sa_left', 'text': locale['S_CharacterDescription']});
	DOM.append(DOM.createAt(div, 'div', {'class': 'im_sa_right'}), this.descInput);
	DOM.clear(div);
	
	DOM.append(
		DOM.createAt(this.newNode, 'div', {'class': 'im_sa_b'}), 
		DOM.create('input', {'type': 'submit', 'value': 'Save', 'class': 'button button_light'})
	);
	
	DOM.append(DOM.createAt( this.node, "div", {'class': 'im_sa_inputs'}), this.newNode);
}

SaveInterface.prototype = {
	eventMgr: null,
	node: null,
	onSaveHandler: null,
	nameInput: null,
	descInput: null,
	submitButton: null,
	newNode: null, updateNode: null,
	update: function( updatable ) {
		this.updateNode.style.display = updatable ? "" : "none";
	}
};