/**
 * @constructor
 * @param {Array} serialized
 */
var User = function( serialized ) {
	this.id = serialized[0];
	this.name = serialized[1];
	this.region = serialized[2];
	this.battleNetProfiles = serialized[3];
};

User.prototype = {
		id: 0,
		name: "",
		region: "",
		battleNetProfiles: null
};