/**
 * @constructor
 */
function SaveInterface() {
	this.eventMgr = new GenericSubject();
	this.eventMgr.registerEvent('save',['name','desc']);
	this.eventMgr.registerEvent('update',[]);
	
	var div;
	
	this.node = Dom.create("div", {"class": 'im_parent'});
	//
	// Update	
	this.updateNode = Dom.create( 'form', {'action': 'javascript:'});
	Listener.add(this.updateNode,"submit",function() {
		this.eventMgr.fire('update');
	},this,[]);
	
	Dom.createAt( this.updateNode, 'div', {'class': 'content_header im_header','text':'Update the current profile'});

	Dom.append(
		Dom.createAt(this.updateNode, 'div', {'class': 'im_sa_b'}), 
		Dom.create('input', {'type': 'submit', 'value': 'Update', 'class': 'button button_light'})
	);
	
	Dom.append(Dom.createAt( this.node, "div", {'class': 'im_sa_inputs'}), this.updateNode);
	//
	// New
	this.newNode = Dom.create( 'form', {'action': 'javascript:'});
	Listener.add(this.newNode,"submit",function() {
		this.eventMgr.fire('save',{'name': Dom.getValue(this.nameInput), 'desc': Dom.getValue(this.descInput)});
	},this,[]);

	this.nameInput = Dom.create( 'input', {'class': 'input im_sa_in'});
	this.descInput = Dom.create( 'input', {'class': 'input im_sa_in'});
	
	Dom.createAt( this.newNode, 'div', {'class': 'content_header im_header','text':'Save as a profile'});
	
	div = Dom.createAt(this.newNode, 'div', {'class': 'im_sa_r'});
	Dom.createAt(div, 'div', {'class': 'im_sa_left', 'text': locale['S_ProfileName']});
	Dom.append(Dom.createAt(div, 'div', {'class': 'im_sa_right'}), this.nameInput);
	Dom.clear(div);
	
	div = Dom.createAt(this.newNode, 'div', {'class': 'im_sa_r'});
	Dom.createAt(div, 'div', {'class': 'im_sa_left', 'text': locale['S_CharacterDescription']});
	Dom.append(Dom.createAt(div, 'div', {'class': 'im_sa_right'}), this.descInput);
	Dom.clear(div);
	
	Dom.append(
		Dom.createAt(this.newNode, 'div', {'class': 'im_sa_b'}), 
		Dom.create('input', {'type': 'submit', 'value': 'Save', 'class': 'button button_light'})
	);
	
	Dom.append(Dom.createAt( this.node, "div", {'class': 'im_sa_inputs'}), this.newNode);
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
	},
	/**
	 * @param {GenericObserver} observer
	 */
	addObserver: function( observer ) {
		this.eventMgr.addObserver(observer);
	}
};