/**
 * @constructor
 * @param {TalentFacade} talent
 */
function TalentIcon( talent ) {
	var layeredDiv = new LayeredDiv(6);
	//
	this.talent = talent;
	//
	this.node = layeredDiv.layers[0];
	// arrow
	this.arrows = [document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div")];
	layeredDiv.layers[0].appendChild(this.arrows[0]);
	layeredDiv.layers[0].appendChild(this.arrows[1]);
	layeredDiv.layers[0].appendChild(this.arrows[2]);
	layeredDiv.layers[0].appendChild(this.arrows[3]);
	// icon
	this.icon = document.createElement("img");
	this.icon.className = "talent_icon";
	this.icon.src = "images/transparent.gif";
	layeredDiv.layers[1].className = "talent_image_div";
	layeredDiv.layers[1].appendChild(this.icon);
	// highlight
	this.highlight = layeredDiv.layers[2];
	this.highlight.className = "talent_highlight_div";
    // border
	this.border = layeredDiv.layers[3];
	this.border.className = "talent_border_div";
	// text
	this.text = layeredDiv.layers[4];
	this.text.className = "talent_text_div";
	// event
	this.eventDiv = layeredDiv.layers[5];
	this.eventDiv.style.zIndex = 6;
	this.eventDiv.className = "talent_event_parent";
    this.eventDiv.ondblclick = function(){return false;};
    this.eventDiv.onmousedown = function(){return false;};
    this.eventDiv.onmouseup = function(){return false;};
    this.eventDiv.oncontextmenu = function(){return false;};
}

TalentIcon.prototype.talent = null;
TalentIcon.prototype.icon = null;
TalentIcon.prototype.arrowsHeads = null;
TalentIcon.prototype.eventDiv = null;
TalentIcon.prototype.text = null;
TalentIcon.prototype.border = null;
TalentIcon.prototype.arrows = null;
TalentIcon.prototype.node = null;
TalentIcon.prototype.highlight = null;
TalentIcon.prototype.update = function( closed, isAvailable ) {
    //	if the talent is isFull, set color to gold
	if (this.talent.isFull() || this.talent.getSpent() > 0 && closed) {
        this.icon.src = "images/icons/medium/" + this.talent.icon + ".png";
        this.text.innerHTML = "<span>" + this.talent.getSpent() + "</span>/" + this.talent.max;
        this.text.style.backgroundImage = "url(images/talents/pointsbg.png)";
        this.border.style.backgroundImage = "url(images/talents/gold.gif)";
        this.text.style.color = "#FFCC00";
    }
    //	if there are unused talent points and the talent is available set to green
    else if ( this.talent.areRequiredTalentsSet() && isAvailable || this.talent.getSpent() > 0) {
    	this.icon.src = "images/icons/medium/" + this.talent.icon + ".png";
        this.text.innerHTML = "<span>" + this.talent.getSpent() + "</span>/" + this.talent.max;
        this.text.style.backgroundImage = "url(images/talents/pointsbg.png)";
        this.border.style.backgroundImage = "url(images/talents/green.gif)";
        this.text.style.color = "#00DD00";
    }
    //	else set the color to grey
    else {
    	this.icon.src = "images/icons/g/medium/" + this.talent.icon + ".png";
        this.text.innerHTML = "<span>" + this.talent.getSpent() + "</span>/" + this.talent.max;
        this.text.style.backgroundImage = "url(images/talents/pointsbg_g.png)";
        this.border.style.backgroundImage = "url(images/talents/grey.gif)";
        this.text.style.color = "#999999";
    }
};