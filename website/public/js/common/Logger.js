var Logger = {};

((function () {
	if( ! window.console ) {
		throw Error("Unable to initialise logger, unsupported browser!");
	}
	
	Logger.error = function( str ) {
		window.console.error( str );
	};
	Logger.log = function( str ) {
		window.console.log( str );
	};
	Logger.info = function( str ) {
		window.console.info( str );
	};
	Logger.warn = function( str ) {
		window.console.warn( str );
	};
})());