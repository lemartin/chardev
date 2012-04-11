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
 * @param {CharacterSheet} characterSheet
 */
function RaceClassSelector( characterSheet ) {
	
	this.characterSheet = characterSheet;
	
	var layoutGrid = new StaticGrid(1,2);
	var layoutGrid2 = new StaticGrid( 7, 2 );
	var d1,d2;
	this.node = document.createElement("div");
	this.node.className = 'rcs_parent';
	this.selectRace = document.createElement("div");
	this.selectRace.className = 'rcs_icon_race_container';
	this.selectClass = document.createElement("div");
	this.selectClass.className = 'rcs_icon_container';
	this.chrRace = document.createElement("div");
	this.chrRace.className = "character_race_icon";
	this.chrRace.style.backgroundImage = "url(images/site/race_class/medium/slot_empty.png)";
	
	this.raceIcon = document.createElement("img");
	this.raceIcon.className = "rcs_icon_s";
	this.raceIcon.src = "images/site/race_class/medium/slot_empty.png";
	this.chrRace = new LayeredDiv(4);
	this.chrRace.layers[0].appendChild(this.raceIcon);
	this.chrRace.layers[0].className = "rcs_icon_l";
	this.chrRace.layers[1].className = "rcs_shadow";
	this.chrRace.layers[2].className = "rcs_border";
	this.chrRace.layers[3].className = "rcs_event_l";
	layoutGrid.cells[0][0].appendChild(this.chrRace.layers[0]);
	
	this.classIcon = document.createElement("img");
	this.classIcon.className = "rcs_icon_s";
	this.classIcon.src = "images/site/race_class/medium/slot_empty.png";
	this.chrClass = new LayeredDiv(4);
	this.chrClass.layers[0].appendChild(this.classIcon);
	this.chrClass.layers[0].className = "rcs_icon_l";
	this.chrClass.layers[1].className = "rcs_shadow";
	this.chrClass.layers[2].className = "rcs_border";
	this.chrClass.layers[3].className = "rcs_event_l";
	layoutGrid.cells[0][1].appendChild(this.chrClass.layers[0]);
	this.node.appendChild(layoutGrid.node);

	d1 = document.createElement("div"); d1.innerHTML = "<span class='rcs_select_header'>Select a Race:</span>";
	d2 = document.createElement("a"); d2.className = 'close rcs_close'; d2.onclick = function(){Tooltip.enable();};
	d1.appendChild(d2);
	this.selectRace.appendChild(d1);
	
	layoutGrid2.cells[0][0].innerHTML = "<div class='rcs_faction_alliance'>Alliance</div>";
	layoutGrid2.cells[0][1].innerHTML = "<div class='rcs_faction_horde'>Horde</div>";
	
	for( var j = 0; j<2; j++ ) {
		for( var i = 0; i<CHR_RACE_ORDER[j].length; i++ ) {
			var div = document.createElement("div");
			div.className = "rcs_race_icon";
			div.style.backgroundImage = "url(images/site/race_class/medium/chr_race_"+CHR_RACE_ORDER[j][i]+".png)";
			Listener.add(div,"click",this.__onRaceIconClick,this,[CHR_RACE_ORDER[j][i]]);
			layoutGrid2.cells[1+i][j].appendChild(div);
		}
	}
	
	this.selectRace.appendChild(layoutGrid2.node);
	
	Listener.add(this.chrClass.layers[3],"click",this.showClassSelector,this,[]);
	Listener.add(this.chrRace.layers[3],"click",this.showRaceSelector,this,[]);
	
	Listener.add(this.chrClass.layers[3],"mouseover",this.__onMouse,this,[1,1]);
	Listener.add(this.chrRace.layers[3],"mouseover",this.__onMouse,this,[0,1]);
	Listener.add(this.chrClass.layers[3],"mouseout",this.__onMouse,this,[1,0]);
	Listener.add(this.chrRace.layers[3],"mouseout",this.__onMouse,this,[0,0]);
}

RaceClassSelector.prototype = {
	node : null,
	selectRace : null,
	selectClass : null,
	chrRace : null,
	raceIcon : null,
	chrClass : null,
	classIcon : null,
	raceChangeHandler : null,
	classChangeHandler : null,
	chrRaceId: -1, 
	chrClassId: -1,
	characterSheet: null,
	
	__onMouse : function( type, over ) {
		if( type ) {
			this.chrClass.layers[2].style.backgroundPosition = over != 1 ? "0px 0px" : "48px 0px";
		}
		else {
			this.chrRace.layers[2].style.backgroundPosition = over != 1 ? "0px 0px" : "48px 0px";
		}
	},
	update : function( chrRaceId, chrClassId ) {
		this.chrRaceId = chrRaceId;
		this.chrClassId = chrClassId;
		var d1,d2;
		if( chrRaceId != -1 ) {
	
			this.raceIcon.src = "images/site/race_class/resized_chr_race_"+chrRaceId+".png";
			
			if( chrClassId != -1 ) {
				this.classIcon.src = "images/site/race_class/resized_"+chrClassId+".png";
				this.chrClass.layers[2].className = 'rcs_class_border';
				this.chrClass.layers[2].style.backgroundImage = 'url(images/site/race_class/class_border_' + chrClassId + '.png)';
			}
			else {
				this.classIcon.src = "images/site/race_class/medium/slot_empty.png";
				this.chrClass.layers[2].className = 'rcs_border';
				this.chrClass.layers[2].style.backgroundImage = '';
			}
			
			Tools.removeChilds(this.selectClass);
			
			d1 = document.createElement("div"); d1.innerHTML = "<span class='rcs_select_header'>Select a Class:</span>";
			d2 = document.createElement("a"); d2.className = 'close rcs_close'; d2.onclick = function(){Tooltip.enable();};
			d1.appendChild(d2);
			this.selectClass.appendChild(d1);
			
			for( var i = 0; i<11; i++ ) {
				if( (CHR_RACE_CLASS_MASK[chrRaceId]&(1<<i)) != 0 ) {
					var div = document.createElement("div");
					div.className = "rcs_icon";
					div.style.backgroundImage = "url(images/site/race_class/medium/"+(i+1)+".png)";
					Listener.add(div,"click",this.__onClassIconClick,this,[i+1]);
					this.selectClass.appendChild(div);
				} 
			}
			d1 = document.createElement('div');
			d1.className = 'clear_both';
			this.selectClass.appendChild(d1);
		}
		else {
			this.raceIcon.src = "images/site/race_class/medium/slot_empty.png";
		}
	},
	
	__onClassIconClick : function( chrClassId ) {
		this.characterSheet.selectedClass( chrClassId );
	},
	
	__onRaceIconClick : function( chrRaceId ) {
		this.characterSheet.selectedRace( chrRaceId );
	},
	
	showClassSelector : function( ) {
		if( this.chrRaceId != -1 ) {
			Tooltip.showDisabled(this.selectClass);
		}
		else {
			Tooltip.showDisabled(this.selectRace);
		}
	},
	
	showRaceSelector : function() {
		Tooltip.showDisabled(this.selectRace);
	}
};