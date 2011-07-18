/**
 * @constructor
 * @param {Object} map
 * @param {Element} parent
 * @returns {FilterableCollection}
 */
function FilterableCollection( map, parent ) {
	this._map = {};
	if( map ) {
		for( var key in map ) {
			this._map[key] = map[key];
		}
	}
	this._parent = parent;
	this._filterControl = document.createElement("input");
	Listener.add(this._filterControl, "change", this._onFilterChange, this, []);
	Listener.add(this._filterControl, "keyup", this._onFilterChange, this, []);
	Listener.add(this._filterControl, "blur", this._onFilterChange, this, []);
}

FilterableCollection.prototype = {
		/** @type {Object} **/
		_map: null,
		/** @type {Element} **/
		_parent: null,
		/** @type {Element} **/
		_filterControl: null,
		/**
		 * @param {string} key
		 */
		filter: function( key ) {
			Tools.removeChilds(this._parent);
			for( var k in this._map ) {
				if( !key || new RegExp(key,"i").exec(k) ) {
					this._parent.appendChild(this._map[k]);
				}
			}
		},
		showAll: function() {
			Tools.removeChilds(this._parent);
			for( var k in this._map ) {
				this._parent.appendChild(this._map[k]);
			}
		},
		_onFilterChange: function() {
			this.filter(this._filterControl.value);
		}
};