var ST_GRP_GENERAL = 0;
var ST_GRP_ATTRIBUTES = 1;
var ST_GRP_MELEE = 2;
var ST_GRP_RANGED = 3;
var ST_GRP_SPELL = 4;
var ST_GRP_DEFENSE = 5;
var ST_GRP_RESISTANCE = 6;

var ST_SPEED = 1<<0;
var ST_DAMAGE_RANGE = 1<<2;
var ST_SHOW_PLUS = 1<<3;
var ST_PER_CENT = 1<<4;
var ST_DPS = 1<<5;
var ST_MH_OH = 1<<6;
var ST_NA_RANGED = 1<<7;
var ST_MASTERY = 1<<8;

var ST_TYPE = [
	[0,0,0],
	[0,0,0,0,0],
	[ST_DAMAGE_RANGE|ST_MH_OH,ST_DPS|ST_MH_OH,0,ST_SPEED|ST_MH_OH,ST_PER_CENT,ST_PER_CENT|ST_SHOW_PLUS,ST_PER_CENT,0|ST_MH_OH,ST_MASTERY],
	[ST_DAMAGE_RANGE|ST_NA_RANGED,ST_DPS|ST_NA_RANGED,0,ST_SPEED|ST_NA_RANGED,ST_PER_CENT,ST_PER_CENT|ST_SHOW_PLUS,ST_PER_CENT,ST_MASTERY],
	[0,ST_PER_CENT,ST_PER_CENT|ST_SHOW_PLUS,0,0,0,ST_PER_CENT,ST_MASTERY],
	[0,ST_PER_CENT,ST_PER_CENT,ST_PER_CENT,0],
	[0,0,0,0,0]
];

/**
 * @constructor
 * @param {Character} character
 * @param {number} group
 * @param {number} index
 * @returns {Stat}
 */
function Stat( character, group, index ) 
{
	this._group = group;
	this._index = index;
	var div = document.createElement("div");
	div.className = 'stat_table_value_div';
	this._node = document.createElement("div");
	this._node.className = 'stat_table_name_div';
	this._node.innerHTML = locale['CS_Stats'][group][index];
	this._node.appendChild(div);
	
	this._compareNode = document.createElement('span');
	this._compareNode.className = 'stat_table_stat_compare_span';
	this._valueNode = document.createElement('span');
	this._valueNode.className = 'stat_table_stat_span';
	this._valueNode.innerHTML = 0;
	div.appendChild(this._compareNode);
	div.appendChild(this._valueNode);
	
	Listener.add(this._node,"mouseover",Tooltip.showStat,Tooltip,[group,index,this._node,character]);
	this._node.onmouseout = function(){Tooltip.hide();};
	
	this._flags = ST_TYPE[this._group][this._index];
}

Stat.prototype._group = -1;
Stat.prototype._index = -1;
Stat.prototype._name = "";
Stat.prototype._tooltip = "";
Stat.prototype._node = null;
Stat.prototype._value = 0;
Stat.prototype._compare = 0;
Stat.prototype._valueNode = null;
Stat.prototype._flage = 0;

Stat.prototype.setValue = function( value ){
	this._value = value;

	this._valueNode.innerHTML = "";
	
	if( value === null && this._flags&ST_NA_RANGED ) {
		this._valueNode.innerHTML += "N/A";
		return;
	}
	
	if( this._flags&ST_MH_OH ) {
		this._addValue(value[0]);
		if( value[1] != null ) {
			this._valueNode.innerHTML += "/";
			this._addValue(value[1]);
		}
	}
	else {
		this._addValue(value);
	}
	
};

Stat.prototype._addValue = function( value ) {
	if( this._flags&ST_PER_CENT )	
	{
		this._valueNode.innerHTML += ( this._flags&ST_SHOW_PLUS ? "+" : "" ) + TextIO.formatFloat(value,2)+"%";
	}
	else if( this._flags&ST_DPS) {
		this._valueNode.innerHTML += TextIO.formatFloat(value,1);
	}
	else if( this._flags&ST_MASTERY) {
		this._valueNode.innerHTML += TextIO.formatFloat(value,2);
	}
	else if( this._flags&ST_SPEED ) {
		this._valueNode.innerHTML += TextIO.formatFloat(value/1000,2);
	}
	else if( this._flags&ST_DAMAGE_RANGE ) {
		this._valueNode.innerHTML += value[0] + "-" + value[1];
	}
	else {
		this._valueNode.innerHTML += Math.floor(value);
	}
};

Stat.prototype.resetCompare = function() {
	this._compareNode.innerHTML = "";
};

Stat.prototype.setCompareValue = function( compare ){
	var cmp1, cmp2;
	this._compareNode.innerHTML = "";
	
	if( compare === null && this._flags&ST_NA_RANGED ) {
		return;
	}

	if( this._flags&ST_MH_OH ) {
		if( this._flags&ST_DAMAGE_RANGE ) {
			return;
		}
		cmp1 = this._addCompare(compare[0], this._value[0]);
		if( compare[1] != null ) {
			cmp2 = this._addCompare(compare[1], this._value[1]);
			if( cmp1 || cmp2 ) {
				this._compareNode.innerHTML = (cmp1?cmp1:"0")+"/"+(cmp2?cmp2:"0");
			}
		}
		else {
			if( cmp1 != null ) {
				this._compareNode.innerHTML = cmp1;
			}
		}
	}
	else {
		cmp1 = this._addCompare(compare, this._value);
		this._compareNode.innerHTML = (cmp1?cmp1:"");
	}
};

Stat.prototype._addCompare = function( compare, value ) {
	var lt;
	
	if( ((ST_MASTERY|ST_PER_CENT)&this._flags) != 0 ) {
		lt = Math.floor( (compare - value) * 100 ) / 100;
	}
	else {
		lt = Math.floor( compare - value );
	}
	
	if ( lt != 0 ) {
		if( this._flags&ST_SPEED ) {
			return "<span class='"+
				( lt > 0 ? CSS_COMPARE_RED_CLASS : CSS_COMPARE_GREEN_CLASS )+"'>"+
				( lt > 0 ?'+':'-') + 
				TextIO.formatFloat2(Math.abs(lt)/1000)+
				"</span>";
		}
		return "<span class='"+
			( lt > 0 ? CSS_COMPARE_GREEN_CLASS : CSS_COMPARE_RED_CLASS )+"'>"+
			( lt > 0 ?'+':'-') + 
			( (this._flags&ST_PER_CENT) != 0 ? TextIO.formatFloat2(Math.abs(lt)) : Math.abs(lt) )  +
			"</span>";
	}
	return null;
};