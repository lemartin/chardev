/**
 * @constructor
 */
function BuffInterface() {
	this.eventMgr = new GenericSubject();
	this.eventMgr.registerEvent('add_buff', ['id']);
	
	this.node = DOM.create( 'div', {'class': 'bi_p'});
	
	this.content = DOM.createAt( this.node, 'div', {'display': 'none'});
	this.classNode = DOM.createAt( this.content, 'div',{});
	this.itemNode = DOM.createAt( this.content, 'div',{});
	this.talentNode = DOM.createAt( this.content, 'div',{});
	this.procNode = DOM.createAt( this.content, 'div',{});
	
	this.loading = DOM.createAt( this.node, 'div', {'class': 'bi_loading'});
}

BuffInterface.TYPE_SPELL = 0;
BuffInterface.TYPE_ITEM = 1;
BuffInterface.MAX_LENGTH_BUFF_NAME = 18;

BuffInterface.prototype = {
	eventMgr: null,
	node: null,
	classNode: null,
	itemNode: null,
	procNode: null,
	addBuffHandler: null,
	buffHandler: null,
	initialised: false,
	content: null,
	loading: null,
	
	/**
	 * @public
	 * @param {Array} useSpells
	 * @param {Array} procSpells
	 * @param {Array} conditionalSpells
	 */
	update: function( useSpells, procSpells, conditionalSpells) {
		
		var spell, k;
		var pc = new Collapsable();
		var ic = new Collapsable();
		
		ic.header.className = 'collapse_h bi_collapse_h';
		ic.content.className = 'collapse_c bi_collapse_c';
		ic.node.className = 'collapse bi_collapse';
		pc.header.className = 'collapse_h bi_collapse_h';
		pc.content.className = 'collapse_c bi_collapse_c';
		pc.node.className = 'collapse bi_collapse';
		
		DOM.set(this.itemNode,ic.node);
		DOM.set(this.procNode,pc.node);
		
		for( k in useSpells ) {
			spell = useSpells[k];
			ic.content.appendChild( this.createBuffBase(spell.icon, spell, true, spell.name) );
		}
		
		for( k in procSpells ) {
			spell = procSpells[k];
			pc.content.appendChild( this.createBuffBase(spell.icon, spell, true, spell.name) );
		}
		
		Tools.clearBoth(ic.content);
		ic.header.innerHTML = "<a clas='bi_bc_link' href='javascript:'>Items (Use-Effects)</a><span class='bi_cb_count'>("+useSpells.length+")</span>";
		Tools.clearBoth(pc.content);
		pc.header.innerHTML = "<a clas='bi_bc_link' href='javascript:'>Item Procs</a><span class='bi_cb_count'>("+procSpells.length+")</span>";
		
		Tools.removeChilds(this.talentNode);
		/*
		if( character.chrClass != null ) {
			switch( character.chrClass.id ) {
			case PALADIN:
				this.testAndAdd( character, talentBuffs, 53671, 53655); // Judgements of the Pure, Rank 1
				this.testAndAdd( character, talentBuffs, 53673, 53656); // Judgements of the Pure, Rank 2
				this.testAndAdd( character, talentBuffs, 54151, 53657); // Judgements of the Pure, Rank 3
				break;
			}
		}
		*/
		this.createCategory(conditionalSpells, "Talent Buffs", this.talentNode, true );
		
	},
	
	isInitialised: function() {
		return this.initialised;
	},
	resetInitialised: function() {
		this.initialised = false;
		this.content.style.display = 'none';
		this.loading.style.display = 'block';
	},
	/**
	 * @param buffs
	 */
	initialise: function( buffs ) {
//		var classBuffs = buffs[0];
//		
//		var i;
//		for( i=0; i<classBuffs.length; i++ ) {
//			
//			if( ! locale['a_class'][i] ) {
//				continue;
//			}
//	
//			this.createCategory(buffs[0][i], locale['a_class'][i],this.classNode, BuffInterface.TYPE_SPELL, false);
//		}
		
		DOM.truncate(this.classNode);
		
		this.createCategory(buffs['Warrior'],'Warrior',this.classNode, false);
		this.createCategory(buffs['Paladin'],'Paladin',this.classNode, false);
		this.createCategory(buffs['Hunter'],'Hunter',this.classNode, false);
		this.createCategory(buffs['Rogue'],'Rogue',this.classNode, false);
		this.createCategory(buffs['Priest'],'Priest',this.classNode, false);
		this.createCategory(buffs['DeathKnight'],'DeathKnight',this.classNode, false);
		this.createCategory(buffs['Shaman'],'Shaman',this.classNode, false);
		this.createCategory(buffs['Mage'],'Mage',this.classNode, false);
		this.createCategory(buffs['Warlock'],'Warlock',this.classNode, false);
		this.createCategory(buffs['Druid'],'Druid',this.classNode, false);
	
		this.createCategory(buffs['Elixirs'],'Elixirs',this.classNode, false);
		this.createCategory(buffs['BattleElixirs'],'Battle Elixirs',this.classNode, false);
		this.createCategory(buffs['GuardianElixirs'],'Guardian Elixirs',this.classNode, false);
		this.createCategory(buffs['Flasks'],'Flasks',this.classNode, false);
		
		this.createCategory(buffs['Food'],'Food',this.classNode, false);
		
		this.initialised = true;
		this.content.style.display = 'block';
		this.loading.style.display = 'none';
	},
	
	createCategory: function( availableBuffs, name, node, expanded ) {
		var c = new Collapsable();
		var j, n;
		var fc = null;
		var map = {};
		var div = document.createElement("div");
		
		c.header.className = 'collapse_h bi_collapse_h';
		c.content.className = 'collapse_c bi_collapse_c';
		c.node.className = 'collapse bi_collapse';
		
		n = 0;
		for ( j = 0; j < availableBuffs.length; j++) {
			map[availableBuffs[j].name + availableBuffs[j].spell.getDescription()] = this.createBuffBase(
					availableBuffs[j].icon,
					availableBuffs[j].spell,
					false,
					availableBuffs[j].name
				);
			n++;
		}
		c.header.innerHTML = "<a clas='bi_bc_link' href='javascript:'>" + name + "</a><span class='bi_cb_count'>("+n+")</span>";
	
		fc = new FilterableCollection( map, div );
		fc.filterControl.className = 'input input_small bi_fcc_f';
		fc.showAll();
		
		var fcc_parent = DOM.createAt(c.content, 'div', {'class': 'bi_fcc_parent', 'text': 'Filter'});
		fcc_parent.appendChild(fc.filterControl);
		
		c.content.appendChild(fcc_parent);
		c.content.appendChild(div);
	
		Tools.clearBoth(c.content);
		
		if( !expanded ) {
			c.collapse();
		}
		
		if( n ) {
			node.appendChild(c.node);
		}
	},
	
	/**
	 * @param icon
	 * @param {SpellFacade} spell
	 * @param isSelfBuff
	 * @param name
	 * @returns {Element}
	 */
	createBuffBase: function( icon, spell, isSelfBuff, name ) {
		
		var p = DOM.create('div', {'class': 'bi_buff_p'});
		DOM.createAt( p, 'img', {'src': 'images/icons/small/'+icon+'.png', 'class': 'bi_buff'});
		var a = DOM.createAt( p, 'a', { 
			'href': 'javascript:', 
			'text': name.length > BuffInterface.MAX_LENGTH_BUFF_NAME ? name.substr(0,BuffInterface.MAX_LENGTH_BUFF_NAME-3)+"..." : name
		});
		
		a.onmouseout = function(){Tooltip.hide();};
		a.onmousemove = function(){Tooltip.move();};
		a.ondblclick = function(){return false;};
		Listener.addHandler(a,"mouseover",new Handler(function() {
			Tooltip.showMovable(spell.getTooltip());
		}, this),[]);
		Listener.add(a,"click",this.eventMgr.fire, this.eventMgr, ['add_buff', {'id': spell.id}]);
		
		return p;
	},
	
	/**
	 * @param {number} spellId
	 */
	onAddBuff: function ( spellId ) {
		// TODO, do some highlighting of added buffs
		if( this.addBuffHandler ) {
			this.addBuffHandler.notify([spellId]);
		}
	},
	
	/**
	 * @public
	 * @param {Handler} handler
	 */
	setAddBuffHandler: function ( handler ) {
		this.addBuffHandler = handler;
	}
};