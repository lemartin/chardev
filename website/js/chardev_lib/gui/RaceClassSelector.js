/**
 * @author LeMartin
 */

var CHR_RACE_CLASS_MASK = {
	1: 1|2|4|8|16|32|128|256,
	2: 1|4|8|32|64|128|256,
	3: 1|2|4|8|16|32|64|128|256,
	4: 1|4|8|16|32|128|1024,
	5: 1|4|8|16|32|128|256,
	6: 1|2|4|16|32|64|1024,
	7: 1|8|16|32|128|256,
	8: 1|4|8|16|32|64|128|256|1024,
	9: 1|4|8|16|32|64|128|256,
	10: 1|2|4|8|16|32|128|256,
	11: 1|2|4|16|32|64|128,
	22: 1|4|8|16|32|128|256|1024
};

var CHR_RACE_ORDER = [[1,3,4,7,11,22],[2,5,6,8,10,9]];

/**
 * @constructor
 * @param {Character} character
 * @returns {RaceClassSelector}
 */
function RaceClassSelector( character ) {
	var layoutGrid = new StaticGrid(1,2);
	var layoutGrid2 = new StaticGrid( 7, 2 );
	var d1,d2;
	this._character = character;
	this._node = document.createElement("div");
	this._node.className = 'rcs_parent';
	this._selectRace = document.createElement("div");
	this._selectRace.className = 'rcs_icon_race_container';
	this._selectClass = document.createElement("div");
	this._selectClass.className = 'rcs_icon_container';
	this._race = document.createElement("div");
	this._race.className = "character_race_icon";
	this._race.style.backgroundImage = "url(images/site/race_class/medium/empty.png)";
	
	this._raceIcon = document.createElement("img");
	this._raceIcon.className = "rcs_icon_s";
	this._raceIcon.src = "images/site/race_class/medium/empty.png";
	this._race = new LayeredDiv(4);
	this._race._layers[0].appendChild(this._raceIcon);
	this._race._layers[0].className = "rcs_icon_l";
	this._race._layers[1].className = "rcs_shadow";
	this._race._layers[2].className = "rcs_border";
	this._race._layers[3].className = "rcs_event_l";
	layoutGrid._cells[0][0].appendChild(this._race._layers[0]);
	
	this._classIcon = document.createElement("img");
	this._classIcon.className = "rcs_icon_s";
	this._classIcon.src = "images/site/race_class/medium/empty.png";
	this._class = new LayeredDiv(4);
	this._class._layers[0].appendChild(this._classIcon);
	this._class._layers[0].className = "rcs_icon_l";
	this._class._layers[1].className = "rcs_shadow";
	this._class._layers[2].className = "rcs_border";
	this._class._layers[3].className = "rcs_event_l";
	layoutGrid._cells[0][1].appendChild(this._class._layers[0]);
	this._node.appendChild(layoutGrid._node);

	d1 = document.createElement("div"); d1.className = 'rcs_select_header'; d1.innerHTML = "Select a Race:";
	d2 = document.createElement("div"); d2.className = 'rcs_close'; d2.onclick = function(){Tooltip.enable();};
	this._selectRace.appendChild(d1);this._selectRace.appendChild(d2);
	
	layoutGrid2._cells[0][0].innerHTML = "<div class='rcs_faction_alliance'>Alliance</div>";
	layoutGrid2._cells[0][1].innerHTML = "<div class='rcs_faction_horde'>Horde</div>";
	
	for( var j = 0; j<2; j++ ) {
		for( var i = 0; i<CHR_RACE_ORDER[j].length; i++ ) {
			var div = document.createElement("div");
			div.className = "rcs_race_icon";
			div.style.backgroundImage = "url(images/site/race_class/medium/chr_race_"+CHR_RACE_ORDER[j][i]+".png)";
			Listener.add(div,"click",this._onRaceIconClick,this,[CHR_RACE_ORDER[j][i]]);
			layoutGrid2._cells[1+i][j].appendChild(div);
		}
	}
	
	this._selectRace.appendChild(layoutGrid2._node);
	
	Listener.add(this._class._layers[3],"click",this.showClassSelector,this,[]);
	Listener.add(this._race._layers[3],"click",this.showRaceSelector,this,[]);
	
	Listener.add(this._class._layers[3],"mouseover",this.onMouse,this,[1,1]);
	Listener.add(this._race._layers[3],"mouseover",this.onMouse,this,[0,1]);
	Listener.add(this._class._layers[3],"mouseout",this.onMouse,this,[1,0]);
	Listener.add(this._race._layers[3],"mouseout",this.onMouse,this,[0,0]);
	
	this._raceChangeHandler = new Handler( this._onRaceChangeCallback, this );
	this._classChangeHandler = new Handler( this._onClassChangeCallback, this );
}

RaceClassSelector.prototype._node = null;
RaceClassSelector.prototype._selectRace = null;
RaceClassSelector.prototype._selectClass = null;
RaceClassSelector.prototype._race = null;
RaceClassSelector.prototype._raceIcon = null;
RaceClassSelector.prototype._class = null;
RaceClassSelector.prototype._classIcon = null;
RaceClassSelector.prototype._character = null;
RaceClassSelector.prototype._raceChangeHandler = null;
RaceClassSelector.prototype._classChangeHandler = null;

RaceClassSelector.prototype.onMouse = function( type, over ) {
	if( type ) {
		this._class._layers[2].style.backgroundPosition = over != 1 ? "0px 0px" : "48px 0px";
	}
	else {
		this._race._layers[2].style.backgroundPosition = over != 1 ? "0px 0px" : "48px 0px";
	}
};

RaceClassSelector.prototype.update = function() {
	var d1,d2;
	if( this._character._chrRace != null ) {

		this._raceIcon.src = "images/site/race_class/medium/chr_race_"+this._character._chrRace._id+".png";
		
		if( this._character._chrClass != null ) {
			this._classIcon.src = "images/site/race_class/medium/"+this._character._chrClass._id+".png";
		}
		else {
			this._classIcon.src = "images/site/race_class/medium/empty.png";
		}
		
		Tools.removeChilds(this._selectClass);
		d1 = document.createElement("div"); d1.className = "rcs_select_header"; d1.innerHTML = "Select a Class:";
		d2 = document.createElement("div"); d2.className = "rcs_close"; d2.onclick = function(){Tooltip.enable();};
		this._selectClass.appendChild(d1);this._selectClass.appendChild(d2);
		
		for( var i = 0; i<11; i++ ) {
			if( (CHR_RACE_CLASS_MASK[this._character._chrRace._id]&(1<<i)) != 0 ) {
				var div = document.createElement("div");
				div.className = "rcs_icon";
				div.style.backgroundImage = "url(images/site/race_class/medium/"+(i+1)+".png)";
				Listener.add(div,"click",this._onClassIconClick,this,[i+1]);
				this._selectClass.appendChild(div);
			} 
		}
		d1 = document.createElement('div');
		d1.className = 'clear_both';
		this._selectClass.appendChild(d1);
	}
	else {
		this._raceIcon.src = "images/site/race_class/medium/empty.png";
	}
};

RaceClassSelector.prototype._onClassIconClick = function( id ) {
	DatabaseIO.getCharacterClass(id, this._character, this._classChangeHandler);
	Tooltip.showLoading();
};

RaceClassSelector.prototype._onRaceIconClick = function( id ) {
	DatabaseIO.getCharacterRace(id, this._character, this._raceChangeHandler);
	Tooltip.showLoading();
};

RaceClassSelector.prototype._onClassChangeCallback = function( error ) {
	Tooltip.enable();
	this._character.calculateStats();
};

RaceClassSelector.prototype._onRaceChangeCallback = function( error ) {
	this.showClassSelector();
	this._character.calculateStats();
};

RaceClassSelector.prototype.showClassSelector = function() {
	if( this._character._chrRace != null ) {
		Tooltip.showDisabled(this._selectClass);
	}
	else {
		Tooltip.showError("Select a Race first!");
	}
};

RaceClassSelector.prototype.showRaceSelector = function() {
	Tooltip.showDisabled(this._selectRace);
};