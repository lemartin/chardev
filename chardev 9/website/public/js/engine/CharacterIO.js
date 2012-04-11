var ARMORY_IMPORT_UNABLE_TO_READ_FILE=0;
var ARMORY_IMPORT_UNABLE_TO_READ_XML=1;
var ARMORY_IMPORT_NO_REGION=2;
var ARMORY_IMPORT_NO_SERVER=3;
var ARMORY_IMPORT_NO_NAME=4;

var CharacterIO = new Object();

/**
 * @param {XMLHttpRequest} request
 * @param {Handler} handler
 */
CharacterIO._readCharacter_callback = function( request, handler )
{
	var character = null;
	var exception = null;
	try {
		character = Ajax.getResponseObject(request);
	}
	catch( e ) {
		exception = e;
	}
	handler.notify([character, exception]);
};

/**
 * @param {XMLHttpRequest} request
 * @param {Handler} handler
 * @param {Character} character
 */
CharacterIO._writeCharacter_callback = function( request, handler, character )
{
	var id = 0;
	var exception = null;
	try {
		id = Ajax.getResponseObject(request);
	}
	catch( e ) {
		exception = e;
	}
	handler.notify([id, exception]);
};
/**
 * @param {string} name
 * @param {string} server
 * @param {string} region
 * @param {Handler} handler
 */
CharacterIO.readFromArmory = function(name,server,region,handler)
{
	Ajax.request(
		'php/interface/profiles/get_battlenet_profile.php' 
			+ TextIO.queryString({
				'name': name,
				'server': server,
				'region': region
		}),
		new Handler( CharacterIO._readCharacter_callback, CharacterIO ),
		[handler]
	);
};

/**
 * @param {number} id
 * @param {string} user
 * @param {string} password
 * @param {Character} character
 * @param {Handler} handler
 */
CharacterIO.writeToDatabaseAuth = function( id , user , password , character, handler )
{
	Ajax.request(
		'php/interface/profiles/set_profile.php' 
			+ TextIO.queryString({
				'id': id,
				'name': user,
				'password': MD5( password ),
				'serialized': JSON.stringify(character.toArray())
		}),
		new Handler( CharacterIO._writeCharacter_callback, CharacterIO ),
		[handler, character]
	);
};

/**
 * @param {number} id
 * @param {Character} character
 * @param {Handler} handler
 */
CharacterIO.writeToDatabaseSession = function( id , character, handler )
{
	Ajax.request(
		'php/interface/profiles/set_profile.php' 
			+ TextIO.queryString({
				'id': id,
				'session_id': g_settings.sessionId,
				'serialized': JSON.stringify(character.toArray())
		}),
		new Handler( CharacterIO._writeCharacter_callback, CharacterIO ),
		[handler, character]
	);
};

/**
 * @param {number} id
 * @param {Handler} handler
 */
CharacterIO.readFromDatabase = function(id,handler)
{
	// TODO: get profile returns { 'character': char, 'user_id': user }, 
	// callback expect only char
	Ajax.request(
		'php/interface/profiles/get_profile.php' + TextIO.queryString({ 'id': id }),
		new Handler( CharacterIO._readCharacter_callback, CharacterIO ),
		[handler]
	);
};

/**
 * @param {number} id
 * @param {Handler} handler
 */
CharacterIO.deleteFromDatabase = function(id,handler)
{
	Ajax.request(
		'php/interface/profiles/delete_profile.php' + TextIO.queryString({ 'id': id }),
		handler,
		[id]
	);
};
