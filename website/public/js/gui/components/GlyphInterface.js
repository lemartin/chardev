/**
 * @constructor
 */
function GlyphInterface() {
	this.node = Dom.create('div', {'class': 'gi_p'});
	this.eventMgr = new GenericSubject();
	this.eventMgr.registerEvent('add_glyph', ['glyph']);
	this.eventMgr.registerEvent('remove_glyph', ['glyph']);
}

GlyphInterface.prototype = {
	node: null,
	eventMgr: null,
	/**
	 * @param gs
	 * @param {CharacterFacade} character
	 */
	update: function( gs, character ) {
		var i, t;
		Dom.truncate(this.node);
		
		if( character.getCharacterClassId() == 0 ) {
			Dom.createAt( this.node, 'div', {'class': 'gi_error', 'text': 'You have to select a Class before you can use Glyphs!'});
			return;
		}
		if( character.getAvailableGlyphSlots() == 0 ) {
			Dom.createAt( this.node, 'div', {'class': 'gi_error', 'text': 'You have to reach Level 25 before you can use Glyphs!'});
			return;
		}

		var container = Dom.createAt( this.node, 'div', {'class': 'gi_glyphs_p'});
		
		
//		var priContainer = Dom.createAt( container, 'div', {'class': 'gi_glyphs_c'});
		var majContainer = Dom.createAt( container, 'div', {'class': 'gi_glyphs_c'});
		var minContainer = Dom.createAt( container, 'div', {'class': 'gi_glyphs_c'});
		
//		Dom.createAt( priContainer, 'div', {'class': 'gi_list_h', 'text': 'Prime Glyphs'});
		Dom.createAt( majContainer, 'div', {'class': 'gi_list_h', 'text': 'Major Glyphs'});
		Dom.createAt( minContainer, 'div', {'class': 'gi_list_h', 'text': 'Minor Glyphs'});
		
		var egs = [0,0,0];
		var gids = {};
		
		for( i = 0; i < character.glyphs.length; i++ ) {	
//			if( character.glyphs[i].getType() == Glyph.PRIME ) {
//				t = priContainer;
//				egs[2]++;
//			}
//			else 
			if( character.glyphs[i].getType() == Glyph.MAJOR ) {
				t = majContainer;
				egs[0]++;
			}
			else {
				t = minContainer;
				egs[1]++;
			}
			gids[character.glyphs[i].id] = true;
			
			var div = Dom.createAt( t, 'div', {'class': 'gi_glyph_c'});
			Dom.createAt( div, 'img', {'class': 'gi_glyph_icon', 'src': '/images/icons/half/'+character.glyphs[i].getIcon()+".png"});
			var a = Dom.createAt( div, 'a', {'class': 'gi_glyph', 'href': 'javascript:', 'text': character.glyphs[i].getName()});
			a.oncontextmenu = function(){return false;};
			ChardevHtml.addTooltip(a, character.glyphs[i].getTooltip()+"<div class='gi_note'>Right click to remove</div>");

			div.oncontextmenu = function(){return false;};
			Listener.add( div, 'contextmenu', this.eventMgr.fire, this.eventMgr, ['remove_glyph', {'glyph': character.glyphs[i]}]);
		}
		
		for( i = 0; i < character.getAvailableGlyphSlots(); i++ ) {
			if( i >= egs[0] ) {
				div = Dom.createAt( majContainer, 'div', {'class': 'gi_glyph_c gi_empty'});
				a = Dom.createAt( div, 'a', {'text': 'Empty Glyph Slot', 'href': 'javascript:'});
				ChardevHtml.addTooltip(a, "Select a Glyph from the list below");
			}
			if( i >= egs[1] ) {
				div = Dom.createAt( minContainer, 'div', {'class': 'gi_glyph_c gi_empty'});
				a = Dom.createAt( div, 'a', {'text': 'Empty Glyph Slot', 'href': 'javascript:'});
				ChardevHtml.addTooltip(a, "Select a Glyph from the list below");
			}
//			if( i >= egs[2] ) {
//				div = Dom.createAt( priContainer, 'div', {'class': 'gi_glyph_c gi_empty'});
//				a = Dom.createAt( div, 'a', {'text': 'Empty Glyph Slot', 'href': 'javascript:'});
//				ChardevHtml.addTooltip(a, "Select a Glyph from the list below");
//			}
		}
		

		Dom.createAt( container, 'div', {'class': 'gi_list_h', 'text': 'Available Glyphs'});
		var list = Dom.createAt( container, 'div', {'class': 'gi_list_p'});
		
//		var priList = Dom.createAt( list, 'div', {'class': 'gi_list_c'});
		var majList = Dom.createAt( list, 'div', {'class': 'gi_list_c'});
		var minList = Dom.createAt( list, 'div', {'class': 'gi_list_c'});
		
		for( i=0; i<gs.length; i++ ) {
			if( gids[gs[i].id] === true ) {
				continue;
			}
//			if( gs[i].getType() == Glyph.PRIME ) {
//				t = priList;
//			}
//			else 
			if( gs[i].getType() == Glyph.MAJOR ) {
				t = majList;
			}
			else {
				t = minList;
			}
			a = Dom.createAt( t, 'a', {'class': 'gi_list_entry', 'href': 'javascript:', 'text': gs[i].getName()});
			ChardevHtml.addTooltip(a, gs[i].getTooltip()+"<div class='gi_note'>Left click to add</div>");
			Listener.add( a, 'click', this.eventMgr.fire, this.eventMgr, ['add_glyph', {'glyph': gs[i]}]);
		}
	}
};