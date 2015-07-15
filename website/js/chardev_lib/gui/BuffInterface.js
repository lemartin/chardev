
/** @const */var BI_TYPE_SPELL = 0;
/** @const */var BI_TYPE_ITEM = 1;
/**
 * @constructor
 * @returns {BuffInterface}
 */
function BuffInterface() {
	this._node = document.createElement("div");
	this._classNode = document.createElement("div");
	this._itemNode = document.createElement("div");
	this._talentNode = document.createElement("div");
	this._procNode = document.createElement("div");

	this._node.appendChild( this._itemNode );
	this._node.appendChild( this._procNode );
	this._node.appendChild( this._talentNode );
	this._node.appendChild( this._classNode );
	this._buffHandler = new Handler( this._getBuffs_callback, this );
}

BuffInterface.prototype._initialised = false;
BuffInterface.prototype._node = null;
BuffInterface.prototype._classNode = null;
BuffInterface.prototype._itemNode = null;
BuffInterface.prototype._procNode = null;
BuffInterface.prototype._addBuffHandler = null;
BuffInterface.prototype._buffHandler = null;


/**
 * @public
 * @param {Character} character
 */
BuffInterface.prototype.update = function(character) {
	if( !this._initialised ) {
		Tooltip.showLoading();
		Ajax.get('php/interface/get_buffs.php', this._buffHandler, [character]);
		return;
	}
	
	var itm, i, j, s, h, se, ps, enchant;
	var pc = new Collapsable();
	var ic = new Collapsable();
	var icc = 0, pcc = 0; 
	var talentBuffs = [];
	
	ic._header.className = 'collapse_h bi_collapse_h';
	ic._content.className = 'collapse_c bi_collapse_c';
	ic._node.className = 'collapse bi_collapse';
	pc._header.className = 'collapse_h bi_collapse_h';
	pc._content.className = 'collapse_c bi_collapse_c';
	pc._node.className = 'collapse bi_collapse';
	
	Tools.setChild(this._itemNode,ic._node);
	Tools.setChild(this._procNode,pc._node);
	
	for( i = 0; i < INV_ITEMS; i++ ) {
		/** @type {Item} */
		itm = character._inventory.get(i);
		if( ! itm ) {
			continue;
		}
		
		for( j = 0; j < itm._spells.length; j++ ) {
			s = itm._spells[j];
			
			if( s == null ) {
				continue;
			}

			// echo( itm._name + "(spell "+j+"): " + s._id + " -> " +  s.getName() );
			for( h = 0 ; h < 3; h++ ) {
				se = s._effects[h];
				if( ! se ) {
					continue;
				}
				if( se._effect == 42 ) {
					ps = se.getProcSpell();
					if( ps ) {
						// echo( itm._name + "(spell "+j+" effect "+h+"): " + s._id + " -> " + ps.getName() );
						pc._content.appendChild( this._createBuffBase( ps._icon, ps._id, true, ps.getName() ));
						pcc ++;
					}
				}
			}
			
			if ( s.isAura() ) {
				continue;
			}
			
			// echo( itm._name + "(spell "+j+"): " + s._id + " -> " +  s.getName() );
			ic._content.appendChild( this._createBuffBase(s._icon, s._id, true, s.getName()) );
			icc ++;
		}
		
		for( j=0; j<itm._enchants.length; j++ ) {
			enchant = itm._enchants[j];
			
			if( enchant._types[0] == 1 ) {
				ps = enchant._spells[0];
				pc._content.appendChild( this._createBuffBase( ps._icon, ps._id, true, ps.getName() ));
			}
		}
	}
	
	Tools.clearBoth(ic._content);
	ic._header.innerHTML = "Items (Use-Effects)<span class='bi_cb_count'>("+icc+")</span>";
	Tools.clearBoth(pc._content);
	pc._header.innerHTML = "Item Procs<span class='bi_cb_count'>("+pcc+")</span>";
	
	Tools.removeChilds(this._talentNode);
	/*
	if( character._chrClass != null ) {
		switch( character._chrClass._id ) {
		case PALADIN:
			this._testAndAdd( character, talentBuffs, 53671, 53655); // Judgements of the Pure, Rank 1
			this._testAndAdd( character, talentBuffs, 53673, 53656); // Judgements of the Pure, Rank 2
			this._testAndAdd( character, talentBuffs, 54151, 53657); // Judgements of the Pure, Rank 3
			break;
		}
	}
	*/
	if( character._chrClass != null && character._chrClass._conditionalBuffs != null ) {
		var conditionalBuff;
		for( i=0; i<character._chrClass._conditionalBuffs.length; i++ ) {
			conditionalBuff = character._chrClass._conditionalBuffs[i];
			this._testAndAdd( character, talentBuffs, conditionalBuff[0], conditionalBuff[1]);
		}
	}
	this._createCategory(talentBuffs, "Talent Buffs", this._talentNode, BI_TYPE_SPELL, true );
	
};

BuffInterface.prototype._testAndAdd = function( character, arr, spell, testId ) {
	if( character._auras._auraMap[testId] ) {
		arr.push(spell);
	}
};

/**
 * @private 
 * @param buffs
 * @param character
 */
BuffInterface.prototype._getBuffs_callback = function( buffs, character ) {
	var classBuffs = buffs[0];
	
	var i;
	for( i=0; i<classBuffs.length; i++ ) {
		
		if( ! locale['a_class'][i] ) {
			continue;
		}

		this._createCategory(buffs[0][i], locale['a_class'][i],this._classNode, BI_TYPE_SPELL, false);
	}

	this._createCategory(buffs[1][0],'Elixirs',this._classNode,BI_TYPE_SPELL, false);
	this._createCategory(buffs[1][1],'Battle Elixirs',this._classNode,BI_TYPE_SPELL, false);
	this._createCategory(buffs[1][2],'Guardian Elixirs',this._classNode,BI_TYPE_SPELL, false);
	this._createCategory(buffs[1][3],'Flasks',this._classNode,BI_TYPE_SPELL, false);
	
	this._createCategory(buffs[2],'Food',this._classNode,BI_TYPE_ITEM, false);

	this._initialised = true;
	this.update(character);
	Tooltip.enable();
};

BuffInterface.prototype._createCategory = function( rawData, name, node, type, expanded ) {
	var c = new Collapsable();
	var j, n, spell, item;
	var fc = null;
	var map = {};
	var div = document.createElement("div"), fcc_parent;
	var trigSpell;
	
	c._header.className = 'collapse_h bi_collapse_h';
	c._content.className = 'collapse_c bi_collapse_c';
	c._node.className = 'collapse bi_collapse';
	
	n = 0;
	for ( j = 0; j < rawData.length; j++) {
		if( ! rawData[j] ) {
			continue;
		}
		n++;
		
		if( type == BI_TYPE_ITEM) {
			item = new Item( rawData[j] );
			if( item._spells[0] != null && item._spells[0].getTriggeredSpell() ) {
				trigSpell = item._spells[0].getTriggeredSpell();
				g_spells.set(item._spells[0]);
				map[item._name + trigSpell.getDescription()] = this._createBuffBase(
					item._icon,
					trigSpell._id,
					false,
					item._name
				);
			}
			else {
				//TextIO.printError("BuffInterface::_createCategory: item._spells[0] is not set, item id is "+item._id+".");
			}
		}
		else {
			spell = new Spell( rawData[j] );
			map[spell.getName() + spell.getDescription()] = this._createBuffBase(
				spell._icon,
				spell._id,
				false,
				spell.getName()
			);
			g_spells.set(spell);
		}
	}
	c._header.innerHTML = name + "<span class='bi_cb_count'>("+n+")</span>";
	
	fcc_parent = document.createElement("div");
	fcc_parent.innerHTML = "Filter: ";
	fcc_parent.className = 'bi_fcc_parent';

	fc = new FilterableCollection( map, div );
	fc._filterControl.className = 'input input_small bi_fcc_f';
	fc.showAll();
	fcc_parent.appendChild(fc._filterControl);
	
	c._content.appendChild(fcc_parent);
	c._content.appendChild(div);

	Tools.clearBoth(c._content);
	
	if( !expanded ) {
		c.collapse();
	}
	
	if( n ) {
		node.appendChild(c._node);
	}
};

/**
 * @private
 * @param icon
 * @param spellId
 * @param isSelfBuff
 * @param name
 * @returns {Element}
 */
BuffInterface.prototype._createBuffBase = function( icon, spellId, isSelfBuff, name ) {
	var p = document.createElement("div");
	var div = document.createElement("div");
	div.style.backgroundImage = 'url(images/icons/small/'+icon+'.png)';
	div.className = 'bi_buff';
	
	p.className = 'bi_buff_p';
	p.appendChild(div);
	p.appendChild(document.createTextNode( name.length > 20 ? name.substr(0,20)+"..." : name ));
	
	p.onmouseout = function(){Tooltip.hide();};
	p.onmousemove = function(){Tooltip.move();};
	Listener.add(p,"mouseover",Tooltip.showSpell,Tooltip,[spellId,isSelfBuff]);
	Listener.add(p,"click",this._onAddBuff, this, [spellId]);
	
	return p;
};

/**
 * @private
 * @param {number} spellId
 */
BuffInterface.prototype._onAddBuff = function ( spellId ) {
	// TODO, do some highlighting of added buffs
	if( this._addBuffHandler ) {
		this._addBuffHandler.notify([spellId]);
	}
};

/**
 * @public
 * @param {Handler} handler
 */
BuffInterface.prototype.setAddBuffHandler = function ( handler ) {
	this._addBuffHandler = handler;
};