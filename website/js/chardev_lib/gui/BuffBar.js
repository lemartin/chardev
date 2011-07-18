/**
 * @constructor
 * @param {Character} character
 * @returns {BuffBar}
 */
function BuffBar ( character ) {
	this._node = document.createElement('div');
	this._node.className = 'bb_p';
	this._character = character;
}

BuffBar.prototype = {
	/** @type {Character} */
	_character : null,
	/** @type {Element} */
	_node : null,
	/** @type {Handler} */
	_removeHandler : null,
	/** @type {Handler} */
	_clickHandler : null,
	/**
	 * 
	 */
	update : function( ) {
		var bs = this._character._buffs._buffs;
		Tools.removeChilds(this._node);
		
		for( var i in bs ) {
			this._showBuff( bs[i] );
		}
		Tools.clearBoth(this._node);
	},
	/**
	 * @param {Buff} b
	 */
	_showBuff : function( b ) {
		// TODO Use some css dude
		var d = document.createElement('img');
		d.className = 'bb_buff';
		d.src = 'images/icons/small/'+b._spell._icon+'.png';
		d.oncontextmenu = function(){return false;};
		Listener.add( d, 'contextmenu', this._onRemove, this, [b._spell._id] );
		Listener.add( d, 'click', this._onClick, this, [b._spell._id] );

		d.onmouseout = function(){Tooltip.hide();};
		d.onmousemove = function(){Tooltip.move();};
		if( b._spell._auraOptions && b._spell._auraOptions._stacks > 1 ) {
			d.appendChild(Tools.outline(b._stacks));
		}
		Listener.add(d,"mouseover",Tooltip.showSpell,Tooltip,[b._spell._id]); g_spells.set(b);
		
		this._node.appendChild(d);
	},
	/**
	 * @param {number} b
	 */
	_onRemove : function( b ) {
		if( this._removeHandler ) {
			this._removeHandler.notify([b]);
		}
		this.update();
	},

	/**
	 * @param {number} b
	 */
	_onClick: function( b ) {
		if( this._clickHandler ) {
			this._clickHandler.notify([b]);
		}
		this.update();
	},
	
	setRemoveHandler : function( handler ) {
		this._removeHandler = handler;
	},
	
	setClickHandler : function( handler ) {
		this._clickHandler = handler;
	}
};