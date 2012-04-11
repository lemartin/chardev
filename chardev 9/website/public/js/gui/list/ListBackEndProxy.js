/**
 * @constructor
 * @param {string} baseURL
 */
function ListBackEndProxy( baseURL ) {
	this.baseURL = baseURL;
	
	this.callbackHandler = new Handler( this.callback, this);
}

ListBackEndProxy.prototype.requestURL = null;
ListBackEndProxy.prototype.baseURL = null;
ListBackEndProxy.prototype.callbackHandler = null;

/**
 * @param {List} list
 */
ListBackEndProxy.prototype.update = function( list ) {
	this.requestURL = this.baseURL+"?"+TextIO.urlEncode(ListBackEndProxy.getQueryObject(list));
	Ajax.get( this.requestURL, this.callbackHandler, [list, this.requestURL]);
};

ListBackEndProxy.getQueryObject = function( list ) {
	return {
		'a': list.getArgumentString(),
		'o': list.order+"."+(list.orderDirection==List.ORDER_ASC?'asc':'desc')+";",
		'p': list.page
	}; 
};

ListBackEndProxy.prototype.callback = function( data, list, url ) {
	if( url != this.requestURL ) {
		return;
	}
	
	list.setData( data );
};
