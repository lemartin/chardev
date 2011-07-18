var Ajax = {};

Ajax.errorPrefix = "Ajax: Error - ";

Ajax.errorUnableToCreateRequest 	= Ajax.errorPrefix + "Unable to create request object.";
Ajax.errorUnableToSendRequest		= Ajax.errorPrefix + "Unable to send a request because of a prior error.";
Ajax.errorBadHttpCode				= Ajax.errorPrefix + "Received bad HTTP response code: $";
Ajax.errorInvalidURL				= Ajax.errorPrefix + "Invalid URL supplied: $";

/**
 * @param {string} url
 * @returns {boolean}
 */
Ajax.isValidURL = function( url )
{
	return (url?true:false);
};

/**
 * @param {string} url
 * @param {Handler} handler
 * @param {Array} args
 */
Ajax.request = function( url , handler , args ) 
{
	Ajax.__do( url , handler , args , true);
};

/**
 * @param {string} url
 * @param {Handler} handler
 * @param {Array} args
 */
Ajax.get = function( url , handler , args )
{
	Ajax.__do( url , handler , args , false);
};

/**
 * @param {string} url
 * @param {Handler} handler
 * @param {Array} args
 * @param {boolean} callbackOnError
 */
Ajax.__do = function( url , handler , args , callbackOnError)
{
	var request = Ajax.getRequestObject();
	
	if( ! Ajax.isValidURL( url ))
	{
		TextIO.printError(TextIO.sprintf1( Ajax.errorInvalidURL, url ));
	}
	else if (request) 
	{
		if( ! args )
		{
			args = [];
		}
		
		if( -1 == url.search(/\?/) ) {
			url += "?_=" + new Date().getTime();
		}
		else {
			url += "&_=" + new Date().getTime();
		}
		
		request.open('GET', url , true);
		
		if ( handler ) {
			request.onreadystatechange = function() {
				Ajax.defaultCallbackHandler( this, handler, args, callbackOnError );
			};
		}
		else 
		{
			request.onreadystatechange = function(){};
		}
		
		request.setRequestHeader("Content-Type","application/x-www-form-urlencoded; Charset=utf-8");		
		request.send(null);
	}
	else
	{
		TextIO.printError(Ajax.errorUnableToSendRequest);
	}
};

/**
 * @private
 * @param {XMLHttpRequest} response
 * @param {Handler} handler
 * @param {Array} args
 * @param {boolean} callbackOnError
 */
Ajax.defaultCallbackHandler = function( response, handler, args , callbackOnError )
{
	if( response.readyState == 4 )
	{	
		if ( !callbackOnError && response.status == 200) 
		{
			var error = response.getResponseHeader("error");
			if( !error )
			{
				args.splice(0, 0, eval( '(' + response.responseText + ')' ));
				handler.notify(args);
			}
			else
			{
				TextIO.printErrorCode( error );
			}
		}
		else if( callbackOnError )
		{

			args.splice(0, 0, response);
			handler.notify(args);
		}
		else
		{
			TextIO.printError(TextIO.sprintf1( Ajax.errorBadHttpCode, response.status ));
		}
	}
};

/**
 * @return {XMLHttpRequest}
 */
Ajax.getRequestObject = function()
{
	var request = null;
	if (window.XMLHttpRequest) {
	  // If IE7, Mozilla, Safari, and so on: Use native object.
	  request = new XMLHttpRequest();
	}
	else {
	  if (window.ActiveXObject) {
	     // ...otherwise, use the ActiveX control for IE5.x and IE6.
	     request = new ActiveXObject('MSXML2.XMLHTTP.3.0');
	  }
	  else {
	  	TextIO.printError(Ajax.errorUnableToCreateRequest);
	  }
	}
	return request;
};
/**
 * @param {XMLHttpRequest} response
 */
Ajax.getError = function( response ) {
	var error = null;
	
	if( response.status != 200 ) {
		error = TextIO.sprintf1( Ajax.errorBadHttpCode, response.status );
	}
	else if ( response.getResponseHeader("error") ) {
		error = response.getResponseHeader("error");
	}
	
	return error;
};
