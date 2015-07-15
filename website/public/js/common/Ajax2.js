var Ajax2 = {
	post: function( url, map, callback, scope ) {
		$.post( url,map,function( data, status, jqXhr) {
			
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