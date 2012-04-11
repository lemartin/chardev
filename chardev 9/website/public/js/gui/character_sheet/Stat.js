/**
 * @constructor
 * @param {number} group
 * @param {number} index
 */
function Stat( group, index ) 
{
	this.eventMgr = new GenericSubject();
	this.eventMgr.registerEvent('stat_tooltip_show', ['group', 'index', 'node']);
	this.eventMgr.registerEvent('stat_tooltip_hide', ['group', 'index', 'node']);

	this.group = group;
	this.index = index;
	var div = document.createElement("div");
	div.className = 'stat_table_value_div';
	this.node = document.createElement("div");
	this.node.className = 'stat_table_name_div';
	this.node.innerHTML = locale['CS_Stats'][group][index];
	this.node.appendChild(div);
	
	this.compareNode = document.createElement('span');
	this.compareNode.className = 'stat_table_stat_span stat_table_stat_compare_span';
	this.valueNode = document.createElement('span');
	this.valueNode.className = 'stat_table_stat_span';
	this.valueNode.innerHTML = 0;
	
	div.appendChild(this.compareNode);
	div.appendChild(this.valueNode);
	// TODO: 
	Listener.add(this.node,"mouseover",this.__onShowTooltip , this, []);
	Listener.add(this.node,"mouseout",this.__onHideTooltip , this, []);
	this.node.onmouseout = function(){Tooltip.hide();};
	
	this.flags = Stat.TYPE[this.group][this.index];
}

Stat.GRP_GENERAL = 0;
Stat.GRP_ATTRIBUTES = 1;
Stat.GRP_MELEE = 2;
Stat.GRP_RANGED = 3;
Stat.GRP_SPELL = 4;
Stat.GRP_DEFENSE = 5;
Stat.GRP_RESISTANCE = 6;

Stat.SPEED = 1<<0;
Stat.DAMAGE_RANGE = 1<<2;
Stat.SHOW_PLUS = 1<<3;
Stat.PER_CENT = 1<<4;
Stat.DPS = 1<<5;
Stat.MH_OH = 1<<6;
Stat.NA_RANGED = 1<<7;
Stat.MASTERY = 1<<8;

Stat.TYPE = [
	[0,0,0],
	[0,0,0,0,0],
	[Stat.DAMAGE_RANGE|Stat.MH_OH,Stat.DPS|Stat.MH_OH,0,Stat.SPEED|Stat.MH_OH,Stat.PER_CENT,Stat.PER_CENT|Stat.SHOW_PLUS,Stat.PER_CENT,0|Stat.MH_OH,Stat.MASTERY],
	[Stat.DAMAGE_RANGE|Stat.NA_RANGED,Stat.DPS|Stat.NA_RANGED,0,Stat.SPEED|Stat.NA_RANGED,Stat.PER_CENT,Stat.PER_CENT|Stat.SHOW_PLUS,Stat.PER_CENT,Stat.MASTERY],
	[0,Stat.PER_CENT,Stat.PER_CENT|Stat.SHOW_PLUS,0,0,0,Stat.PER_CENT,Stat.MASTERY],
	[0,Stat.PER_CENT,Stat.PER_CENT,Stat.PER_CENT,0,Stat.PER_CENT,Stat.PER_CENT],
	[0,0,0,0,0]
];

Stat.prototype = {
	group: -1, 
	index: -1, 
	name: "", 
	tooltip: "", 
	node: null, 
	value: 0, 
	compare: 0, 
	valueNode: null, 
	flags: 0,
	eventMgr: null,
	__onShowTooltip: function() {
		this.eventMgr.fire('stat_tooltip_show', { 'group': this.group, 'index': this.index, 'node': this.node});
	},
	__onHideTooltip: function() {
		this.eventMgr.fire('stat_tooltip_hide', { 'group': this.group, 'index': this.index, 'node': this.node});
	},
	//
	//#########################################################################
	//
	//	METHODS
	//
	//#########################################################################
	//
	addObserver: function(observer){this.eventMgr.addObserver(observer);},
	addPropagator: function(event, propagator){this.eventMgr.addPropagator(event, propagator);},
	setValue: function( value ){
		this.value = value;
	
		this.valueNode.innerHTML = "";
		
		if(( value === -1 || typeof value === 'object' && value[0] === -1 ) && this.flags&Stat.NA_RANGED ) {
			this.valueNode.innerHTML += "N/A";
			return;
		}
		
		if( this.flags&Stat.MH_OH ) {
			this.addValue(value[0]);
			if( value[1] != null ) {
				this.valueNode.innerHTML += "/";
				this.addValue(value[1]);
			}
		}
		else {
			this.addValue(value);
		}
		
	},
	addValue: function( value ) {
		if( this.flags&Stat.PER_CENT )	
		{
			this.valueNode.innerHTML += ( this.flags&Stat.SHOW_PLUS ? "+" : "" ) + TextIO.formatFloat(value,2)+"%";
		}
		else if( this.flags&Stat.DPS) {
			this.valueNode.innerHTML += TextIO.formatFloat(value,1);
		}
		else if( this.flags&Stat.MASTERY) {
			this.valueNode.innerHTML += TextIO.formatFloat(value,2);
		}
		else if( this.flags&Stat.SPEED ) {
			this.valueNode.innerHTML += TextIO.formatFloat(value/1000,2);
		}
		else if( this.flags&Stat.DAMAGE_RANGE ) {
			this.valueNode.innerHTML += value[0] + "-" + value[1];
		}
		else {
			this.valueNode.innerHTML += Math.floor(value);
		}
	},
	
	resetCompare: function() {
		this.compareNode.innerHTML = "";
	},
	setCompareValue: function( compare ){
		var cmp1, cmp2;
		this.compareNode.innerHTML = "";
		
		if(( compare === -1 || typeof compare === 'object' && compare[0] === -1 ) && this.flags&Stat.NA_RANGED ) {
			return;
		}
	
		if( this.flags&Stat.MH_OH ) {
			if( this.flags&Stat.DAMAGE_RANGE ) {
				return;
			}
			cmp1 = this.addCompare(compare[0], this.value[0]);
			if( compare[1] != null ) {
				cmp2 = this.addCompare(compare[1], this.value[1]);
				if( cmp1 || cmp2 ) {
					this.compareNode.innerHTML = (cmp1?cmp1:"0")+"/"+(cmp2?cmp2:"0");
				}
			}
			else {
				if( cmp1 != null ) {
					this.compareNode.innerHTML = cmp1;
				}
			}
		}
		else {
			cmp1 = this.addCompare(compare, this.value);
			this.compareNode.innerHTML = (cmp1?cmp1:"");
		}
	},
	addCompare: function( compare, value ) {
		var lt;
		
		if( ((Stat.MASTERY|Stat.PER_CENT)&this.flags) != 0 ) {
			lt = Math.floor( (compare - value) * 100 ) / 100;
		}
		else {
			lt = Math.floor( compare - value );
		}
		
		if ( lt != 0 ) {
			if( this.flags&Stat.SPEED ) {
				return "<span class='stat_table_stat_span "+
					( lt > 0 ? CSS_COMPARE_RED_CLASS : CSS_COMPARE_GREEN_CLASS )+"'>"+
					( lt > 0 ?'+':'-') + 
					TextIO.formatFloat2(Math.abs(lt)/1000)+
					"</span>";
			}
			return "<span class='stat_table_stat_span "+
				( lt > 0 ? CSS_COMPARE_GREEN_CLASS : CSS_COMPARE_RED_CLASS )+"'>"+
				( lt > 0 ?'+':'-') + 
				( (this.flags&Stat.PER_CENT) != 0 ? TextIO.formatFloat2(Math.abs(lt)) : Math.abs(lt) )  +
				"</span>";
		}
		return null;
	}
};