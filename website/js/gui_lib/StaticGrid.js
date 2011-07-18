/** @const */ var SG_VALIGN_TOP = 'top';
/** @const */ var SG_VALIGN_MIDDLE = 'middle';
/** @const */ var SG_VALIGN_BOTTOM = 'bottom';
/**
 * @constructor
 * @param {number} rows
 * @param {number} cols
 * @returns {StaticGrid}
 */
function StaticGrid( rows, cols ){
	var colGrp = document.createElement('colgroup');
	var i,j;
	// table
	this._node = document.createElement("table");
	this._node.cellSpacing = "0";
	this._node.cellPadding = "0";
	
	this._rows = new Array(rows);
	this._cells = new Array(rows);
	this._cols = new Array(cols);

	this._node.appendChild(colGrp);
	for( j = 0; j < cols; j++ ){
		this._cols[j] = document.createElement('col');
		colGrp.appendChild(this._cols[j]);
	}
	// body
	this._tbody = document.createElement("tbody");
	this._node.appendChild(this._tbody);
    
    for ( i = 0; i < rows; i++) {
		//rows
		this._rows[i] = document.createElement("tr");
		this._tbody.appendChild(this._rows[i]);
		//cells
		this._cells[i] = new Array(cols);
		for( j = 0; j < cols; j++ ){
			this._cells[i][j] = document.createElement("td");
			this._rows[i].appendChild(this._cells[i][j]);
		}
    }
};
/**
 * @param {string} vAlign
 */
StaticGrid.prototype.setVerticalAlign = function ( vAlign ) {
	var i,j;
	this._vAlign = vAlign;
	for ( i = 0; i < this._cells.length; i++) {
		for( j = 0; j < this._cells[i].length; j++ ){
			this._cells[i][j].vAlign = vAlign;
		}
	}
};
/**
 * @returns {number} Row index
 */
StaticGrid.prototype.addRow = function() {
	var row = this._rows.length, i;
	this._rows[row] = document.createElement("tr");
	this._cells[row] = [];
	for( i=0; i<this._cols.length; i++ ) {
		this._cells[row][i] = document.createElement("td");
		this._cells[row][i].vAlign = this._vAlign;
		this._rows[row].appendChild(this._cells[row][i]);
	}
	this._tbody.appendChild(this._rows[row]);
	return row;
};

/**
 * @returns {number} Row index
 */
StaticGrid.prototype.addJoinedRow = function() {
	var row = this._rows.length, td = null, i;
	this._rows[row] = document.createElement("tr");
	this._cells[row] = [];
	td = document.createElement("td");
	td.colSpan = this._cols.length;
	td.vAlign = this._vAlign;
	this._rows[row].appendChild(td);
	for( i=0; i<this._cols.length; i++ ) {
		this._cells[row][i] = td;
	}
	this._tbody.appendChild(this._rows[row]);
	return row;
};

StaticGrid.prototype._cells = [];
StaticGrid.prototype._rows = [];
StaticGrid.prototype._cols = [];
StaticGrid.prototype._node = null;
StaticGrid.prototype._tbody = null;
StaticGrid.prototype._vAlign = "";
