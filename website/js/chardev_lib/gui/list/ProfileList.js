var PL_ORDER_TIME = 'time';

/**
 * @extends {List}
 * @constructor
 * @returns {ProfileList}
 */
function ProfileList() {
	List.call(this,PL_ORDER_TIME);
	this._filter = new ProfileFilter();
	this._filter.setFilterHandler(new Handler(this.filter, this));

	Tools.setChild(this._filterCollapsable._content,this._filter._node);
	
	this.onUpdate = null;
	this._content.style.display = "none";
	
	this._orderDirection = IL_DESC;
	
	this._deleteProfileHandler = new Handler(this._onProfileDelete_callback,this);
}
ProfileList.prototype = new List(PL_ORDER_TIME);
ProfileList.prototype._deleteProfileHandler = null;

ProfileList.prototype.update = function( ) {
	var url = "php/interface/profiles/get_profiles.php" + 
	TextIO.queryString({
		'a': this._filter.buildArgumentString(),
		'o': this._order+"."+(this._orderDirection==IL_ASC?'asc':'desc')+";",
		'p': this._page
	});
	this._requestedURL = url;
	Ajax.get(url, this._updateHandler, [url]);
	this.showLoading();
};

ProfileList.prototype._deserialize = function( data ) {
	var i;
	var a;
	var grid;
	var span;
	var column = 0, row;
	if( data.length < 2 ) {
		this._content.innerHTML = "<div class='il_nothing'>Nothing Found</div>";
	}
	else {
		grid = new StaticGrid(
				1 ,
				4
			);
		grid._node.cellSpacing = "0px";
		//
		this.updatePages( Math.ceil( data[0][0]/data[0][1] ) );
		
		// skip icon
		//grid._cols[column].width = "26px";
		//column++;
		
		grid._cols[column].width = "30px";
		column++;
		
		grid._cols[column].width = "26px";
		column++;
		
		grid._cols[column].width = "26px";
		column++;
		
		grid._cols[column].width = (920 - 30 - 26 -26) +"px";
		column++;
		
		
		for( i=0; i<column; i++ ) {
			grid._cells[0][i].className = "il_sort_c";
		}
		
		for( i = 1; i < data.length; i++ ) {
			column = 0;


			
			row = grid.addJoinedRow();

			grid._cells[row][0].className = "pl_entry_h";
			
			a = document.createElement("a");
			a.innerHTML = ( data[i][2] ? data[i][2] : "Profile #"+data[i][0] );
			a.href = "?profile="+data[i][0];
			a.target = "_blank";
			
			if( data[i][3] ) {
				a.onmouseout = function(){Tooltip.hide();};
				a.onmousemove = function(){Tooltip.move();};
				Listener.add(a,"mouseover",Tooltip.showText,Tooltip,[data[i][3]]);
			}
			grid._cells[row][0].appendChild(a);
			
			span = document.createElement("span");
			span.innerHTML = "&nbsp;Created: "+data[i][7]+"&nbsp;";
			grid._cells[row][0].appendChild(span);
			
			if( this._onclickHandler ) {
				a = document.createElement("a");
				a.innerHTML = "[Import]";
				a.className = "pl_import_link";
				Listener.add( a, "click", function(serializedProfile){ this._onclickHandler.notify([serializedProfile]); }, this, [data[i][0]]);
				grid._cells[row][0].appendChild(a);
			}
			
			if( g_settings.userId == data[i][1] ) {
				a = document.createElement("a");
				a.innerHTML = "[x]";
				a.className = 'pl_delete_link';
				Listener.add( a, "click", this._onProfileDelete,this, [data[i][0]]);
				grid._cells[row][0].appendChild(a);
			}

			row = grid.addRow();
			grid._rows[row].className = 'il_row'+(i%2); 
			grid._cells[row][column++].innerHTML = "<div class='text_align_center'>"+data[i][6]+"</div>";
			grid._cells[row][column++].innerHTML = "<div style='background-image:url(images/site/race_class/small/chr_race_" + data[i][4] + ".png)' class='il_icon' ></div>";
			grid._cells[row][column++].innerHTML = "<div style='background-image:url(images/site/race_class/small/" + data[i][5] + ".png)' class='il_icon' ></div>";
			
		}
		Tools.setChild(this._content,grid._node);
	}
};

ProfileList.prototype._onProfileDelete = function( profileId ) {
	if( !confirm(locale['sure_delete_profile']) ) {
		return;
	}

	CharacterIO.deleteFromDatabase(
		profileId,
		this._deleteProfileHandler
	);
};

ProfileList.prototype._onProfileDelete_callback = function( request, deletedProfileId ) {
	if ( request.getResponseHeader("error") ) {
		Tooltip.showError(request.responseText);
	} 
	else {
		this.update();
	}
};
