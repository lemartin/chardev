/**
 * @constructor
 * @param id
 * @param icon
 * @param description
 */
function AvailablePresence( id, icon, description ) {
	this.id = id, this.icon = icon; this.description = description;
}
AvailablePresence.prototype = {
	id: 0, icon: "", description: ""
};