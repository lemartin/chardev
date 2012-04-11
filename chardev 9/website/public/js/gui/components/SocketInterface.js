/**
 * @constructor
 */
function SocketInterface() {

	this.eventMgr = new GenericSubject();
	this.eventMgr.registerEvent('socket_left_click', ['socket']);
	this.eventMgr.registerEvent('socket_right_click', ['socket']);
	this.eventMgr.registerEvent('socket_used_gem', ['socket', 'gemId']);
	this.eventMgr.registerEvent('used_gem_tooltip_show', ['socket', 'gemId']);
	this.eventMgr.registerEvent('used_gem_tooltip_hide', ['socket', 'gemId']);

	this.eventMgr.registerEvent('socket_all', ['gemId']);
	this.eventMgr.registerEvent('socket_all_color', ['color', 'gemId']);
	this.eventMgr.registerEvent('remove_all_gems', []);
	this.eventMgr.registerEvent('remove_all_gems_by_id', ['gemId']);
	
	var a;
	this.node = DOM.create('div',{});
	this.sockets = [new LayeredDiv(5),new LayeredDiv(5),new LayeredDiv(5)];
	
	this.ops = new BatchOperations();
	DOM.addClass(this.ops.node, "ra_group");
	this.node.appendChild(this.ops.node);
	
	this.ops.addSimple('remove_all', locale['SI_RemoveAllGems'], new Handler(function(){
		this.onBatchOperation(SocketInterface.BATCH_OP_REM_ALL);
	}, this));
	
	this.main = DOM.createAt( this.node, 'div', {'class': 'si_main'});
	this.tooltip = DOM.createAt( this.main, 'div', {'class': 'si_tt_p'});
	this.usedGemParent = DOM.createAt( this.main, 'div', {'class': 'ra_group si_used_parent'});
	this.socketParent = DOM.createAt( this.main, 'div', {'class': 'si_socket_parent'});
	
	for( var i=0; i<3; i++ ) {
		this.sockets[i].layers[0].className = "si_gem_p";
		this.sockets[i].layers[1].className = "si_bg";
		this.sockets[i].layers[2].className = "si_no_highlight";
		this.sockets[i].layers[4].className = "si_event";
		this.sockets[i].layers[4].oncontextmenu = function(){return false;};
		
		Listener.add(this.sockets[i].layers[4],"mouseover",this.onSocketMouseOver,this,[i]);
		Listener.add(this.sockets[i].layers[4],"mouseout",this.onSocketMouseOut,this,[i]);
		this.sockets[i].layers[4].onmousemove = function(){Tooltip.move();};

		Listener.add(this.sockets[i].layers[4],"click",this.onSocketClick, this, [i]);
		Listener.add(this.sockets[i].layers[4],"contextmenu",this.eventMgr.fire,this.eventMgr,[ 'socket_right_click', { 'socket': i } ]);

	}

	this.listParent = document.createElement("div");
	this.node.appendChild(this.listParent);
	
	this.selectSocket( -1 );
	
	this.internalTooltip = new TooltipImpl();
	this.internalTooltip.setParent(this.tooltip);
	this.internalTooltip.div.className = "fixed_tooltip_div";
	
	this.setShow(false);
}



SocketInterface.BATCH_OP_REM_ALL = 0;
SocketInterface.BATCH_OP_SOCK_ALL = 1;
SocketInterface.BATCH_OP_SOCK_ALL_COL = 2;
SocketInterface.BATCH_OP_REM_ALL_SAME_GEM = 3;

SocketInterface.prototype = {
	/** @type {number} **/
	selectedSocket: -1,
	/** @type {Element} **/
	tooltip: null,
	/** @type {Element} **/
	node: null,
	/** @type {Element} **/
	main: null,
	/** @type {Array} **/
	sockets: [],
	/** @type {number} **/
	slot: 0,
	/** @type {CharacterFacade} **/
	character: null,
	/** @type {Element} **/
	usedGemParent: null,
	/** @type {EquippedItem} **/
	itm: null,
	/** @type {GenericSubject} **/
	eventMgr: null,
	/** @type {Element} **/
	listParent: null,
	/** @type {BatchOperations} **/
	ops: null,
	/** @type {TooltipImpl} **/
	internalTooltip: null,
	
	setShow: function( b ) {
		if( b ) {
			this.main.style.display = "block";
		}
		else {
			this.main.style.display = "none";
		}
	},
	setShowList: function( b ) {
		if( b ) {
			this.listParent.style.display = "block";
		}
		else {
			this.listParent.style.display = "none";
		}
	},
	setListGui: function( gemListGuiNode ) {
		this.listParent.appendChild( gemListGuiNode );
	},
	/**
	 * @param {EquippedItem} itm
	 * @param usedGems
	 */
	update: function( itm, usedGems ) {
		
		
		if( itm == null ) {
			this.setShow(false);
			return;
		}
		this.setShow(true);
		
		
		if( this.itm == null || itm.id != this.itm.id ) {
			this.selectSocket( -1 );
		}
		this.itm = itm;
		
		var i, ld, bsSocket, color, gem, a, n=0, div;
		
		this.internalTooltip.show( itm.getShortTooltip() );
		
		bsSocket = itm.hasExtraSocket();

		DOM.truncate(this.socketParent);
		
		div = DOM.createAt( this.socketParent ,'div',{});
		for( i=0; i<itm.socketColors.length; i++ ) {
			
			if( itm.socketColors[i] > 0 || bsSocket ) {
				if( itm.socketColors[i] <= 0 ) {
					bsSocket = false;
					color = "prismatic";
				}
				else if( itm.socketColors[i] == 14 ) {
					color = "prismatic";
				}
				else {
					color = Math.log(itm.socketColors[i])/Math.log(2);
				}
				
				ld = this.sockets[i];
				ld.layers[1].style.backgroundImage="url(images/socket_interface/socket_"+color+"_large.png)";
				if( itm.getGem(i) == null ) {
					ld.layers[3].className = "si_braces";
					ld.layers[3].style.backgroundImage="url(images/socket_interface/socket_"+color+"_braces_open.png)";
					Tools.removeChilds(ld.layers[1]);
				}
				else {
					var img = document.createElement("img");
					img.src = "images/icons/large/"+itm.getGem(i).icon+".png";
					img.className = "si_gem_icon";
					DOM.set(ld.layers[1],img);
					
					ld.layers[3].className = "si_braces";
					ld.layers[3].style.backgroundImage="url(images/socket_interface/socket_"+color+"_braces_closed.png)";
				}
				DOM.append( div, ld.layers[0]);
				n++;
			}
		}
		div.className = 'si_sp_'+n+'_gems';
		
		DOM.truncate(this.usedGemParent);
		DOM.append( DOM.createAt(this.usedGemParent, 'span', {'class':'si_used_title_fix', 'text':locale['SI_UsedGems']}), ChardevHTML.getInfo("Gems already present on your gear"));
		for( var id in usedGems ) {
			gem = usedGems[id];
			
			a = DOM.createAt( this.usedGemParent, 'a', {'class': 'si_used_gem', 'backgroundImage': 'images/icons/small/'+gem.icon+'.png'});
			
			Listener.add( a,"mouseover",this.onUsedMouseOver, this,[gem]);
			Listener.add( a,"mouseout",this.onUsedMouseOut, this,[gem]);
			Listener.add( a,"click",this.onUsedClick, this, [gem.id]);

			a.onmousemove = function(){Tooltip.move();};
		}
		Tools.clearBoth(this.usedGemParent);
		
		this.selectSocket(this.selectedSocket);
	},
	
	onSocketMouseOver: function( socket ) {
		DOM.addClass( this.sockets[socket].layers[2], "si_highlight");
		
		if( this.itm != null && this.itm.getGem(socket) ) {
			Tooltip.showMovable( this.itm.getGem(socket).getTooltip() );
		}
	},
	
	onSocketMouseOut: function( socket ) {
		DOM.removeClass( this.sockets[socket].layers[2], "si_highlight");
		Tooltip.hide();
	},
	onUsedMouseOver: function( gem ) {
		this.eventMgr.fire('used_gem_tooltip_show', { 'socket': this.selectedSocket, 'gemId': gem.id});
		Tooltip.showMovable( gem.getTooltip() + "<div class='tt_note'>Left click to socket</div>" );
	},
	onUsedMouseOut: function( gem ) {
		Tooltip.hide();
		this.eventMgr.fire('used_gem_tooltip_hide', { 'socket': this.selectedSocket, 'gemId': gem.id});
	},
	onUsedClick: function( gemId ) {
		this.eventMgr.fire('socket_used_gem', { 'socket': this.selectedSocket, 'gemId': gemId});
	},
	onSocketClick: function( socket ) {
		this.selectSocket(socket);
		this.eventMgr.fire( 'socket_left_click', { 'socket': socket });
	},
	onBatchOperation: function( operation ) {
		if( operation == SocketInterface.BATCH_OP_REM_ALL ) {
			this.eventMgr.fire('remove_all_gems', {});
		} 
		else {
			var gemId = this.itm.getGem(this.selectedSocket).id;
			switch( operation ) {
			case SocketInterface.BATCH_OP_REM_ALL_SAME_GEM:
				this.eventMgr.fire('remove_all_gems_by_id', {'gemId': gemId});
				break;
			case SocketInterface.BATCH_OP_SOCK_ALL:
				this.eventMgr.fire('socket_all_gems', {'gemId': gemId});
				break;
			case SocketInterface.BATCH_OP_SOCK_ALL_COL:
				this.eventMgr.fire('socket_all_gems', {'gemId': gemId, 'color': this.itm.socketColors[this.selectedSocket]});
				break;
			}
		}
	},
	
	selectSocket: function( socket ) {
		
		this.ops.remove('remove_color');
		this.ops.remove('add_all');
		this.ops.remove('add_color');
		
		if( socket != -1 ) {
			var gem = this.itm.getGem(socket);
			
			this.usedGemParent.style.display = "block";
			//highlight new socket
			DOM.addClass( this.sockets[socket].layers[0], "si_gem_p_selected" );
			
			if( gem != null ) {

				this.ops.addSimple('remove_color', TextIO.sprintf1( locale['SI_RemoveGems'], gem.name ), new Handler(function() {
					this.onBatchOperation(SocketInterface.BATCH_OP_REM_ALL_SAME_GEM);
				}, this));
				
				this.ops.addSimple('add_all', TextIO.sprintf1( locale['SI_SocketAll'], gem.name ), new Handler(function() {
					this.onBatchOperation(SocketInterface.BATCH_OP_SOCK_ALL);
				}, this));
				
				if( this.itm.socketColors[socket] > 1 ) {
					this.ops.addSimple('add_color', TextIO.sprintf( locale['SI_SocketAllColor'], [ gem.name, locale['SI_SocketColors'][this.itm.socketColors[socket]] ] ), new Handler(function() {
						this.onBatchOperation(SocketInterface.BATCH_OP_SOCK_ALL_COL);
					}, this));
				}
			}
			this.setShowList(true);
		}
		else {
			
			this.usedGemParent.style.display = "none";
			this.setShowList(false);
		}
		
		if( this.selectedSocket != - 1 && this.selectedSocket != socket ) {
			//unhighlight old socket
			DOM.removeClass( this.sockets[this.selectedSocket].layers[0], "si_gem_p_selected" );
		}
		
		this.selectedSocket = socket;
	}
};