/**
 * @constructor
 * @param {number} userId
 * @param {Object} data
 * @param {string} targetElementId
 */
function UserInformationImpl( userId, data, targetElementId ) {
	this.data = data;
	this.targetElementId = targetElementId;
	this.map = new Object();
	this.node = document.createElement("div");
	this.editables = [];
	this.userId = userId;
	
	var k = 0, sg, n = 0;
	
	DOM.set(document.getElementById(this.targetElementId), this.node);
	
	sg = new StaticGrid(0,2);
	sg.setVerticalAlign(StaticGrid.VALIGN_TOP);
	sg.node.className = "ui_data_tab";
	
	for( k in this.data ) {
		this.map[k] = n;
		
		sg.addRow();
		sg.cells[n][0].className = "ui_data_label";
		sg.cells[n][0].innerHTML = this.data[k]['label'];
		
		sg.cells[n][1].className = "ui_data_data";
			
		if( this.data[k]['editable'] == 'select'  ) {
			this.editables[n] = new SelectEditable( this.data[k]['options']);
			this.editables[n].node.className += "ui_data_select";
		}
		else if( this.data[k]['editable'] == 'input' ){
			this.editables[n] = new InputEditable();
			this.editables[n].node.className += "ui_data_input";
		}
		else if( this.data[k]['editable'] == 'battlenetprofilemanager' ){
			this.editables[n] = new BattleNetProfileEditable( this.data[k]['realms'] );
			
			sg.cells[n][0].appendChild(ChardevHTML.getInfo("<div>These profiles will be shown in the import section of the character planner, so you can quickly import them, without having to type the character name or select region and realm.</div>"));
		}
		else {
			throw new Error("Unknown editable "+this.data[k]['editable']);
		}
		new UserEditableObserver( k, this.data[k]['data'], this.editables[n]);
		this.editables[n].readOnly( g_settings.userId != this.userId );
		sg.cells[n][1].appendChild( this.editables[n].node );
		

//		Listener.add( this.editables[n].node, 'blur', this.__hideEditable, this, [k] );

		this.editables[n].setData( this.data[k]['data'] );
		
//		Listener.add( div, 'click', this.__edit, this, [k] );
		n++;
	}
	
	this.node.appendChild(sg.node);
}

UserInformationImpl.prototype = {
	data: {},
	editables: [],
	node: null,
	map: {},
	userId: 0,
	targetElementId: ""
};

/**
 * @constructor
 * @param {string} key
 * @param {Object} data
 * @param {Editable} editable
 */
function UserEditableObserver( key, data, editable ) {
	GenericObserver.call( this, ['change'], new Handler( this.__onChange, this )); 
	this.key = key;
	this.data = data;
	this.editable = editable;
	this.editable.addObserver(this);
}

UserEditableObserver.prototype = new GenericObserver([],null);
UserEditableObserver.prototype.key = "";
UserEditableObserver.prototype.data = null;
UserEditableObserver.prototype.editable = null;
UserEditableObserver.prototype.__onChange = function( e ) {
	if( e.is('change') ) {
		var obj = {};
		
		obj[this.key] = e.get('data');
		
		Ajax.request(
			'php/interface/user/set_user_setting.php' + TextIO.queryString(obj),
			new Handler( this.__saveCallback, this ) ,
			[]
		);
	}
};
UserEditableObserver.prototype.__saveCallback = function( response ) {
	try {	
		var newVal = Ajax.getResponseObject(response);
		this.data = newVal == null ? "" : newVal;			
	}
	catch( e ) {
		Tooltip.showError(e);
	}
	
	this.editable.setData(this.data);
};