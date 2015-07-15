/**
 * @constructor
 * @param {GlyphInterface} glyphInterface
 * @param {CharacterGuiAdapter} adapter
 */
function GlyphInterfaceController( glyphInterface, adapter ) {
	this.glyphInterface = glyphInterface; 
	this.adapter = adapter; 
	
	this.glyphInterface.eventMgr.addObserver(new GenericObserver(['add_glyph', 'remove_glyph'], new Handler( this.glyphInterfaceHandler, this)));
}

GlyphInterfaceController.prototype = {
		glyphInterface: null,
		adapter: null,
		/**
		 * @param {GenericEvent} e
		 */
		glyphInterfaceHandler: function( e ) {
			var cc = this.adapter.character;
			if( e.is('add_glyph') ) {
				try {
					//TODO don't break visibility rules!
					cc.addGlyph( e.get('glyph').__glyph);
				}
				catch( ex ) {
					Tooltip.showError(ex);
				}
			}
			else if( e.is('remove_glyph') ) {
				cc.removeGlyph( e.get('glyph').__glyph);
			}
		},
		update: function() {
			var cc = this.adapter.character;
			var gs = [];
			if( cc.chrClass ) { 
				var cccl = cc.chrClass;
				for( var i=0; i< cccl.availableGlyphs.length ; i++ ) {
					gs.push(new GlyphFacade(cccl.availableGlyphs[i], cc));
				}
			}
			this.glyphInterface.update( gs, new CharacterFacade(cc));
		}
};