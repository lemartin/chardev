/**
 * @constructor
 * @param {Object} realms
 */
function BattleNetProfileEditable( realms ) {
	var show = [], n = 0, form, btn, div;
	
	Editable.call( this );
	
	this.realms = realms;
	
	this.node.className = 'bnpm_c';
	
	this.content = document.createElement("div");
	this.content.className = 'bnpm_content';
	
	this.editParent = document.createElement("div");
	
	this.addLink = document.createElement("a");
	this.addLink.className = 'add bnpm_add_link';
	this.addLink.href = 'javascript:';
	this.addLink.innerHTML = 'Add a Battle.net Profile';
	
	Listener.add( this.addLink, 'click', this.__onAdd, this, [] );
	
	var sg = new StaticGrid(2,3);
	sg.node.className = 'bnpm_grid';
	
	this.editParent.appendChild(this.addLink);
	
	this.node.appendChild( this.content );
	this.node.appendChild( this.editParent );
	
	this.nameInput = new Input();
	this.realmSelect = new SingleSelect([]);
	this.realmSelect.node.className += " single_select_focussable";
	this.regionSelect = new SingleSelect([]);
	this.regionSelect.node.className += " single_select_focussable";
	
	sg.cols[0].width = "160px";
	sg.cols[1].width = "160px";
	sg.cols[2].width = "160px";
	
	sg.cells[0][0].innerHTML = 'Name';
	sg.cells[0][1].innerHTML = 'Region';
	sg.cells[0][2].innerHTML = 'Realm';
	
	sg.cells[1][0].appendChild(this.nameInput.node);
	sg.cells[1][1].appendChild(this.regionSelect.node);
	sg.cells[1][2].appendChild(this.realmSelect.node);

	this.nameInput.node.className += ' bnpm_input';
	this.regionSelect.node.className += ' bnpm_select';
	this.realmSelect.node.className += ' bnpm_select';

	this.addParent = document.createElement("div");
	this.addParent.className = 'bnpm_add_parent';
	//
	//
	//
	div = document.createElement("div");
	div.className = 'group bnpm_input_parent';

	div.appendChild(sg.node);
	
	form = document.createElement("form");
	form.action = "javascript:";
	Listener.add( form, 'submit', this.__onSubmit, this, [] );
	form.appendChild(div);
	
	//
	//
	//
	div = document.createElement("div");
	btn = document.createElement('input');
	btn.type ='button';
	Tools.jsCssClassHandler( btn, { 'default': "button button_light bnpm_add_cancel_btn", 'hover': "button_light_hover"});
	btn.value = 'Cancel';
	Listener.add( btn, 'click', this.__onCancel, this, [] );

	div.appendChild(btn);
	
	btn = document.createElement('input');
	btn.type ='submit';
	Tools.jsCssClassHandler( btn, { 'default': "button button_light bnpm_add_add_btn", 'hover': "button_light_hover"});
	btn.value = 'Add';
	
	div.appendChild(btn);
	div.className = 'bnpm_add_ctrl_parent';
	form.appendChild(div);
	
	this.addParent.appendChild(form);

	Listener.add( this.regionSelect.node, 'change', this.__onRegionSelect, this, []);
	
	for( var k in realms ) {
		show[n++] = [k, locale['Regions'][k]];
	}
	this.regionSelect.set(show);
	this.regionSelect.select('us');
	this.__setRealms(this.regionSelect.getValue());
}

BattleNetProfileEditable.prototype = new Editable;
BattleNetProfileEditable.prototype.node= null;
BattleNetProfileEditable.prototype.content= null;
BattleNetProfileEditable.prototype.editParent= null;
BattleNetProfileEditable.prototype.addParent= null;
BattleNetProfileEditable.prototype.addLink= null;
BattleNetProfileEditable.prototype.profiles = null;
BattleNetProfileEditable.prototype.realms = null;

BattleNetProfileEditable.prototype.nameInput = null;
BattleNetProfileEditable.prototype.realmSelect = null;
BattleNetProfileEditable.prototype.regionSelect = null;

BattleNetProfileEditable.prototype.setData= function( profiles ) {
	var profile, div;
	
	this.profiles = profiles;
	this.content.innerHTML = "";
	
	for( var i in profiles ) {
		profile = profiles[i];
		
		div = document.createElement("div");
		div.className = 'group bnpm_entry';

		var a = DOM.createAt(div,'a',{'href': 'javascript:;', 'class': 'remove bnpm_remove'});
		Listener.add( a, 'click', this.__onRemove, this, [profile, div] );
		
		DOM.createAt(div,'span',{'text': profile['Name'], 'class': 'bnpm_name'});
		
		DOM.createAt(div,'span',{'text': ", " + profile['Level'] + " " + locale['CharacterRace'][profile['CharacterRaceID']] + " "});

		DOM.createAt(div,'span',{'text': locale['CharacterClass'][profile['CharacterClassID']], 'class': 'character_class_'+profile['CharacterClassID']+' bnpm_chrclass'});
		
		DOM.createAt(div,'span',{'text': ", " + profile['Region'].toUpperCase()+"-"+profile['Realm'], 'class': 'bnpm_origin'});
		
		DOM.createAt(div,'br',{});
		
		DOM.createAt(div,'a', {
			'href': TextIO.queryString({'planner':'','name': profile['Name'], 'realm': profile['Realm'], 'region': profile['Region'] }),
			'text': "Static link to import this character from Battle.net into chardev",
			'class': "bnpm_static_link"
		});
		
		this.content.appendChild(div);
	}
	
	this.disabled = false;
	DOM.set( this.editParent, this.addLink);
};

BattleNetProfileEditable.prototype.__onCancel= function() {
	DOM.set( this.editParent, this.addLink);
};
BattleNetProfileEditable.prototype.__onAdd= function() {
	DOM.set( this.editParent, this.addParent);
};
BattleNetProfileEditable.prototype.__onRemove= function( profile, node ) {
	if( this.disabled ) {
		return;
	}
	
	this.eventMgr.fire('change', { 'data': JSON.stringify({ 
		'removeBattleNetProfile': profile 
	})});
	node.innerHTML = "<img src='images/site/bar_loading.gif' class='bnpm_bar_loading' />";
};
BattleNetProfileEditable.prototype.validInputs = function() {
	var n = this.nameInput.getValue();
	if( n.length < 2 ) {
		Tooltip.showError("Character name is too short!");
		return false;
	}
	if( n.length > 12 ) {
		Tooltip.showError("Character name is too long!");
		return false;
	}
	return true;
};
BattleNetProfileEditable.prototype.__onSubmit= function() {
	if( this.disabled || ! this.validInputs() ) {
		return;
	}
	
	this.disabled = true;
	

	this.eventMgr.fire('change', { 'data': JSON.stringify({ 
		'addBattleNetProfile': { 
			'Name': this.nameInput.getValue(), 
			'Realm': this.realmSelect.getValue(),
			'Region': this.regionSelect.getValue() 
		}
	})});
	
	this.editParent.innerHTML = "<img src='images/site/bar_loading.gif' class='ui_bar_loading' />";
};
BattleNetProfileEditable.prototype.__onRegionSelect= function() {
	this.__setRealms(this.regionSelect.getValue());
};
BattleNetProfileEditable.prototype.__setRealms = function( region ) {
	var show = [], n=0;
	for( var k in this.realms[region] ) {
		show[n++] = [ this.realms[region][k], this.realms[region][k]];
	}
	this.realmSelect.set(show);
};