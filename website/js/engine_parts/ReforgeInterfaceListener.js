/**
 * @constructor
 * @param {ReforgeInterface} reforgeInterface
 */
function ReforgeInterfaceListener ( reforgeInterface ) {
	
	this._reforgeInterface = reforgeInterface;
	
	reforgeInterface.addListener('restore_all', 		new Handler(this.restoreAll, this));
	reforgeInterface.addListener('reforge_all', 		new Handler(this.reforgeAll, this));
	reforgeInterface.addListener('restore', 			new Handler(this.restore, this));
	reforgeInterface.addListener('reforge', 			new Handler(this.reforge, this));
	reforgeInterface.addListener('reforge_from_array', 	new Handler(this.reforgeFromArray, this));
	
	reforgeInterface._reforgeOptimisationInterface.addListener('stat_weight_change', 	new Handler(Engine.setStatWeight,Engine));
	reforgeInterface._reforgeOptimisationInterface.addListener('stat_cap_change', 		new Handler(Engine.setStatCap,Engine));
	reforgeInterface._reforgeOptimisationInterface.addListener('stat_caps_reset', 		new Handler(Engine.resetStatCaps,Engine));
	reforgeInterface._reforgeOptimisationInterface.addListener('optimise', 				new Handler(this.optimiseReforge, this));
	reforgeInterface._reforgeOptimisationInterface.addListener('use_optimised_reforge', new Handler(this.useOptimiedReforge, this));
}

//
//
ReforgeInterfaceListener.prototype = {
	//
	// ReforgeOptimisationInterface
	//
	optimiseReforge: function() {
		if( Engine._shownCharacter != -1 ) {
			Engine._reforgeOptimiser.optimise();
		}
	},
	useOptimiedReforge : function(){
		if( ! Engine._reforgeOptimiser && Engine._reforgeOptimiser._optimisedReforgeConfiguration ) {
			return;
		}
		var arr = [], crf;
		for( var i=0; i<INV_ITEMS; i++ ) {
			crf = Engine._reforgeOptimiser._optimisedReforgeConfiguration[i];
			if( crf && crf[0] != -1 ) {
				arr[i] = [REFORGABLE_STATS[crf[0]],REFORGABLE_STATS[crf[1]]];
			}
		}
		Engine._currentCharacter.reforgeFromArray(arr);
		Engine.updateReforgeTab();
	},
	//
	//	ReforgeInterface
	//
	reforgeAll: function( redStats, addStats ) {
		try {
			Engine._currentCharacter._inventory.reforgeAllItems(redStats, addStats);
		}
		catch( e ) {
			Engine.handleInvalidReforgeException( e ); 
		}
		Engine._currentCharacter.calculateStats();
		Engine.updateReforgeTab();
	},
	reforgeFromArray: function( refArray ) {
		try {
			Engine._currentCharacter._inventory.reforgeFromArray(refArray);
		}
		catch( e ) {
			Engine.handleInvalidReforgeException( e ); 
		}
		Engine._currentCharacter.calculateStats();
		Engine.updateReforgeTab();
	},
	reforge: function( reduced, added ) {
		try {
			Engine._currentCharacter._inventory.get( Engine._currentCharacter._sheet._selectedSlot ).reforge( reduced, added );
		}
		catch( e ) {
			Engine.handleInvalidReforgeException( e ); 
		}
		Engine._currentCharacter.calculateStats();
		Engine.updateReforgeTab();
	},
	restoreAll: function() {
		Engine._currentCharacter._inventory.restoreAllItems();
		Engine._currentCharacter.calculateStats();
		Engine.updateReforgeTab();
	},
	restore: function() {
		var slot = Engine._currentCharacter._sheet._selectedSlot;
		Engine._currentCharacter._inventory.get( slot ).restore();
		Engine._currentCharacter.calculateStats();
		Engine.updateReforgeTab();
	}
};