/** @const */var SWI_WEIGHT_STATS = [ 3,4,5,6,7,  13,14,15, 31,32,35,36,37,38,  43,45,49, 50];
/**
 * @constructor
 * @returns {StatWeightInterface}
 */
function StatWeightInterface () {
	this._overlay = new Overlay();
	
	this._node = document.createElement("div");
	this._node.className = 'swi_p';
	this._loadedParent = document.createElement("div");
	this._loadedParent.className = 'swi_lp';
	this._list = new StatWeightsList();
	this._list.setOnClickHandler(new Handler( this.preview, this));
	this._list.setOnContextMenuHandler(new Handler(this._onRemoveStatWeights, this));
	
	var layout = new StaticGrid(2,2);
	var save, refresh, restore, apply;
	var div, div2, yes, no, a, close;
	var weights;
	layout._node.className = 'swi_layout_t';
	layout._cols[0].className = 'swi_layout_lc';
	layout._cols[1].className = 'swi_layout_rc';
	layout.setVerticalAlign(SG_VALIGN_TOP);
	
	var sg = new StaticGrid(SWI_WEIGHT_STATS.length,2);
	sg._node.className = 'swi_stats_t';
	this._inputs = [];
	for( var i=0; i<SWI_WEIGHT_STATS.length; i++) {
		this._inputs[i] = document.createElement("input");
		this._inputs[i].className = 'input swi_in';
		this._inputs[i].name = SWI_WEIGHT_STATS[i];
		
		sg._cells[i][0].innerHTML = locale["ItemStatNames"][SWI_WEIGHT_STATS[i]];
		sg._cells[i][0].className = 'swi_stats';
		sg._cells[i][1].appendChild(this._inputs[i]);
		sg._cells[i][1].className = 'swi_input_p';
	}
	layout._cells[0][0].appendChild(sg._node);
	
	apply = document.createElement("input");
	apply.type = 'button';
	apply.value = 'Apply';
	Listener.add( apply, 'click', this._applyWeights, this, [] );
	
	restore = document.createElement("input");
	restore.type = 'button';
	restore.value = 'Restore Current';
	Listener.add( restore, 'click', this._restoreCurrent, this, [] );
	
	this._loadedParent.appendChild(this._list._node);
	
	layout._cells[0][0].appendChild(apply);
	layout._cells[0][0].appendChild(restore);
	layout._cells[0][1].appendChild(this._loadedParent);
	
	div = document.createElement("div");
	refresh = document.createElement("input");
	refresh.type = 'button';
	refresh.value = 'Refesh';
	Listener.add( refresh, 'click', function(){ this._updateList() }, this, [] );
	div.appendChild(refresh);
	div.className = 'swi_ref_p';
	layout._cells[0][1].appendChild(div);

	//
	//
	//	SAVE CTRLS
	//
	//
	this._isPublic = document.createElement("input"); 
	this._isPublic.type = 'checkbox';
	this._isPublic.checked = true;
	

	this._saveCtrls = document.createElement("div");
	
	this._isPublic = document.createElement("input"); 
	this._isPublic.type = 'checkbox';
	this._isPublic.checked = true;
	
	this._saveErrorNode = document.createElement("div");
	this._saveErrorNode.className = 'swi_save_error';
	
	this._saveCollapse = new Collapsable(); this._saveCollapse.toggle();
	this._saveCollapse._node.className = 'collapse swi_save_coll';
	
	this._saveCollapse._header.innerHTML = 'Save';
	this._saveCollapse._header.className = 'collapse_h swi_save_coll_h';
	
	save = document.createElement("input");
	save.type = 'button';
	save.value = 'save';
	Listener.add( save, 'click', this._onSaveClick, this, [] );
	
	this._description = document.createElement("input");
	this._description.className = 'input swi_save_in';
	
	this._name = document.createElement("input");
	this._name.className = 'input swi_save_in';

	this._saveCollapse._content.className = 'collapse_c';
	
	div2 = document.createElement("div");
	div2.innerHTML = 'Name';
	this._saveCtrls.appendChild(div2);
	this._saveCtrls.appendChild(this._name);
	
	div2 = document.createElement("div");
	div2.innerHTML = 'Description';
	this._saveCtrls.appendChild(div2);
	this._saveCtrls.appendChild(this._description);
	
	div2 = document.createElement("div");
	div2.className = 'swi_save_ctrls';
	div2.appendChild(document.createTextNode("Public"));
	div2.appendChild(this._isPublic);
	div2.appendChild(save);
	
	this._saveCtrls.appendChild(div2);
	this._saveCtrls.appendChild(this._saveErrorNode);
	//
	//
	//	REPLACE CTRLS
	//
	//
	yes = document.createElement("input");
	yes.type = 'button';
	yes.value = locale['Yes'];
	Listener.add(yes, 'click', this._onReplace, this, [true]);
	
	no = document.createElement("input");
	no.type = 'button';
	no.value = locale['No'];
	Listener.add(no, 'click', this._onReplace, this, [false]);
	
	this._replaceMsgNode = document.createElement("div");
	this._replaceCtrls = document.createElement("div");
	this._replaceCtrls.appendChild(this._replaceMsgNode);
	this._replaceCtrls.appendChild(yes);
	this._replaceCtrls.appendChild(no);
	//
	//
	//
	//
	//
	this._saveContent = document.createElement("div");
	this._saveContent.appendChild(this._saveCtrls);
	
	this._saveCollapse._content.appendChild(this._saveContent);
	
	layout._cells[1][0].appendChild(this._saveCollapse._node);
	
	layout._cells[1][0].className = 'swi_layout_llc';
	layout._cells[1][1].className = 'swi_layout_lrc';

	div = document.createElement("div");
	div.className = 'ol_top';
	
	div2 = document.createElement("div");
	div2.innerHTML = 'Stat Weights';
	div2.className = 'ol_top_l';
	div.appendChild(div2);
	//
	//	Close
	//
	a = document.createElement("a");
	a.className = 'ol_top_r';
	Listener.add(a, 'click', this._overlay.enable, this._overlay, []);
	div.appendChild(a);
	this._node.appendChild(div);
	
	close = document.createElement("input");
	close.type = 'button';
	//close.className = 'input';
	close.value = 'Close';
	Listener.add(close, 'click', this._overlay.enable, this._overlay, []);
	layout._cells[1][1].appendChild(close);
	
	div = document.createElement("div");
	div.className = 'ol_detail';
	div.appendChild(layout._node);
	this._node.appendChild(div);
	
	weights = [];
	for( i=0; i<ITEM_STATS_COUNT; i++ ) {
		weights[i] = 1.0;
	}
	
	this.set(weights);
}

StatWeightInterface.prototype._overlay = null;
StatWeightInterface.prototype._node = null;
StatWeightInterface.prototype._inputs = [];
StatWeightInterface.prototype._baseWeights = null;
StatWeightInterface.prototype._loadedParent = null;
StatWeightInterface.prototype._isPublic = null;
StatWeightInterface.prototype._description = null;
StatWeightInterface.prototype._name = null;
StatWeightInterface.prototype._saveErrorNode = null;
StatWeightInterface.prototype._saveCtrls = null;
StatWeightInterface.prototype._saveContent = null;
StatWeightInterface.prototype._replaceCtrls = null;
StatWeightInterface.prototype._replaceMsgNode = null;
StatWeightInterface.prototype._onWeightsChangeHandler = null;
StatWeightInterface.prototype._character = null;
StatWeightInterface.prototype._lastClassIdRequested = 0;
StatWeightInterface.prototype._saveCollapse = null;

/**
 * @param {Character} character
 */
StatWeightInterface.prototype.setCharacter = function( character ) {
	this._character = character;
	this._updateList();
};
StatWeightInterface.prototype._updateList = function() {
	if( this._character == null || this._character._chrClass == null ) {
		this._list.hide();
		this._lastClassIdRequested = 0;
	}
	else {
		this._list.show();
		this._list.set('chrclass.eq.'+this._character._chrClass._id+';', null, null);
		this._list.update();
		this._lastClassIdRequested = this._character._chrClass._id;
	}
};

StatWeightInterface.prototype.show = function() {
	if( this._character == null || this._character._chrClass == null ) {
		Tooltip.showError("Select a class first!");
	}
	else {
		if( this._character._chrClass._id != this._lastClassIdRequested ) {
			this._updateList();
		}
		this._overlay.showDisabled(this._node);
	}
};

StatWeightInterface.prototype.set = function( statWeights ) {
	this._baseWeights = statWeights;
	this.preview(this._baseWeights);
};

StatWeightInterface.prototype.preview = function( statWeights ) {
	for( var i=0; i<SWI_WEIGHT_STATS.length; i++) {
		this._inputs[i].value = TextIO.formatFloat2(statWeights[SWI_WEIGHT_STATS[i]]);
	}
};

StatWeightInterface.prototype.get = function() {
	var weights = [];
	var i;
	for( i=0; i<ITEM_STATS_COUNT; i++ ) {
		weights[i] = 0;
	}
	for( i=0; i<SWI_WEIGHT_STATS.length; i++) {
		weights[ parseInt(this._inputs[i].name,10) ] = parseFloat(this._inputs[i].value);
	}
	return weights;
};


StatWeightInterface.prototype._onStatsLoaded = function( weights, error ) {
	if( error ) {
		this._loadedParent.innerHTML = "Error while loading stat weights: "+error;
	}
	else {
		if( weights.length > 0 ) {
			for( var i=0; i<weights.length; i++ ) {
				this._loadedParent.appendChild(weights[i][0]);
			}
		}
		else {
			this._loadedParent.innerHTML = 'Nothing found!';
		}
	}
};

StatWeightInterface.prototype._onSaveClick = function() {
	this._save(false);
};

StatWeightInterface.prototype._onSave_callback = function( error, duplicate ) {
	if( !duplicate ) {
		Tools.setChild(this._saveContent,this._saveCtrls);
	}
	if( error ) {
		this._saveErrorNode.innerHTML = error;
	}
	else if( duplicate ) {
		this._replaceMsgNode.innerHTML = 'A stat weight configuration named \"'+this._name.value+'\" already exists. Do you want to overwrite it?';
		Tools.setChild(this._saveContent,this._replaceCtrls);
	}
	else {
		this._list.update();
		this._name.value = "";
		this._description.value = "";
		this._saveCollapse.collapse();
	}
};

StatWeightInterface.prototype._onReplace = function( replace ) {
	if( replace ) {
		this._save(true);
	}
	else {
		Tools.setChild(this._saveContent, this._saveCtrls);
	}
};

StatWeightInterface.prototype._save = function( overwrite ) {
	var weights = this.get();
	var name = this._name.value;
	var description = this._description.value;
	var isPublic = this._isPublic.checked;
	
	this._saveErrorNode.innerHTML = "";
	this._name.className = 'input swi_save_in';
	
	if( ! name ) {
		this._saveErrorNode.innerHTML += "Name for the stat weights is missing";
		this._name.className = 'input swi_save_in swi_save_in_error';
		return
	}
	else if( !this._character ) {
		Tooltip.showError("No character set!");
	} else if( this._character != null && this._character._chrClass == null ) {
		Tooltip.showError("You have to select a character class first!");
	}
	Tools.removeChilds(this._saveContent);
	this._saveContent.innerHTML = "<div class='swi_loading'></div>";
	
	DatabaseIO.saveWeightStats(weights, name, description, isPublic, overwrite, this._character._chrClass._id, new Handler(this._onSave_callback, this));
};

StatWeightInterface.prototype._restoreCurrent = function() {
	this.preview(this._baseWeights);
};
StatWeightInterface.prototype._applyWeights = function() {
	if( this._onWeightsChangeHandler ) {
		this._onWeightsChangeHandler.notify( [this.get()] );
	}
};
StatWeightInterface.prototype.setOnWeightsChangeHandler = function( handler ) {
	this._onWeightsChangeHandler = handler;
};

StatWeightInterface.prototype._onRemoveStatWeights = function( userId, name ) {
	if( g_settings.userId == userId && confirm( "Do you really want to delete the stat weight configuration "+name+"?")) {
		DatabaseIO.removeStatWeights( userId, name, new Handler(this._onRemoveStatWeights_callback,this));
	}
};
StatWeightInterface.prototype._onRemoveStatWeights_callback = function( error ) {
	if( error ) {
		Tooltip.showError(error);
	}
	else {
		this._updateList();
	}
};