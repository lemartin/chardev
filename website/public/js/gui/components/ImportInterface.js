/**
 * @constructor
 */
function ImportInterface() {
	var div, form;
	
	this.eventMgr = new GenericSubject();
	this.eventMgr.registerEvent("import", ["region","realm","name"]);
	
	this.node = Dom.create("div", {"class": 'im_parent'});
	
	form = Dom.create('form', {'action': 'javascript:'});
	Listener.add(form,"submit",this._onImport,this,[]);
	
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
	
	Dom.createAt( form, 'div', {'class': 'content_header im_header','text':'Import a character from Battle.net'});
	
	this.importRegion.node.className = "single_select single_select_focussable";
	
	this.importSubmit = Dom.create('input', {'type': 'submit', 'value': 'Import'});
	
	Tools.jsCssClassHandler( this.importSubmit, { 'default': "button button_light", 'focus': "button_light_hover", 'hover': "button_light_hover"});
	
	div = Dom.createAt(form, 'div', {'class': 'im_sa_r'});
	Dom.createAt(div, 'div', {'class': 'im_sa_left', 'text': 'Name'});
	Dom.append(Dom.createAt(div, 'div', {'class': 'im_sa_right'}), this.importName);
	Dom.clear(div);
	
	div = Dom.createAt(form, 'div', {'class': 'im_sa_r'});
	Dom.createAt(div, 'div', {'class': 'im_sa_left', 'text': 'Realm'});
	Dom.append(Dom.createAt(div, 'div', {'class': 'im_sa_right'}), this.importServer);
	Dom.clear(div);
	
	div = Dom.createAt(form, 'div', {'class': 'im_sa_r'});
	Dom.createAt(div, 'div', {'class': 'im_sa_left', 'text': 'Region'});
	Dom.append(Dom.createAt(div, 'div', {'class': 'im_sa_right'}), this.importRegion.node);
	Dom.clear(div);
	

	Dom.append(Dom.createAt(form, 'div', {'class': 'im_sa_b'}), this.importSubmit);
	
	Dom.append(Dom.createAt( this.node, "div", {'class': 'im_inputs'}), form);
	
	
	this.storedParent = Dom.createAt(this.node, "div", {'class': 'im_profiles'});	
	
	this.setStoredImports(null);
	
	Dom.clear(this.node);
}

ImportInterface.prototype = {
	eventMgr: null,
	node: null,  
	storedParent: null,
	importName: null, 
	importSubmit: null, 
	importRegion: null,
	_onImport: function() {
		var name = this.importName.value;
		var realm = this.importServer.value;
		
		if( name == "" || name.length < 2 ) {
			Tooltip.showError("The character name is empty or too short!");
			return;
		}
		if( realm == "" ) {
			Tooltip.showError("The realm name is empty or too short!");
			return;
		}

		this.eventMgr.fire("import", {
				"name": name,
				"realm": realm ,
				"region": this.importRegion.getValue()
		});
	},
	setRegion: function( region ) {
		this.importRegion.select( region );
	},
	setStoredImports: function( profiles ){
		Dom.truncate(this.storedParent);
		Dom.append( 
			this.storedParent, 
			ChardevHtml.createWithInfo( 
				'div', {'class': 'im_profiles_header','text':'Stored Imports'}, 
				'See your account settings to manage Stored Imports.'
			)
		);
			
		
		if( profiles != null ) {

			for( var k in profiles ) {
				var profile = profiles[k];
				
				var a = Dom.createAt(this.storedParent, 'a', {'class': 'im_profile', 'href': 'javascript:'});
				Listener.add(a, 'click', this.eventMgr.fire, this.eventMgr, ["import", {
					"name": profile['Name'], 
					"realm": profile['Realm'], 
					"region": profile['Region']
				}]);

				Dom.createAt(a,'span', {'class': 'bnpm_name', 'text': profile['Name']});
				
				Dom.createAt(a,'span', {'text': ", " + profile['Level'] + " " + locale['CharacterRace'][profile['CharacterRaceID']] + " "});
				
				Dom.createAt(a,'span', {
					'class': 'character_class_'+profile['CharacterClassID']+' bnpm_chrclass',
					'text': locale['CharacterClass'][profile['CharacterClassID']]
				});
				
				Dom.createAt(a, 'span', {
					'class': 'bnpm_origin', 
					'text': ", " + profile['Region'].toUpperCase()+"-"+profile['Realm']
				});
			}
		}
	},
	/**
	 * @param {GenericObserver} observer
	 */
	addObserver: function( observer) {
		this.eventMgr.addObserver(observer);
	}
};