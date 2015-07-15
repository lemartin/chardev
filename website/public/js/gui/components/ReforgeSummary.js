/**
 * @constructor
 */
function ReforgeSummary() {
	/* do nothing */	
	this.node = Dom.create('div', {'class': 'rs_p'});
}

ReforgeSummary.prototype = {
	node: null,
	/**
	 * @param {CharacterFacade} character
	 */
	update: function( character ) {
		
		var sg = new StaticGrid(1,REFORGABLE_STATS.length+1), sum = [0,0,0,0,0,0,0,0];
		
		for( var i = 0; i<REFORGABLE_STATS.length; i++ ) {
			sg.cells[0][1+i].innerHTML = "<div class='rs_header'>"+locale['ItemStatNamesShort'][REFORGABLE_STATS[i]]+"</div>";
		}
		
		for( var i=0; i<18; i++ ) {
			/** @type {EquippedItem} **/
			var itm = character.items[i];
			if( itm && itm.reducedStat != -1 ) {
				
				var n = sg.addRow();

				var div = Dom.createAt( sg.cells[n][0], 'div', {
					'class': 'row_bg'+(1+n%2)+' rs_cell rs_cell_l'
				});
				

				var a = Dom.createAt(div, 'a', {'text': itm.name, 'class': 'item_quality_'+itm.quality, 'href': 'javascript:;'});
				ChardevHtml.addTooltip(a, itm.getTooltip());
				
				if( n == 1 ) {
					Dom.addClass(div, "rs_cell_top");
				}
				
				for( var j=0 ; j<REFORGABLE_STATS.length; j++ ) {
					if( itm.reducedStat == REFORGABLE_STATS[j] ) {
						Dom.createAt( sg.cells[n][1 + j], 'span', {'class': 'rs_stat red', 'text': "-"+itm.addedStatValue} );
						sum[j] -= itm.addedStatValue; 
					}
					else if( itm.addedStat == REFORGABLE_STATS[j] ) {
						Dom.createAt( sg.cells[n][1 + j], 'span', {'class': 'rs_stat green', 'text': "+"+itm.addedStatValue} );
						sum[j] += itm.addedStatValue;
					}
					else {
						Dom.createAt( sg.cells[n][1 + j], 'span', {'class': 'grey', 'text': "0"} );
					}
					Dom.addClass(sg.cells[n][1+j],  "rs_cell row_bg"+(1+n%2));
					
					if( n == 1 ) {
						Dom.addClass(sg.cells[n][1+j],  "rs_cell_top");
					}
				}
				
				
				Dom.addClass( sg.cells[n][1], "rs_cell_lp");
				Dom.addClass( sg.cells[n][8], "rs_cell_rp");
			}
		}
		
		var n = sg.addRow();
		for( var j=0 ; j<REFORGABLE_STATS.length; j++ ) {
			if( sum[j] > 0 ) {
				Dom.createAt( sg.cells[n][1 + j], 'div', {'class': 'rs_stat_sum green', 'text': "+"+Math.abs(sum[j])} );
			}
			else if( sum[j] < 0 ) {
				Dom.createAt( sg.cells[n][1 + j], 'div', {'class': 'rs_stat_sum red', 'text': "-"+Math.abs(sum[j])} );
			} 
		}
		Dom.truncate(this.node);
		Dom.createAt(this.node,'div',{'class': 'rs_title', 'text': 'Reforge Summary'});
		Dom.append(this.node,sg.node);
	}
};