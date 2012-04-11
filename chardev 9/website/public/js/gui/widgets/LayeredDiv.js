/**
 * @constructor
 * @param {number} layers
 */
function LayeredDiv(layers) {
	if( layers > 0 ) {
		this.layers = [];
		
		this.layers[0] = document.createElement("div");
		this.layers[0].style.position = "relative";
		
		for(var i = 1; i < layers; i++ ) {
			this.layers[i] = document.createElement("div");
			this.layers[i].style.position = "absolute";
			this.layers[i].style.zIndex = i; 
			this.layers[0].appendChild(this.layers[i]);
		}
	}
}

LayeredDiv.prototype = {
	/** @type {Array} **/	
	layers: null
};