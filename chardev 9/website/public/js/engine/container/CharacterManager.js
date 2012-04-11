/**
 * @constructor
 */
function CharacterManager( ) {
	this.characters = [];
	this.eventMgr = new GenericSubject();
	this.eventMgr.registerEvent('character_change',['character']);
}

CharacterManager.prototype = {
	characters: [],
	eventMgr: null,
	cursor: -1,
	addCharacter: function( character ) {
		this.characters.push( character );
		
		this.cursor = this.characters.length - 1;
		
		this.eventMgr.fire( 'character_change', {'character': character} );
	},

	removeCharacter: function( character ) {
		for( var k in this.characters ) {
			if( this.characters[k] != character ) {
				continue;
			}

			this.characters[k].splice( k , 1 );
			
			if( k == this.cursor ) {
				if( this.characters.length == 0 ) {
					this.cursor = -1;
				}
				else {
					if( this.cursor > 0 ) {
						this.cursor -- ;
					}
//					else {
//						this.cursor;
//					}
				}
			}
			
			return;
		}
	},
	
	getCurrentCharacter: function() {
		if( this.cursor == -1 ) {
			return null;
		}
		return this.characters[ this.cursor ];
	}
};