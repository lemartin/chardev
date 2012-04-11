/**
 * @constructor
 * @param {Handler} onImportHandler
 */
function ImportInterface( onImportHandler ) {
	var div, form, a;
	this.onImportHandler = onImportHandler;
	
	this.node = DOM.create("div", {"class": 'im_parent'});
	
	form = DOM.create('form', {'action': 'javascript:'});
	Listener.add(form,"submit",this.__onImport,this,[]);
	
	this.importName = document.createElement("input"); this.importName.className = "input im_sa_in";
	this.importServer = document.createElement("input"); this.importServer.className = "input im_sa_in";
	this.importRegion = new SingleSelect(
		[
		 ['us',locale['US']+"/"+locale['Oceanic']],
		 ['eu',locale['Europe']],
		 ['kr',locale['Korea']],
		 ['tw',locale['Taiwan']],
		 ['cn',locale['China']]
		]
	);
	
	if( g_settings.userData && g_settings.userData["region"] ) {
		this.importRegion.select(g_settings.userData["region"]);
	}
	
	DOM.createAt( form, 'div', {'class': 'content_header im_header','text':'Import a character from Battle.net'});
	
	this.importRegion.node.className = "single_select single_select_focussable";
	
	this.importSubmit = DOM.create('input', {'type': 'submit', 'value': 'Import'});
	
	Tools.jsCssClassHandler( this.importSubmit, { 'default': "button button_light", 'focus': "button_light_hover", 'hover': "button_light_hover"});
	
	div = DOM.createAt(form, 'div', {'class': 'im_sa_r'});
	DOM.createAt(div, 'div', {'class': 'im_sa_left', 'text': 'Name'});
	DOM.append(DOM.createAt(div, 'div', {'class': 'im_sa_right'}), this.importName);
	DOM.clear(div);
	
	div = DOM.createAt(form, 'div', {'class': 'im_sa_r'});
	DOM.createAt(div, 'div', {'class': 'im_sa_left', 'text': 'Realm'});
	DOM.append(DOM.createAt(div, 'div', {'class': 'im_sa_right'}), this.importServer);
	DOM.clear(div);
	
	div = DOM.createAt(form, 'div', {'class': 'im_sa_r'});
	DOM.createAt(div, 'div', {'class': 'im_sa_left', 'text': 'Region'});
	DOM.append(DOM.createAt(div, 'div', {'class': 'im_sa_right'}), this.importRegion.node);
	DOM.clear(div);
	

	DOM.append(DOM.createAt(form, 'div', {'class': 'im_sa_b'}), this.importSubmit);
	
	DOM.append(DOM.createAt( this.node, "div", {'class': 'im_inputs'}), form);
	
	
	this.storedParent = DOM.createAt(this.node, "div", {'class': 'im_profiles'});	
	
	DOM.clear(this.node);
	
	this.updateStoredImports();
}

ImportInterface.prototype = {
	node: null, onImportHandler: null, storedParent: null,
	importName: null, importSubmit: null, importRegion: null,
	__onImport: function() {
		var name = this.importName.value;
		var server = this.importServer.value;
		
		if( name == "" || name.length < 2 ) {
			Tooltip.showError("The character name is empty or too short!");
			return;
		}
		if( server == "" ) {
			Tooltip.showError("The server name is empty or too short!");
			return;
		}
		this.onImportHandler.notify([name, server, this.importRegion.getValue()]);
	},
	updateStoredImports: function(){
		DOM.truncate(this.storedParent);
		DOM.append( 
			this.storedParent, 
			ChardevHTML.createWithInfo( 
				'div', {'class': 'im_profiles_header','text':'Stored Imports'}, 
				'See your account settings to manage Stored Imports.'
			)
		);
			
		
		if( g_settings.userData && g_settings.userData['battlenet_profiles'] ) {

			for( var k in g_settings.userData['battlenet_profiles'] ) {
				var profile = g_settings.userData['battlenet_profiles'][k];
				
				var a = DOM.createAt(this.storedParent, 'a', {'class': 'im_profile', 'href': 'javascript:'});
				Listener.add(a, 'click', this.onImportHandler.notify, this.onImportHandler, [[profile['Name'],profile['Realm'],profile['Region']]]);

				DOM.createAt(a,'span', {'class': 'bnpm_name', 'text': profile['Name']});
				
				DOM.createAt(a,'span', {'text': ", " + profile['Level'] + " " + locale['CharacterRace'][profile['CharacterRaceID']] + " "});
				
				var span = DOM.createAt(a,'span', {
					'class': 'character_class_'+profile['CharacterClassID']+' bnpm_chrclass',
					'text': locale['CharacterClass'][profile['CharacterClassID']]
				});
				
				if( profile['CharacterClassID'] == PRIEST ) {
					DOM.addClass(span, 'character_class_5_white_bg_fix');
				}
				else if( profile['CharacterClassID'] == ROGUE ) {
					DOM.addClass(span, 'character_class_4_white_bg_fix');
				}
				
				DOM.createAt(a, 'span', {
					'class': 'bnpm_origin', 
					'text': ", " + profile['Region'].toUpperCase()+"-"+profile['Realm']
				});
			}
		}
	}
};