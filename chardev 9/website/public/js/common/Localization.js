var Localization = {

	EN_GB: 1, FR_FR: 3, DE_DE: 4, ES_ES: 6, RU_RU: 8,

	__locales: null,
	
	language: Localization.EN_GB,
	
	setLanguage: function( language ) {
		Localization.language = language;
	},

	localize: function( str ) {
	
		if ( this.language != Localization.EN_GB && Localization.__locales[str][this.language]  ) {
			return 
		}
		
		return str;
	
	}
};
//
// TEMPLATE
//
/*

	"" : {
		Localization.FR_FR: null,
		Localization.DE_DE: null,
		Localization.ES_ES: null,
		Localization.RU_RU: null,
	}

 */
Localization.__locales = {};
Localization.__locales["Filter"] = [ null, null, null, null, "Filter", null, null, null, null ];

