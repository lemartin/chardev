/**
 * @constructor
 * @param {number} id
 * @param {string} icon
 * @param {string} description
 */
function AvailableShapeform( id, icon, description ) {
	this.id = id; this.icon = icon; this.description = description;
} 
AvailableShapeform.prototype = {
	id: 0, icon: "", description: ""
};