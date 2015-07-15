/**
 * @constructor
 * @param character
 * @param gem
 * @param socket
 */
function SocketedGem( character, gem, socket ) {
	this.__gem = gem;
	this.__socket = socket;
	this.__character = character;

	this.icon = gem.icon;
	this.id = gem.id;
	this.name = gem.name;
	this.quality = gem.quality;
}

SocketedGem.prototype = {
	__gem: null,
	__socket: 0,
	__character: null,

	icon: "",
	id: 0,
	quailty: 0,
	name: "",
	
	getTooltip: function() {
		return ItemTooltip.getHTML(this.__gem, this.__character);
	}
};