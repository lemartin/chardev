/**
 * @constructor
 * @returns {ReforgeOptimisationInterface}
 */
function ReforgeOptimisationInterface() {
	var i, j, frmContent, sub, showStatWeightInterface, resetStatCaps, div;
	//
	//
	//
	this._eventManager = new EventManager([
        "show_stat_weights_interface",
        "stat_weight_change",
        "stat_cap_change",
        "stat_caps_reset",
        "use_optimised_reforge",
        "optimise"
	]);
	//
	this._node = document.createElement("form");
	frmContent = document.createElement("div");
	this._node.onsubmit = function(){return false;};
	this._node.action = '#';
	Listener.add( this._node, 'submit', this._eventManager.fire, this._eventManager, ['optimise', null] );
	
	this._useOpInput = document.createElement("input");
	this._useOpInput.value = locale['RF_Apply'];
	this._useOpInput.type = 'button';
	this._useOpInput.disabled = true;
	Listener.add( this._useOpInput, 'click', this._eventManager.fire, this._eventManager, ['use_optimised_reforge', null] );
	
	this._weightInputs = [];
	this._capInputs = [];
	for( i=0; i<REFORGABLE_STATS.length; i++ ) {
		this._weightInputs[i] = document.createElement("input");
		this._weightInputs[i].className = 'input rf_op_in';
		this._weightInputs[i].value = DEFAULT_WEIGHTS[i];
		Listener.add( this._weightInputs[i], 'blur', this._onWeightsChange, this, [i] );
		
		this._capInputs[i] = document.createElement("input");
		this._capInputs[i].className = 'input rf_op_in';
		this._capInputs[i].value = DEFAULT_CAPS[i];
		Listener.add( this._capInputs[i], 'blur', this._onCapsChange, this, [i] );
	}

	this._opTable = new StaticGrid(25,10);
	this._opTable._node.className = 'rf_op_table';
	for( i=1; i<=INV_ITEMS; i++ ) {
		this._opTable._cells[i][0].className = 'rf_op_cell rf_op_itm';
		for( j=1; j<9; j++) {
			this._opTable._cells[i][j].className = 'rf_op_cell';
		}
		this._opTable._cells[i][9].className = 'rf_op_cell rf_op_tot';
	}

	this._opTable._cells[20][0].innerHTML = locale['RF_Sum'];
	this._opTable._cells[21][0].innerHTML = locale['RF_WeightedSum'];
	this._opTable._cells[22][0].innerHTML = locale['RF_Weights'];
	this._opTable._cells[23][0].innerHTML = locale['RF_Caps'];
	this._opTable._cells[24][0].innerHTML = locale['RF_Ratings'];

	for( i=1; i<9; i++) {
		this._opTable._cells[0][i].innerHTML = locale['RF_Stats'][i-1];
		this._opTable._cells[0][i].className = 'rf_op_cell rf_op_stat rf_op_header';
		this._opTable._cells[20][i].className = 'rf_op_cell rf_op_sum';
		this._opTable._cells[21][i].className = 'rf_op_cell rf_op_sum';
		this._opTable._cells[24][i].className = 'rf_op_cell';
		
		this._opTable._cells[22][i].appendChild( this._weightInputs[i-1] );
		this._opTable._cells[23][i].appendChild( this._capInputs[i-1] );
	}
	this._opTable._cells[0][9].innerHTML = locale['RF_Total'];
	this._opTable._cells[0][9].className = 'rf_op_cell rf_op_tot rf_op_header';
	this._opTable._cells[20][9].className = 'rf_op_cell rf_op_tot';
	this._opTable._cells[21][9].className = 'rf_op_cell rf_op_tot';
	frmContent.appendChild(this._opTable._node);
	
	resetStatCaps = document.createElement("input");
	resetStatCaps.type = 'button';
	resetStatCaps.value = 'Reset Caps';
	Listener.add( resetStatCaps, 'click', this._eventManager.fire, this._eventManager, ['stat_caps_reset',null]);
	
	sub = document.createElement("input");
	sub.type = "submit";
	sub.value = locale['RF_Optimise'];
	frmContent.appendChild(sub);

	frmContent.appendChild(this._useOpInput);

	showStatWeightInterface = document.createElement("input");
	showStatWeightInterface.value = "Manage Stat Weights";
	showStatWeightInterface.type = "button";
	Listener.add(showStatWeightInterface, 'click', this._eventManager.fire, this._eventManager, ['show_stat_weights_interface',null]);
	frmContent.appendChild(showStatWeightInterface);
	frmContent.appendChild(resetStatCaps);
	this._node.appendChild(frmContent);
	
	div = document.createElement('div');
	div._className = 'rf_op_notice';
	
	this._node.appendChild(div);
}
/** @type {EventManager} */
ReforgeOptimisationInterface.prototype._eventManager = null;
/** @type {Element} */
ReforgeOptimisationInterface.prototype._node = null;
/** @type {StaticGrid} */
ReforgeOptimisationInterface.prototype._opTable = null;
ReforgeOptimisationInterface.prototype._weightInputs = [];
ReforgeOptimisationInterface.prototype._capInputs = [];
/** @type {Element} */
ReforgeOptimisationInterface.prototype._useOpInput = null;
/** @type {Handler} */
ReforgeOptimisationInterface.prototype._reforgeHandler = null;
/**
 * @param {number} stat
 */
ReforgeOptimisationInterface.prototype._onWeightsChange = function( stat ) {
	this._eventManager.fire('stat_weight_change', [REFORGABLE_STATS[stat], parseFloat(this._weightInputs[stat].value)]);
};
/**
 * @param {number} stat
 */
ReforgeOptimisationInterface.prototype._onCapsChange = function( stat ) {
	this._eventManager.fire('stat_cap_change', [stat, parseFloat(this._capInputs[stat].value)]);
};

ReforgeOptimisationInterface.prototype._getWeights = function() {
	var weights = [];
	var x;
	for( var i=0; i<REFORGABLE_STATS.length; i++ ) {
		
		x = parseFloat(this._weightInputs[i].value);
		weights[i] = isNaN(x) ? 0 : x;
		this._weightInputs[i].value = parseFloat(weights[i]);
	}
	return weights;
};

ReforgeOptimisationInterface.prototype._getCaps = function() {
	var caps = [];
	var x;
	for( var i=0; i<REFORGABLE_STATS.length; i++ ) {
		
		x = parseInt(this._capInputs[i].value, 10);
		caps[i] = isNaN(x) ? 0 : x;
		this._capInputs[i].value = parseInt(caps[i], 10);

	}
	return caps;
};

/**
 * @param {Character} character
 */
ReforgeOptimisationInterface.prototype.update = function( character ) {
	var itm, a;
	for( var i=0; i<INV_ITEMS; i++ ) {
		Tools.removeChilds(this._opTable._cells[i+1][0]);
		itm = character._inventory.get(i);
		if( !itm ) {
			this._opTable._cells[i+1][0].innerHTML = locale['RF_NotEquipped'];
			continue;
		}
		a = document.createElement('a');
		a.className = 'rf_op_itm';
		a.innerHTML = itm._name.length > 12 ? itm._name.substring(0,10)+"..." : itm._name;
		a.style.color = g_color[itm._quality];
		a.onmouseout = function(){Tooltip.hide();};
		a.onmousemove = function(){Tooltip.move();};
		Listener.add( a, 'mouseover', Tooltip.showItemBySlot, Tooltip, [i] );
		this._opTable._cells[i+1][0].appendChild(a);
	}

	this._useOpInput.disabled = true;
	this.updateRatings(character._stats.getReforgeRatings());
};
/**
 * @param {ReforgeOptimiser} reforgeOptimiser
 */
ReforgeOptimisationInterface.prototype.updateValues = function( reforgeOptimiser ) {
	var i,j, v,o, isNew, total = 0, totalOptimised = 0;
	var currentValues = reforgeOptimiser._currentValues;
	var optimisedValues =  reforgeOptimiser._optimisedReforgeConfiguration ? reforgeOptimiser._optimisedValues : null;
	var itemRatings = reforgeOptimiser._itemRatings;
	
	for( i=0; i<INV_ITEMS; i++ ) {
		for( j=0; j<REFORGABLE_STATS.length; j++ ) {
			v = currentValues[i][j];
			isNew = optimisedValues != null && optimisedValues[i][j] != currentValues[i][j];
			
			this._opTable._cells[i+1][j+1].innerHTML = "";
			

			if ( itemRatings[i] && itemRatings[i][j] > 0 ){
				this._opTable._cells[i+1][j+1].innerHTML = "<span class='rf_op_value'>"+itemRatings[i][j]+"</span>";
			}
			
			if( isNew ) {
				if( v > 0 ) {
					this._opTable._cells[i+1][j+1].innerHTML += "<span class='rf_op_added_old'>+"+v+"</span> ";
				}
				else if ( v < 0 ){
					this._opTable._cells[i+1][j+1].innerHTML += "<span class='rf_op_reduce_old'>"+v+"</span> ";
				}
				v = optimisedValues[i][j];
			}

			if( v > 0 ) {
				this._opTable._cells[i+1][j+1].innerHTML += "<span class='rf_op_added" + ( isNew ? '_new' : '' ) + "'>+"+v+"</span>";
			}
			else if ( v < 0 ){
				this._opTable._cells[i+1][j+1].innerHTML += "<span class='rf_op_reduce" + ( isNew ? '_new' : '' ) + "'>"+v+"</span>";
			}
		}
	}
	for( j=0; j<REFORGABLE_STATS.length; j++ ) {
		v = Math.round(currentValues[INV_ITEMS][j]);
		o = optimisedValues != null ? Math.round(optimisedValues[INV_ITEMS][j]) : 0;
		this._opTable._cells[INV_ITEMS+1][j+1].innerHTML = this._getSumupHTML(v, o, optimisedValues != null );

		v = Math.round(currentValues[INV_ITEMS+1][j]);
		o = optimisedValues != null ? Math.round(optimisedValues[INV_ITEMS+1][j]) : 0;
		this._opTable._cells[INV_ITEMS+2][j+1].innerHTML = this._getSumupHTML(v, o, optimisedValues != null );
		total += v;
		totalOptimised += o;
	}
	
	this.updateRatings(reforgeOptimiser._ratings);

	this._opTable._cells[INV_ITEMS+2][REFORGABLE_STATS.length+1].innerHTML = this._getSumupHTML(total, totalOptimised, optimisedValues != null );
	
	this._useOpInput.disabled = optimisedValues ? false : true;
};
/**
 * @param {Array} ratings
 */
ReforgeOptimisationInterface.prototype.updateRatings = function( ratings) {
	for( var j=0; j<REFORGABLE_STATS.length; j++ ) {
		this._opTable._cells[INV_ITEMS+5][j+1].innerHTML = Math.floor(ratings[j]);
	}
};
/**
 * @param {number} value
 * @param {number} optimisedValue
 * @param {boolean} optimisationDone
 * @returns {string}
 */
ReforgeOptimisationInterface.prototype._getSumupHTML = function( value, optimisedValue, optimisationDone ) {
	var isNew = optimisationDone && value != optimisedValue;
	var ret = "";
	
	if( isNew ) {
		if( value > 0 ) {
			ret += "<span class='rf_op_added_old'>+"+value+"</span> ";
		} 
		else if ( value < 0 ) {
			ret += "<span class='rf_op_reduce_old'>"+value+"</span> ";
		}
		else {
			ret += "<span class='rf_op_value_old'>"+value+"</span> ";
		}
	}
	
	value = optimisationDone ? optimisedValue : value;
	
	if( value > 0 ) {
		ret += "<span class='rf_op_added" + ( isNew ? '_new' : '' ) + "'>+"+value+"</span>";
	} 
	else if ( value < 0 ) {
		ret += "<span class='rf_op_reduce" + ( isNew ? '_new' : '' ) + "'>"+value+"</span>";
	}
	else {
		ret += "<span " + ( isNew ? " class='rf_op_value_new' " : '' ) + ">"+value+"</span>";
	}
	return ret;
};
/**
 * @param {Array} weights
 */
ReforgeOptimisationInterface.prototype.setWeights = function( weights ) {
	for( var i=0; i<REFORGABLE_STATS.length; i++ ) {
		this._weightInputs[i].value = weights[i];
	}
};
/**
 * @param {Array} caps
 */
ReforgeOptimisationInterface.prototype.setCaps = function( caps ) {
	for( var i=0; i<REFORGABLE_STATS.length; i++ ) {
		this._capInputs[i].value = caps[i];
	}
};

ReforgeOptimisationInterface.prototype.addListener = function( event, handler ) {
	this._eventManager.addListener(event, handler);
};