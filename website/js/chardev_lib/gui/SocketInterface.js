/**
 * @constructor
 * @returns {SocketInterface}
 */
function SocketInterface() {
	var a;
	this._node = document.createElement('div');
	this._tooltip = document.createElement('div');
	this._socketParent = new StaticGrid(1,3);
	this._socketParent._node.className = "si_socket_parent";
	this._sockets = [new LayeredDiv(5),new LayeredDiv(5),new LayeredDiv(5)];
	this._batch = document.createElement('div');
	this._batchCollapsable = new Collapsable(); this._batchCollapsable.toggle();
	this._main = document.createElement("div"); this._main.className = "si_main"; this._main.style.display = "block";
	this._main.appendChild(this._tooltip);
	this._main.appendChild(this._socketParent._node);
	
	this._node.appendChild(this._batch);
	this._node.appendChild(this._main);
	
	this._batch.appendChild(this._batchCollapsable._node);
	this._batchCollapsable._header.appendChild(document.createTextNode(locale['SI_BatchHeader']));
	this._batchCollapsable._header.className = "collapse_h ba_collapse_h";
	this._batchCollapsable._content.className = "collapse_c ba_collapse_c";
	this._batchCollapsable._node.className = "collapse ba_collapse";
	
	a = document.createElement("a");
	a.className = "ba_simple_op_link";
	a.innerHTML = locale['SI_RemoveAllGems'];
	Listener.add(a,"click",this._onBatchOperation,this,[SI_BATCH_OP_REM_ALL]);
	this._batchCollapsable._content.appendChild(a);
	
	this._baOpRemColTitle = document.createElement("a");
	this._baOpRemColTitle.className = "ba_simple_op_link";
	Listener.add(this._baOpRemColTitle,"click",this._onBatchOperation,this,[SI_BATCH_OP_REM_ALL_SAME_GEM]);
	this._batchCollapsable._content.appendChild(this._baOpRemColTitle);
	
	this._baOpSocAllTitle = document.createElement("a");
	this._baOpSocAllTitle.className = "ba_simple_op_link";
	Listener.add(this._baOpSocAllTitle,"click",this._onBatchOperation,this,[SI_BATCH_OP_SOCK_ALL]);
	this._batchCollapsable._content.appendChild(this._baOpSocAllTitle);
	
	this._baOpSocColTitle = document.createElement("a");
	this._baOpSocColTitle.className = "ba_simple_op_link";
	Listener.add(this._baOpSocColTitle,"click",this._onBatchOperation,this,[SI_BATCH_OP_SOCK_ALL_COL]);
	this._batchCollapsable._content.appendChild(this._baOpSocColTitle);
	
	for( var i=0; i<3; i++ ) {
		this._sockets[i]._layers[0].className = "si_unselected_border";
		this._sockets[i]._layers[1].className = "si_bg";
		this._sockets[i]._layers[2].className = "si_no_highlight";
		this._sockets[i]._layers[4].className = "si_event";
		this._sockets[i]._layers[4].oncontextmenu = function(){return false;};
		
		Listener.add(this._sockets[i]._layers[4],"mouseover",this._onSocketMouseOver,this,[i]);
		Listener.add(this._sockets[i]._layers[4],"mouseout",this._onSocketMouseOut,this,[i]);
		Listener.add(this._sockets[i]._layers[4],"click",this._onSocketClick,this,[i]);
		Listener.add(this._sockets[i]._layers[4],"contextmenu",this._onSocketRemove,this,[i]);
		this._sockets[i]._layers[4].onmousemove = function(){Tooltip.move();};
	}
	
	this._usedGemParent = document.createElement("div");
	this._usedGemParent.className = "si_used_parent";
	this._node.appendChild(this._usedGemParent);

	this._selectSocket( -1 );
}

SocketInterface.prototype._selectedSocket = -1;
SocketInterface.prototype._tooltip = null;
SocketInterface.prototype._node = null;
SocketInterface.prototype._main = null;
SocketInterface.prototype._sockets = [];
SocketInterface.prototype._batch = null;
SocketInterface.prototype._onSocketClickHandler = null;
SocketInterface.prototype._onSocketClickScope = null;
SocketInterface.prototype._onSocketRemoveHandler = null;
SocketInterface.prototype._onUsedClickHandler = null;
SocketInterface.prototype._itemRef = null;
SocketInterface.prototype._batchCollapsable = null;
SocketInterface.prototype._slot = 0;
SocketInterface.prototype._character = null;
SocketInterface.prototype._usedGemParent = null;

SocketInterface.prototype._baOpRemColParent = null;
SocketInterface.prototype._baOpSocAllParent = null;
SocketInterface.prototype._baOpSocColParent = null;
SocketInterface.prototype._baOpRemColTitle = null;
SocketInterface.prototype._baOpSocAllTitle = null;
SocketInterface.prototype._baOpSocColTitle = null;

/**
 * @param {Character} character
 * @param {number} slot
 * @param {number} socket
 */
SocketInterface.prototype.update = function( character, slot, socket ) {
	if( slot < 0 || character == null ) {
		return;
	};
	
	var itm = character._inventory._items[slot][0];
	var i, ld, bsSocket, color, usedGems = new Object(), gem, a;
	
	this._slot = slot;
	this._character = character;
	this._selectSocket( socket );
	
	Tools.removeChilds(this._tooltip);
	if( itm != null ) {
		this._main.style.display = "block";
		this._tooltip.innerHTML = itm.getTooltip( character, ITEM_TT_SHORT );
		this._tooltip.className = "tt_small";
		Tooltip.fixSize(this._tooltip);

		bsSocket = character.hasBlacksmithingSocket( slot );
		
		for( i=0; i<itm._socketColors.length; i++ ) {
			Tools.removeChilds(this._socketParent._cells[0][i]);
			
			if( itm._socketColors[i] > 0 || bsSocket ) {
				if( itm._socketColors[i] <= 0 ) {
					bsSocket = false;
					color = "prismatic";
				}
				else if( itm._socketColors[i] == 14 ) {
					color = "prismatic";
				}
				else {
					color = Math.log(itm._socketColors[i])/Math.log(2);
				}
				
				ld = this._sockets[i];
				ld._layers[1].style.backgroundImage="url(images/socket_interface/socket_"+color+"_large.png)";
				if( itm._gems[i] == null ) {
					ld._layers[3].className = "si_braces";
					ld._layers[3].style.backgroundImage="url(images/socket_interface/socket_"+color+"_braces_open.png)";
					Tools.removeChilds(ld._layers[1]);
				}
				else {
					var img = document.createElement("img");
					img.src = "images/icons/large/"+itm._gems[i]._icon+".png";
					img.className = "si_gem_icon";
					Tools.setChild(ld._layers[1],img);
					
					ld._layers[3].className = "si_braces";
					ld._layers[3].style.backgroundImage="url(images/socket_interface/socket_"+color+"_braces_closed.png)";
				}
				this._socketParent._cells[0][i].appendChild(ld._layers[0]);
			}
		}
	}
	else {
		this._main.style.display = "none";
	}

	for( i=0; i< INV_ITEMS; i++ ) {
		itm = character._inventory._items[i][0];
		if( itm == null ) {
			continue;
		}

		for( var j=0; j<itm._gems.length; j++ ) {
			gem = itm._gems[j];
			if( gem == null ) {
				continue;
			}
			usedGems[gem._id] = gem;
		}
	}
	
	this._usedGemParent.innerHTML = "<span class='si_used_title_fix'>"+locale['SI_UsedGems']+": </span>";
	for( var id in usedGems ) {
		gem = usedGems[id];
		a = document.createElement("a");
		a.className = 'si_used_gem';
		a.style.backgroundImage = 'url(images/icons/small/'+gem._icon+'.png)';
		a.onmouseout = function(){Tooltip.hide();};
		a.onmousemove = function(){Tooltip.move();};
		a.onmouseover = function(){Tooltip.showGem(gem._id);};
		
		Listener.add( a, 'mouseover', Tooltip.showGem, Tooltip, [gem._id] );
		Listener.add( a, 'click', this._onUsedClick,this,[gem._id] );
		this._usedGemParent.appendChild(a);
	}
	Tools.clearBoth(this._usedGemParent);
};

SocketInterface.prototype._onUsedClick = function( gemId ) {
	if( this._onUsedClickHandler ) {
		this._onUsedClickHandler[0].apply(this._onUsedClickHandler[1],[g_items.get(gemId)]);
	}
};

SocketInterface.prototype._onSocketMouseOver = function( socket ) {
	this._sockets[socket]._layers[2].className = "si_highlight";
	var itm = this._character._inventory._items[this._slot][0];
	if( itm != null && itm._gems[socket] != null ) {
		Tooltip.showItemByReference(itm._gems[socket]);
	}
};

SocketInterface.prototype._onSocketMouseOut = function( socket ) {
	this._sockets[socket]._layers[2].className = "si_no_highlight";
	Tooltip.hide();
};

SocketInterface.prototype._onSocketClick = function( socket ) {
	this._selectSocket( socket );
	if( this._onSocketClickScope && this._onSocketClickHandler != null ) {
		this._onSocketClickHandler.apply(this._onSocketClickScope,[socket]);
	}
};

SocketInterface.prototype._onSocketRemove = function( socket ) {
	if( this._onSocketRemoveHandler ) {
		this._onSocketRemoveHandler[0].apply(this._onSocketRemoveHandler[1],[socket]);
	}
};

var SI_BATCH_OP_REM_ALL = 0;
var SI_BATCH_OP_SOCK_ALL = 1;
var SI_BATCH_OP_SOCK_ALL_COL = 2;
var SI_BATCH_OP_REM_ALL_SAME_GEM = 3;

SocketInterface.prototype._onBatchOperation = function( operation ) {
	if( operation == SI_BATCH_OP_REM_ALL ) {
		this._character.removeAllGems(0);
	} 
	else {
		var itm = this._character._inventory._items[this._slot][0];
		var gemId = itm._gems[this._selectedSocket]._id;
		switch( operation ) {
		case SI_BATCH_OP_REM_ALL:
			break;
		case SI_BATCH_OP_REM_ALL_SAME_GEM:
			this._character.removeGem(gemId);
			break;
		case SI_BATCH_OP_SOCK_ALL:
			this._character.setGems(gemId, 0);
			break;
		case SI_BATCH_OP_SOCK_ALL_COL:
			this._character.setGems(
					gemId,
					itm._socketColors[this._selectedSocket]
			);
			break;
		}
	}
	
	
	this.update(this._character, this._slot, this._selectedSocket);
};

SocketInterface.prototype._selectSocket = function( socket ) {

	this._baOpRemColTitle.style.display = "none";
	this._baOpSocAllTitle.style.display = "none";
	this._baOpSocColTitle.style.display = "none";
	
	if( socket != -1 ) {
		var itm = this._character._inventory._items[this._slot][0];
		var gem = itm._gems[socket];
		
		this._usedGemParent.style.display = "block";
		//highlight new socket
		this._sockets[socket]._layers[0].className = "si_selected_border";
		
		if( gem != null ) {
			this._baOpRemColTitle.style.display = "block";
			this._baOpSocAllTitle.style.display = "block";
			

			this._baOpRemColTitle.innerHTML = TextIO.sprintf1( locale['SI_RemoveGems'], gem._name );
			this._baOpSocAllTitle.innerHTML = TextIO.sprintf1( locale['SI_SocketAll'], gem._name );
			
			if( itm._socketColors[socket] > 0 ) {
				this._baOpSocColTitle.innerHTML = TextIO.sprintf( locale['SI_SocketAllColor'], [ gem._name, locale['SI_SocketColors'][itm._socketColors[socket]] ] );
				this._baOpSocColTitle.style.display = "block";
			}
		}
	}
	else {
		this._usedGemParent.style.display = "none";
	}
	
	if( this._selectedSocket != - 1 && this._selectedSocket != socket ) {
		//unhighlight old socket
		this._sockets[this._selectedSocket]._layers[0].className = "si_unselected_border";
	}
	
	this._selectedSocket = socket;
};

SocketInterface.prototype.setOnSocketClickHandler = function( handler, scope ) {
	this._onSocketClickHandler = handler;
	this._onSocketClickScope = scope;
};

SocketInterface.prototype.setOnSocketContextMenuHandler = function( handler, scope ) {
	this._onSocketRemoveHandler = [handler,scope];
};

SocketInterface.prototype.setOnUsedClickHandler = function( handler, scope ) {
	this._onUsedClickHandler = [handler,scope];
};