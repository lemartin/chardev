/**
 * @constructor
 * @param {Talent} talent
 * @returns {TalentIcon}
 */
function TalentIcon( talent ) {
	var layeredDiv = new LayeredDiv(6);
	//
	this._talent = talent;
	//
	this._node = layeredDiv._layers[0];
	// arrow
	this._arrows = [document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div")];
	layeredDiv._layers[0].appendChild(this._arrows[0]);
	layeredDiv._layers[0].appendChild(this._arrows[1]);
	layeredDiv._layers[0].appendChild(this._arrows[2]);
	layeredDiv._layers[0].appendChild(this._arrows[3]);
	// icon
	this._icon = document.createElement("img");
	this._icon.className = "talent_icon";
	this._icon.src = "images/transparent.gif";
	layeredDiv._layers[1].className = "talent_image_div";
	layeredDiv._layers[1].appendChild(this._icon);
	// highlight
	this._highlight = layeredDiv._layers[2];
	this._highlight.className = "talent_highlight_div";
    // border
	this._border = layeredDiv._layers[3];
	this._border.className = "talent_border_div";
	// text
	this._text = layeredDiv._layers[4];
	this._text.className = "talent_text_div";
	// event
	this._eventDiv = layeredDiv._layers[5];
	this._eventDiv.style.zIndex = 6;
	this._eventDiv.className = "talent_event_parent";
    this._eventDiv.ondblclick = function(){return false;};
    this._eventDiv.onmousedown = function(){return false;};
    this._eventDiv.onmouseup = function(){return false;};
    this._eventDiv.oncontextmenu = function(){return false;};
}

TalentIcon.prototype._talent = null;
TalentIcon.prototype._icon = null;
TalentIcon.prototype._arrowsHeads = null;
TalentIcon.prototype._eventDiv = null;
TalentIcon.prototype._text = null;
TalentIcon.prototype._border = null;
TalentIcon.prototype._arrows = null;
TalentIcon.prototype._node = null;
TalentIcon.prototype._highlight = null;
TalentIcon.prototype.update = function( closed, isAvailable ) {
    //	if the talent is isFull, set color to gold
	if (this._talent.isFull() || this._talent._spent > 0 && closed) {
        this._icon.src = "images/icons/medium/" + this._talent._icon + ".png";
        this._text.innerHTML = "<span>" + this._talent._spent + "</span>/" + this._talent._ranks;
        this._text.style.backgroundImage = "url(images/talents/pointsbg.png)";
        this._border.style.backgroundImage = "url(images/talents/gold.gif)";
        this._text.style.color = "#FFCC00";
    }
    //	if there are unused talent points and the talent is available set to green
    else if ( this._talent.areRequiredTalentsSet() && isAvailable || this._talent._spent > 0) {
    	this._icon.src = "images/icons/medium/" + this._talent._icon + ".png";
        this._text.innerHTML = "<span>" + this._talent._spent + "</span>/" + this._talent._ranks;
        this._text.style.backgroundImage = "url(images/talents/pointsbg.png)";
        this._border.style.backgroundImage = "url(images/talents/green.gif)";
        this._text.style.color = "#00DD00";
    }
    //	else set the color to grey
    else {
    	this._icon.src = "images/icons/g/medium/" + this._talent._icon + ".png";
        this._text.innerHTML = "<span style='margin-top:200px'>" + this._talent._spent + "</span>/" + this._talent._ranks;
        this._text.style.backgroundImage = "url(images/talents/pointsbg_g.png)";
        this._border.style.backgroundImage = "url(images/talents/grey.gif)";
        this._text.style.color = "#999999";
    }
};