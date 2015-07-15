/**
 * @constructor
 */
function CharacterInterface() {
	this.node = Dom.create("div", {"class": "ci_c"});
	this.eventMgr = new GenericSubject();
	this.eventMgr.registerEvent("select", ["index"]);
	this.eventMgr.registerEvent("remove", ["index"]);
	this.eventMgr.registerEvent("mouseover", ["index"]);
	this.eventMgr.registerEvent("mouseout", ["index"]);
	this.eventMgr.registerEvent("add", []);
} 

CharacterInterface.prototype = {
	/** @type {Element} */
	node: null,
	/** @type {GenericSubject} */
	eventMgr: null,
	/**
	 * @param {GenericObserver} observer
	 */
	addObserver: function( observer )  {
		this.eventMgr.addObserver(observer);
	},
	/**
	 * @param {GenericObserver} observer
	 */
	removeObserver: function(observer) {
		this.eventMgr.removeObserver(observer);
	},
	/**
	 * @param {Array} characters
	 * @param {number} selectedIndex
	 */
	update: function( characters, selectedIndex ) {
		//
		// clear
		Dom.truncate(this.node);
		this.items = [];
		//
		// add characters
		for( var i=0; i<characters.length; i++ ) {
			this._add(i, characters[i], selectedIndex == i );
		}
		//
		// add btn
		var btn = Dom.createAt(this.node, "a", {"class": "ci_item ci_item_btn"});
		var a = Dom.createAt( btn, "a", {"class": "add ci_add", "href": "javascript:"});
		Dom.listen(a, "click", this.eventMgr.fire, this.eventMgr, ["add", {}]);
	},
	/**
	 * @param {number} index
	 * @param {CharacterFacade} character
	 * @param {boolean} selected
	 */
	_add: function( index, character, selected ) {
		var a = Dom.create("a", {"class": "ci_item", "href": "javascript:"});
		var raceIconSrc = "";
		var raceId = character.getCharacterRaceId();
		var classIconSrc = "";
		var classId = character.getCharacterClassId();
		var raceIcon = null;
		var classIcon = null;
		
		if( selected ) {
			Dom.addClass(a, "ci_item_selected");
		}
		
		if( raceId > 0 ) {
			raceIcon = Dom.createAt(a, "img", {"src": raceIconSrc, "class": "ci_icon ci_race_icon"}); 
		}
		
		if( classId > 0 ) {
			classIcon = Dom.createAt(a, "img", {"src": classIconSrc, "class": "ci_icon ci_class_icon"});
		}
		
		this._renderIcons(raceId, raceIcon, classId, classIcon, ! selected);
		
		a.oncontextmenu = function() { return false; };
		
		Dom.listen(a, "click", this.eventMgr.fire, this.eventMgr, ["select", {"index": index}]);
		Dom.listen(a, "contextmenu", this.eventMgr.fire, this.eventMgr, ["remove", {"index": index}]);
		Dom.listen(a, "mouseover", this._hover, this, [raceId, raceIcon, classId, classIcon, selected, true, index]);
		Dom.listen(a, "mouseout", this._hover, this, [raceId, raceIcon, classId, classIcon, selected, false , index]);
		
		Dom.append(this.node, a);
	},
	_hover: function( raceId, raceIcon, classId, classIcon, selected, hover, index ) {
		this.eventMgr.fire( hover ? "mouseover" : "mouseout", { "index": index });
		this._renderIcons( raceId, raceIcon, classId, classIcon, ! selected && ! hover );
	},
    _renderIcons: function( raceId, raceIcon, classId, classIcon, grey ) {
		var g = grey ? "g/" : "";
		if( raceIcon ) {
			raceIcon.src = "/images/site/race_class/" + g + "small/chr_race_" + raceId + ".png";
		}
		if( classIcon ) {
			classIcon.src = "/images/site/race_class/" + g + "small/" + classId + ".png";
		}
	}
};