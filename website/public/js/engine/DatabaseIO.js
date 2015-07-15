var DatabaseIO = {};

/**
 * @param {number} classId
 * @param {Handler} handler
 */
DatabaseIO.getCharacterClass = function(classId, handler) 
{
	Ajax.request(
		'/api/character_class.php' + TextIO.queryString({ 'id': classId }), 
		new Handler( DatabaseIO.getCharacterClass_callback, DatabaseIO) , 
		[handler]
	);
};

/**
 * @param {XMLHttpRequest} request
 * @param {Handler} handler
 */
DatabaseIO.getCharacterClass_callback = function(request, handler )
{
	var error = null;
	if (request.status == 200) 
	{
		error = parseInt(request.getResponseHeader("error"), 10);
		if ( error )
		{
			throw new GenericAjaxException("DatabaseIO.getCharacterClass");
		}
	}
	else {
		throw new BadResponseException(request);
	}
	if( handler ) {
		handler.notify([eval('(' + request.responseText + ')')]);
	}
};

/**
 * @param {number} raceId
 * @param {Handler} handler
 */
DatabaseIO.getCharacterRace = function( raceId, handler )
{
	Ajax.request( 
		'/api/character_race.php' + TextIO.queryString({'id': raceId}) , 
		new Handler( DatabaseIO.getCharacterRace_callback , DatabaseIO ), 
		[handler] 
	);
};

/**
 * @param {XMLHttpRequest} request
 * @param {Handler} handler
 */
DatabaseIO.getCharacterRace_callback = function(request, handler )
{
	var error = null;
	if (request.status == 200) 
	{
		error = parseInt(request.getResponseHeader("error"), 10);
		if ( error )
		{
			throw new GenericAjaxException("DatabaseIO.getCharacterRace");
		}
	}
	else {
		throw new BadResponseException(request);
	}
	if( handler ) {
		handler.notify([eval('(' + request.responseText + ')')]);
	}
};