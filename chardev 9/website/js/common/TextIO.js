var TextIO = {
	getDPSFormatted : function( itm ) {
		return Math.floor(itm.dps*10)/10 + ( Math.floor(itm.dps*10)%10 == 0 ? ".0" : "" );
	},
	getSpeedFormatted : function( itm) {
		return ((itm.delay%1000)==0?(itm.delay/1000)+".00":((itm.delay%100)==0?(itm.delay/1000)+"0":Math.floor(itm.delay/10)/100+""));
	},
	errorNode: null,
	
	/**
	 *  @param {string} str
	 *  @param {Array} va_args
	 *  @returns {string}
	 */
	sprintf: function( str, va_args ) {
		if( ! str ) {
			TextIO.printError( "TextIO.sprintf: Called with empty or no String" );
			return va_args.join(" ");
		}
		
		var i;
		for ( i = 0; i < va_args.length; i++) 
		{
			if (str.search(/\$/) == -1) {
				TextIO.printError( "TextIO.sprintf: Format parameter count did not match (Expected: "+va_args.length+", found: "+i+")" );
				for( ; i < va_args.length; i++ ) {
					str += " " + va_args[i];
				}
				return str;
			}
			
			str = str.replace(/\$/, va_args[i]);
		}
		
		return str;
	},
	
	/**
	 * @param {string} str
	 * @param {string|number|boolean} arg
	 * @returns {string}
	 */
	sprintf1: function( str, arg ) {
		if( ! str ) {
			TextIO.printError( "TextIO.sprintf: Called with empty or no String" );
			return String(arg);
		}
		if( str.search(/\$/) == - 1 && arg ) {
			TextIO.printError( "TextIO.sprintf: Format parameter count did not match (Expected: 1, found: 0)" );
			return str;
		}
		return str.replace(/\$/, String(arg) );
	},
	
	/**
	 * @param {Object} kvps
	 * @returns {string}
	 */
	queryString: function( kvps )
	{	
		return "?" + TextIO.urlEncode(kvps);
	},
	
	urlEncode: function ( kvps ) {
		var str = "", i = 0, v;
		for ( var k in kvps ) {
			if( i > 0 ) {
				str += "&";
			}
			//	add the key
			str += k;
			//	check and add value
			v = kvps[k];
			if( v !== "" ) {
				str += "=" + encodeURIComponent( String(v) );
			}
			i++;
		}
		return str;
	},
	
	writeColoredText: function( node, stat, compareStat )
	{
		node.innerHTML = "";
		if( stat != compareStat )
		{
			node.innerHTML += "<span class='" + (compareStat>stat?CSS_COMPARE_GREEN_CLASS:CSS_COMPARE_RED_CLASS) + "'>" + Math.abs( compareStat - stat ) + "</span>";
		}
		node.innerHTML += "<span>" + stat + "</span>";
	},
	
	appendText: function(node,text) {
		node.innerHTML += text;
		//node.appendChild(document.createTextNode(text));
	},
	
	printError: function(error)  {
		if( TextIO.errorNode ) {
			TextIO.appendText(TextIO.errorNode,error);
		}
	},
	
	resolveErrorCode: function( errorCode ) {
		return "Error code: " + errorCode ;
	},
	
	printErrorCode: function( errorCode )
	{
		TextIO.printError(TextIO.resolveErrorCode( errorCode ));
	},
	
	/**
	 * @param {string} string
	 * @returns {string}
	 */
	nl2br: function(string) 
	{
		string = string.replace(/\\r\\n/gi,"<br />");
		string = string.replace(/\\n|\r/gi,"<br />");
		return string;
	},
	
	/**
	 * @param {string} desc
	 * @param {Character} character
	 * @returns {Array} Strings
	 */
	parse: function(desc,character)
	{
		if (!desc) {
			return [""];
		}
		var equation, match, oldDesc;
	
		oldDesc = desc;
		
		while( ( match = desc.match(/\$(\?.*)$/i)) ) {
			desc = desc.replace(match[0],TextIO.condition_replace(match[1], character ? character.auras : null ));
			
			if( desc == oldDesc ) {
				break;
			}
			oldDesc = desc;
		}
	
		desc = desc.replace(/\$G(\w+):(\w+);/i, "$1 / $2");
		
		if (character) 
		{
			var stats = character.stats;
	
			desc = desc.replace(/\$pl\b/gi, 	String(character.level));
			desc = desc.replace(/\$max\b/gi, 	"Math.max");
			desc = desc.replace(
				/\$hnd\b/gi, 	
				character.getEquippedItem(16, 0) ? (character.getEquippedItem(16, 0).inventorySlot == 17 && null == character.getEquippedItem(17, 0) ? "2" : "1") : "1"
			);
			
			desc = desc.replace(/\$ap\b/gi, 	String(Math.floor(stats.attackPower)));
			desc = desc.replace(/\$rap\b/gi, 	String(Math.floor(stats.rangedAttackPower)));
			desc = desc.replace(/\$ar\b/gi, 	String(Math.floor(stats.defense[0])));
			/*
			desc = desc.replace(/\$sph/gi, 	Math.floor(stats.getDamage(1)));
			desc = desc.replace(/\$spn/gi, 	Math.floor(stats.getDamage(2)));
			desc = desc.replace(/\$spfr/gi, Math.floor(stats.getDamage(3)));
			desc = desc.replace(/\$spfi/gi, Math.floor(stats.getDamage(4)));
			desc = desc.replace(/\$sps/gi, 	Math.floor(stats.getDamage(5)));
			desc = desc.replace(/\$spa/gi, 	Math.floor(stats.getDamage(6)));
			*/
			desc = desc.replace(/\$sp\b/gi, 	String(Math.floor(stats.spell[0])));
			
			desc = desc.replace(/\$MWS\b/gi,  TextIO.formatFloat(stats.mhSpeed, 2));
			
	//		desc = desc.replace(/\$mwb/g, 	Math.ceil(stats.mainhandMaxDmg));
	//		desc = desc.replace(/\$MWB/g, 	Math.floor(stats.mainhandMaxDmg));
	//		desc = desc.replace(/\$rwb/g, 	Math.ceil(stats.rangedMinDmg));
	//		desc = desc.replace(/\$RWB/g, 	Math.floor(stats.rangedMaxDmg));
			desc = desc.replace(/\$mw/g, 	stats.melee[0][0]);
			desc = desc.replace(/\$MW/g, 	stats.melee[0][1]);
			
			desc = desc.replace(/\$z\b/gi, "[Location]");
		}
		else 
		{	
			desc = desc.replace(/\$pl\b/gi, "[Player Level]");
			desc = desc.replace(/\$max\b/gi, "[Maximum]");
			desc = desc.replace(/\$hnd\b/gi, "[Hands]");
			
			desc = desc.replace(/\$ap\b/gi, "[AP]");
			desc = desc.replace(/\$rap\b/gi, "[rAP]");
			desc = desc.replace(/\$ar\b/gi, "[Armor]");
			
			desc = desc.replace(/\$sph\b/gi, "[SpDmg Holy]");
			desc = desc.replace(/\$spn\b/gi, "[SpDmg Nature]");
			desc = desc.replace(/\$spfr\b/gi, "[SpDmg Frost]");
			desc = desc.replace(/\$spfi\b/gi, "[SpDmg Fire]");
			desc = desc.replace(/\$sps\b/gi, "[SpDmg Shadow]");
			desc = desc.replace(/\$spa\b/gi, "[SpDmg Arcane]");
			desc = desc.replace(/\$sp\b/gi, "[SpDmg]");
			
			desc = desc.replace(/\$MWS\b/gi, "[Wpn Speed]");
			desc = desc.replace(/\$mwb\b/g, "[Wpn minDmg]");
			desc = desc.replace(/\$MWB\b/g, "[Wpn maxDmg]");
			desc = desc.replace(/\$rwb\b/g, "[rWpn minDmg]");
			desc = desc.replace(/\$RWB\b/g, "[rWpn maxDmg]");
			desc = desc.replace(/\$mw\b/g, "[Wpn minDmg]");
			desc = desc.replace(/\$MW\b/g, "[Wpn maxDmg]");
			
			desc = desc.replace(/\$z/gi, "[Location]");
		}
		while ( (equation = desc.match(/\$?\{([^{]*)\}(?:\.([\d]*))?/)) ) 
		{
			try 
			{
				desc = desc.replace(equation[0], function(){
					return Math.abs(Tools.floor(
						parseFloat(eval( '(' + equation[1] + ')')), 
						equation[2] ? parseInt(equation[2],10) : 0)
					);
				});
			} 
			catch (e) 
			{
				desc = desc.replace(equation[0], "<span class='yellow'>" + equation[1] + "</span>");
			}
		}
		return desc.split('|');
	},
	
	/**
	 * @param {string} str
	 * @param {Auras} auras
	 * @returns {Array}
	 */
	condition_parse: function( str, auras ) {
		var on_true = "", on_false = "", c = "", ret;
		var match = str.match(/^\?(!?)(a|s)(\d+)(.+)?$/i);
		
		if( !match ) {
			return ["",str];
		}
		ret = TextIO.condition_get_kontinuation( match[4], auras );
		on_true = ret[0];
		
		ret = TextIO.condition_get_kontinuation( ret[1], auras );
		on_false = ret[0];
		
		if( match[1] == "!" ) {
			var tmp = on_true;
			on_true = on_false;
			on_false = tmp;
		}
	
		c = auras != null && auras.isActive(parseInt(match[3],10)) ? on_true : on_false;
		
		return [ c, ret[1] ];
	},
	
	/**
	 * @param {string} str
	 * @param {Auras} auras
	 * @returns {Array}
	 */
	condition_get_kontinuation: function ( str, auras ) {
		var match = str.match(/^(?:(\[([^\]]*)\])|(\?))(.*)$/i);
		if( match[1] ) {
			return [match[2],match[4]];
		}
	
		return TextIO.condition_parse( str, auras );
	},
	
	/**
	 * @param {string} str
	 * @param {Auras} auras
	 * @returns {string}
	 */
	condition_replace: function ( str, auras ) {
		var r = TextIO.condition_parse( str, auras );
		return r[0]+r[1];
	},
	
	/**
	 * @param {number|string} minRange
	 * @param {number|string} maxRange
	 * @returns {string}
	 */
	rangeToString: function ( minRange, maxRange ) {
		if( minRange > 0 ) {
			return TextIO.sprintf( locale['ydRange2'], [ minRange, maxRange ] );
		}
	
		return TextIO.sprintf1( locale['ydRange'], maxRange );
	},
	
	formatFloat: function( f, precision ) {
		var r= ""; 
		
		f = Math.round( f * Math.pow( 10, precision));
		
		for( ; precision>0; precision-- ) {
			if( f%10 == 0 ) {
				r = "0"+r;
				f /= 10;
			}
			else {
				break;
			}
		}
		if( precision == 0 ) {
			return Math.floor( f )+"."+r;
		}
	
		return Math.floor( f )/ Math.pow(10, precision) + r;
	},
	
	formatFloat2: function( f ) {
		var r;
		f = Math.round( f * 100 );
	
		r = f%10 + "";
		f /= 10;
		
		r = Math.floor(f%10) + r;
		r = Math.floor( f/10 )+"."+r;
		
		return r;
	},
	
	formatFloat1: function( f ) {
		f = Math.round( f * 10 );
		return Math.floor( f/10 ) + "." + ( f % 10 );
	},
	
	timeToString: function ( timeInSeconds ) {
		timeInSeconds = Math.round(timeInSeconds*10)/10;
		if ((timeInSeconds % 3600) == 0) 
		{
			return timeInSeconds / 3600 + " " + locale['h'];
		}
		else if ((timeInSeconds % 60) == 0) 
		{
			return timeInSeconds / 60 + " " + locale['m'];
		}
		else 
		{
			return timeInSeconds + " " + locale['s'];
		}
	},
	
	htmlPrice: function ( price ) {
		var html = "<span class='tooltip_sell_price'>";
		if( price > 10000 ) {
			html += Math.floor( price / 10000 ) + "<img alt='g' class='tooltip_coint' align='center' src='images/tooltip/UI-GoldIcon.png' />";
			price %= 10000;
		}
		if( price > 100 ) {
			html += Math.floor( price / 100 ) + "<img alt='s' class='tooltip_coint' align='center' src='images/tooltip/UI-SilverIcon.png' />";
			price %= 100;
		}
		if( price ) {
			html += price + "<img alt='c' class='tooltip_coint' align='center' src='images/tooltip/UI-CopperIcon.png' />";
		}
		
		return html + "</span>";
	},
	
	outline: function( str ) {
		var d = [];
		var t = [0,-1,-1,1,1,0,0,-1,1,0];
		var l = [0,-1,1,1,-1,1,-1,0,0,0];
		
		d[0] = document.createElement("div");
		d[0].style.position = "relative";
		d[0].innerHTML = "&nbsp;";
		
		for( var i=1; i<10; i++ ) {
			d[i] = document.createElement("div");
			d[i].style.position = "absolute";
			d[i].style.top = t[i] + "px";
			d[i].style.left = l[i] + "px";
			if( i == 9 ) {
				d[i].style.color = "white";
			}
			else {
				d[i].style.color = "#808080";
			}
			d[i].innerHTML = str;
			d[0].appendChild(d[i]);
		}
		
		
		
		return d[0];
	}
};