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
	var href = "";
	var exception = null;
	try {
		href = Ajax.getResponseObject(request);
	}
	catch( e ) {
		exception = e;
	}
	handler.notify([href, exception]);
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
		'api/battlenet_profile.php' 
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
 * @param {Character} character
 * @param {Handler} handler
 */
CharacterIO.writeToDatabase = function( id , character, handler )
{
	Ajax.post(
		'api/profile.php', {
				'action': id ? 'update' : 'add',
				'id': id,
				'serialized': JSON.stringify(character.toArray())
		},
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
		'api/profile.php' + TextIO.queryString({ 'id': id }),
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
	Ajax.post(
		'api/chardev_profile.php', {
			'action': 'delete',
			'id': id 
		},
		handler,
		[id]
	);
};
