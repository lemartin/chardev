/**
 * @constructor
 * @param {Character} character
 * @returns {ShapeSelector}
 */
function ShapeSelector( character )
{
	this._character = character;
	this._node = document.createElement("div");
}

ShapeSelector.prototype._character = null;
ShapeSelector.prototype._node = null;
ShapeSelector.prototype._showMoonkin = false;

/**
 * @returns {Element}
 */
ShapeSelector.prototype.getNode = function()
{
	return this._node;
};

ShapeSelector.prototype.onChange = function( shapeForm )
{
	this._character.setShapeForm( shapeForm );
	this.update();
};

ShapeSelector.prototype.update = function()
{
	var shapes;
	var cl = this._character._chrClass;
	var parent,div;
	Tools.removeChilds(this._node);
	if( cl != null && cl._shapes != null )
	{
		parent = document.createElement("div");
		shapes = cl._shapes;
		for (var i = 0; i < shapes.length; i++) 
		{
			if( shapes[i]._id == MOONKIN && this._character._chrClass._talents._talents[0][2][1]._spent == 0 ) {
				this._showMoonkin = false;
				continue;
			}
			div = document.createElement("div");
			div.className = "cs_shape";
			div.style.backgroundImage = "url(images/icons/"+( shapes[i]._id == cl._shapeForm ? "" : "g/" )+"small/"+ shapes[i]._buffs[0]._spell._icon + ".png)";
			parent.appendChild(div);

			Listener.add( div, "mouseover", Tooltip.showShape, Tooltip, [shapes[i]._buffs[0]._spell.getDescription()] );
			div.onmouseout = function(){Tooltip.hide();};
			div.onmousemove = function(){Tooltip.move();};
			Listener.add( div, "click", 	this.onChange, 	this, 		[shapes[i]._id]	);
			this._showMoonkin = true;
		}
		this._node.appendChild(parent);
		Tools.clearBoth(this._node);
	}
};