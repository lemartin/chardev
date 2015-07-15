/**
 * @constructor
 * @param layers
 * @returns {LayeredDiv}
 */
function LayeredDiv(layers) {
	this._layers = new Array(layers);
	
	for(var i = 0; i < layers; i++ ) {
		this._layers[i] = document.createElement("div");
		if( i == 0 )
		{
			this._layers[i].style.position = "relative";
		}
		else 
		{
			this._layers[i].style.position = "absolute";
			this._layers[i].style.zIndex = i; 
			this._layers[0].appendChild(this._layers[i]);
		}
		
	}
}

LayeredDiv.prototype._layers = null;