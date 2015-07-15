var Ajax2 = {
	post: function( url, map, callback, scope ) {
		$.post(url,map,function( data, status, jqXhr) {
			
			var obj = new ResponseObject(data, jqXhr);
			
			if(scope) {
				callback.call(scope, obj);
			}
			else {
				callback(obj);
			}
			
		}, 'json');
	}
};

/**
 * @constructor
 * @param data
 * @param jqXhr
 */
function ResponseObject( data, jqXhr ) {
	if( jqXhr.getResponseHeader("error")) {
		this._error = true;
	}
	else if( jqXhr.getResponseHeader("auto_redirect")) {
		window.location.href = data;
	}
	this._data = data;
}

ResponseObject.prototype = {
	_data: null, 
	_error: false,
	
	get: function() {
		if( this._error ) {
			throw new Error(this._data);
		}
		else {
			return this._data;
		}
	}
};