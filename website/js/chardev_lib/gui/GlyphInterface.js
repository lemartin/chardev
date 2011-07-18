var GI_TYPE_TO_ORDER = [2,0,1];

/**
 * @constructor
 * @returns {GlyphInterface}
 */
function GlyphInterface() {
	var h,i,j, layout = new StaticGrid(1,2), div, div2, sg;
	
	layout.setVerticalAlign(SG_VALIGN_TOP);
	
	this._node = document.createElement("div"); this._node.className = "gi_p";
	this._listParent = document.createElement("div");
	this._listParent.className = 'gi_list';

	this._glyphParents = [];
	this._glyphs = [];
	for( h=0; h<3; h++ ) {
		i = GI_TYPE_TO_ORDER[h];
		this._glyphParents[i] = document.createElement('div');
		this._glyphs[i] = [];
		for( j=0; j<3; j++ ) {
			div = document.createElement('div');
			div.className = "gi_slot";
			sg = new StaticGrid(1,1); sg.setVerticalAlign(SG_VALIGN_MIDDLE);
			this._glyphs[i][j] = sg._cells[0][0];
			this._glyphs[i][j].className = 'gi_glyph_td';
			div.appendChild(sg._node);
			div2 = document.createElement('div');
			div2.className = 'gi_border gi_border_' + ( h == 0 ? 'p' : ( h == 1 ? 'm' : 'i' ));
			div.appendChild(div2);
			this._glyphParents[i].appendChild(div);
		}
		this._glyphParents[i].className = 'gi_p_glyph';
		div = document.createElement('div');
		div.innerHTML = locale['GlyphTypes'][i];
		div.className = "gi_glyph_t";
		layout._cells[0][0].appendChild(div);
		layout._cells[0][0].appendChild(this._glyphParents[i]);
	}
	
	layout._node.className = 'align_center';
	layout._cells[0][1].appendChild(this._listParent);
	this._node.appendChild(layout._node);
}

GlyphInterface.prototype._node = null;
GlyphInterface.prototype._glyphParents = [];
GlyphInterface.prototype._listParent = null;
GlyphInterface.prototype._glyphs = [];
GlyphInterface.prototype._onClickHandler = [];
GlyphInterface.prototype._onContextMenuHandler = [];
GlyphInterface.prototype._chrClassId = -1;

/**
 * @param {Character} character
 */
GlyphInterface.prototype.update = function( character ) {
	var ag = character._chrClass ? character._chrClass._availableGlyphs : null;
	var g = character._chrClass ? character._chrClass._glyphs : null;
	var h, i, j, div;
	
	Tools.removeChilds(this._listParent);
	
	if( ag != null && this._chrClassId != character._chrClass._id ) {
		for( h=0; h<3; h++ ) {
			j = GI_TYPE_TO_ORDER[h];
			div = document.createElement('div');
			div.innerHTML = locale['GlyphTypes'][j];
			div.className = 'gi_type_title';
			this._listParent.appendChild(div);
			for( i=0;i<ag[j].length;i++ ) {
				div = document.createElement("a");
				div.className = "gi_list_item";
				div.onmousemove = function(){Tooltip.move();};
				div.onmouseout = function(){Tooltip.hide();};
				Listener.add(div,"click",this._onClick,this,[j,ag[j][i]]);
				Listener.add(div,"mouseover",Tooltip.showSpellByReference,Tooltip,[ag[j][i]._spell]);
				div.innerHTML = ag[j][i]._spell.getName();
				this._listParent.appendChild(div);
				this._listParent.appendChild(document.createElement("br"));
			}
		}
		
		this._listParent.style.display = "block";
	}
	else {
		this._listParent.style.display = "none";
	}
	
	if( g ) {
		for( h=0; h<3; h++ ) {
			for( i=0;i<g[h].length;i++ ) {
				this._glyphs[h][i].style.backgroundImage = "";
				this._glyphs[h][i].innerHTML = "";

				if ( i >= character._chrClass._availableGlyphSlots ) {
					this._glyphs[h][i].innerHTML = "<div class='gi_glyph gi_unavailable'>"+TextIO.sprintf1( locale['GI_NotAvailable'], ( i + 1 ) * 25 ) + "</div>";
				}
				else if( !g[h][i] ) {
					this._glyphs[h][i].innerHTML = "<div class='gi_glyph gi_unused'>"+locale['GI_Empty']+"</div>";
				} 
				else {
					this._glyphs[h][i].style.backgroundImage = "url(images/icons/half/"+g[h][i]._spell._icon+".png)";
					div = document.createElement("a");
					div.className= "gi_used";
					div.onmousemove = function(){Tooltip.move();};
					div.oncontextmenu = function(){return false;};
					div.onmouseout = function(){Tooltip.hide();};
					Listener.add(div,"mouseover",Tooltip.showSpellByReference,Tooltip,[g[h][i]._spell]);
					Listener.add(div,"contextmenu",this._onContextMenu,this,[h,i]);
					div.innerHTML = g[h][i]._spell.getName();
					this._glyphs[h][i].appendChild(div);
				}
			}
		}
	}
};

GlyphInterface.prototype.setOnClickHandler = function( handler, scope ) {
	this._onClickHandler = [handler,scope];
};
GlyphInterface.prototype.setOnContextMenuHandler = function( handler, scope ) {
	this._onContextMenuHandler = [handler,scope]; 
};

GlyphInterface.prototype._onClick = function( type, glyph ){
	if( this._onClickHandler ) {
		this._onClickHandler[0].apply(this._onClickHandler[1],[type,glyph]);
	}
};

GlyphInterface.prototype._onContextMenu = function( type, index ){
	if( this._onContextMenuHandler ) {
		this._onContextMenuHandler[0].apply(this._onContextMenuHandler[1],[type,index]);
	}
};