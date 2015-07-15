var DescriptionInterpreter = {};

(function() {
	var verbose = false;
	
	/**
	 * @param {string} jsonAst
	 * @param {Character} character
	 * @return {string|boolean|number}
	 */
	DescriptionInterpreter.interpret = function ( jsonAst, character ) {
		return evaluate( jsonAst, character, null);
	};
	/**
	 * @param {boolean} b
	 */
	DescriptionInterpreter.setVerbose = function ( b ) {
		verbose = b;
	};
	/**
	 * @param node
	 * @param {Character} character
	 * @param last
	 * @return {string|number|boolean}
	 */
	function evaluate( node, character, last ) {
		switch(node["type"]) { 
		case 'stat':
			var stat = node["name"].toLowerCase();
			switch(stat) {
			case 'pl': 
				if( character ) {
					return character.level;
				} 
				else {
					return "lvl";
				}
			default: return '$' + stat; 
			}
		case 'desc':
			var parts = node["text"].split('$');
			var str = parts[0];
			
			for( var i = 0; i < node["exps"].length; i++ ) {
				last = evaluate(node["exps"][i], character, last);
				str += last + parts[1 + i];
			}
			
			return str;
		case 'dec':
			return Math.abs(node["value"]);
		case 'precision':
			var e = evaluate(node["exp"], character, last);
			if( typeof e === 'number') {
				return TextIO.formatFloat( e, node["precision"] );
			}
			else {
				return e;
			}
		case 'plain':
			return node["text"];
		case 'var':
			return node["text"];
		case 'time':
			return TextIO.timeToString(node["value"]);
		case 'ifthenelse':
			var cond = evaluate(node["cond"], character, last);
			if( typeof cond === 'boolean' ) {
				return cond === true ? evaluate(node["ontrue"], character, last) : evaluate(node["onfalse"], character, last);
			}
			else {
				var ontrue = evaluate(node["ontrue"], character, last);
				var onfalse = evaluate(node["onfalse"], character, last);
				return "?" + cond + "[" + ontrue + "][" + onfalse + "]";
			}
		case 'condref':
			if( ! character || ! character.auras ) {
				if( verbose ) {
					return node["ref"];
				}
				else {
					return false;
				}
			}
			else {
				var matches = node["ref"].match(/^\w(\d+)$/);
				return character.auras.isActive(matches[1]);
			}
		case 'complexcond':
			var l = evaluate(node["left"], character, last);
			var r = evaluate(node["right"], character, last);
			
			switch(node["comparator"]) {
			case '==': return l == r;
			case '>': return l > r;
			case '<': return l < r;
			case '>=': return l >= r;
			case '<=': return l <= r;
			case '!=': return l != r;
			default: throw Error("Unhandled comparator: "+node["comparator"]);
			}
		case 'uncondop':
			var cond = evaluate(node["cond"], character, last); 
			if( typeof cond === 'boolean') {
				return ! cond;
			}
			else {
				return "!" + cond;
			}
		case 'bincondop':
			var l = evaluate(node["left"], character, last);
			if( typeof l === 'boolean' ) {
				if( node["op"] === '|' ) {
					return l || evaluate(node["right"], character, last);
				}
				else {
					return l && evaluate(node["right"], character, last);
				}
			}
			else {
				var r = evaluate(node["right"], character, last);
				if( node["op"] === '&' ) {
					return l + node["op"] + r;
				}
				else {
					return "(" + l + node["op"] + r + ")";
				}
			}
		case 'scalingtime':
			var castTime = g_calculateCastTime( node["start"], node["end"], node["intervals"], character ? character.level : Character.MAX_LEVEL );
			return TextIO.timeToString(castTime[0]);
		case 'scalingvalue':
			var castTime = g_calculateCastTime( node["start"], node["end"], node["intervals"], character ? character.level : Character.MAX_LEVEL );
			var value = g_calculateScaling( castTime ? castTime[1] : 1, node["distribution"], node["coefficient"], node["dice"], character ? character.level : Character.MAX_LEVEL );
			
			switch( node["name"] ) {
			case 'M':
			case 'S':
				return Math.floor(Math.abs(value[0]) + Math.abs(value[1]));
			default:
				return Math.floor(Math.abs(value[0]));
			}
		case 'simplecond':
			switch(node["variable"]) {
			case 'l':
			case 'L':
				if( typeof last === 'number' ) {
					if( last <= 1 ) {
						return node["ontrue"];
					}
					else {
						return node["onfalse"];
					}
				}
				return node["ontrue"] + "/" + node["onfalse"];
			default:
				return node["ontrue"] + "/" + node["onfalse"];
			}
		case 'fun':
			var variable = node["variable"].toLowerCase(); 
			switch(variable) {
			case 'gt':
				var l = evaluate( node["args"][0], character, last);
				var r = evaluate( node["args"][1], character, last);
				if( typeof l !== 'number' || typeof r !== 'number' ) {
					return "(" + stripParens(l) + ">" + stripParens(r) + ")";
				}
				else {
					return l > r;
				}
			case 'lt':
				var l = evaluate( node["args"][0], character, last);
				var r = evaluate( node["args"][1], character, last);
				if( typeof l !== 'number' || typeof r !== 'number' ) {
					return "(" + stripParens(l) + "<" + stripParens(r) + ")";
				}
				else {
					return l < r;
				}
			case 'lte':
				var l = evaluate( node["args"][0], character, last);
				var r = evaluate( node["args"][1], character, last);
				if( typeof l !== 'number' || typeof r !== 'number' ) {
					return "(" + stripParens(l) + "<=" + stripParens(r) + ")";
				}
				else {
					return l <= r;
				}
			case 'cond':
				var c = evaluate( node["args"][0], character, last);
				var l = evaluate( node["args"][1], character, last);
				var r = evaluate( node["args"][2], character, last);
				
				if( typeof c === 'boolean' || c === 'true' || c === 'false' ) {
					return c === true || c === 'true' ? l : r;
				}
				else {
					return "(" + stripParens(c) + "?" + stripParens(l) + ":" + stripParens(r) + ")";
				}
				
			case 'floor':
				var l = evaluate( node["args"][0], character, last);
				if( typeof l !== 'number') {
					return "&lfloor;" + stripParens(l) + "&rfloor;";
				}
				else {
					return Math.floor(l);
				}
			default: throw new Error("Unhandled function: "+variable);
			}
		case 'binop':
			var l = evaluate(node["left"], character, last);
			var r = evaluate(node["right"], character, last);
			
			if( typeof l !== 'number' || typeof r !== 'number' ) {
				var sl, sr;
				
				if( typeof l === 'number' || node["left"]["type"] === 'stat' || node["left"]["type"] === 'binop' && ( node["left"]["op"] === '*' || node["left"]["op"] === '/' || node["op"] === '+' || node["op"] === '-')) {
					sl = l;
				}
				else {
					sl = "(" + l + ")";
				}
				
				if( typeof r === 'number' || node["right"]["type"] === 'stat' || node["right"]["type"] === 'binop' && ( node["right"]["op"] === '*' || node["right"]["op"] === '/' || node["op"] === '+' || node["op"] === '-')) {
					sr = r;
				}
				else {
					sr = "(" + r + ")";
				}
				
				if( ! verbose ) {
					if( node["op"] === '*' || node["op"] === '/' ) {
						if( l === 1 ) {
							return r;
						}
						else if( r === 1 ) {
							return l;
						}
					}
					else if( node["op"] === '+' || node["op"] === '-' ) {
						if( l === 0 ) {
							return r;
						}
						else if( r === 0 ) {
							return l;
						}
					}
				}
				
				return sl + node["op"] + sr;
			}
			else {
				l = parseFloat(l);
				r = parseFloat(r);
				
				switch(node["op"]) {
				case '+': return l + r;
				case '-': return l - r;
				case '/': return l / r;
				case '*': return l * r;
				default: throw new Error("Unhandled op: "+node["op"]);
				}
			}
		default:
			throw new Error("Unhandled node: " + node["type"]);
		}
	}
	
	function stripParens(s) {
		var d = 0;
		if( typeof s !== 'string' || s.length < 2 || s.charAt(0) != '(' || s.charAt(s.length-1) != ')' ) {
			return s;
		}
		for( var i=0; i<s.length; i++ ) {
			if(s.charAt(i)==')') {
				d --;
				if( d == 0 ) {
					return s;
				} 
			}
			else if(s.charAt(i)=='(') {
				d ++;
			}
		}
		if( d == 0 ) {
			return s.substr(1,s.length-2);
		}
		else {
			return s;
		}
	}
})();



//var desc = this.bustedDesc;
//var auras = character ? character.auras : null;
//var stats = character ? character.stats : null;
//
//desc = desc.replace(/\$dec\{(-?\d+(?:\.\d+)?)\}/g,function(str,p1) {
//	return Math.abs(parseFloat(p1));
//});
//
//desc = desc.replace(/\$time\{(-?\d+(?:\.\d+))\}/g,function(str,p1) {
//	return TextIO.timeToString(parseFloat(p1));
//});
//
//desc = desc.replace(/\$scalingValue\{(\d+),(\d+),(\d+),(\d+),(\d+(?:\.\d+)?),(\w)\}/gi, function( str, p1, p2, p3, p4, p5, p6) {
//	var castTime = g_calculateCastTime( parseInt(p1), parseInt(p2), parseInt(p3), character ? character.level : Character.MAX_LEVEL );
//	var value = g_calculateScaling( castTime ? castTime[1] : 1, p4, p5, 0, character ? character.level : Character.MAX_LEVEL );
//	
//	switch( p6 ) {
//	case 'M':
//	case 'S':
//		return Math.floor(Math.abs(value[0]) + Math.abs(eValue[1]));
//	default:
//		return Math.floor(Math.abs(value[0]));
//	}
//});
//
//desc = desc.replace(/\$scalingTime\{(\d+),(\d+),(\d+)\}/gi, function( str, p1, p2, p3) {
//	var castTime = g_calculateCastTime( parseInt(p1), parseInt(p2), parseInt(p3), character ? character.level : Character.MAX_LEVEL );
//	return TextIO.timeToString(castTime[0]/1000.0);
//});
//
//if( character ) {			
//	desc = desc.replace(/\$pl\b/gi, 	String(character.level));
//	desc = desc.replace(/\$hnd\b/gi, 	character.getEquippedItem(16, 0) ? (character.getEquippedItem(16, 0).inventorySlot == 17 && null == character.getEquippedItem(17, 0) ? "2" : "1") : "1");
//	desc = desc.replace(/\$ap\b/gi, 	String(Math.floor(stats.attackPower)));
//	desc = desc.replace(/\$rap\b/gi, 	String(Math.floor(stats.rangedAttackPower)));
//	desc = desc.replace(/\$ar\b/gi, 	String(Math.floor(stats.defense[0])));
//}
//else {
//	desc = desc.replace(/\$pl\b/gi, 	"CharacterLevel");
//	desc = desc.replace(/\$hnd\b/gi, 	"Hands");
//	
//	desc = desc.replace(/\$ap\b/gi, 	"AttackPower");
//	desc = desc.replace(/\$rap\b/gi, 	"RangedAttackPower");
//	desc = desc.replace(/\$ar\b/gi, 	"Armor");
//	
//	desc = desc.replace(/\$sph\b/gi, 	"HolyDamage");
//	desc = desc.replace(/\$spfr\b/gi, 	"NatureDamage");
//	desc = desc.replace(/\$spfi\b/gi, 	"FrostDamage");
//	desc = desc.replace(/\$sps\b/gi, 	"FireDamage");
//	desc = desc.replace(/\$sps\b/gi, 	"ShadowDamage");
//	desc = desc.replace(/\$spa\b/gi, 	"ArcaneDamage");
//	desc = desc.replace(/\$sp\b/gi, 	"SpellDamage");
//	
//	desc = desc.replace(/\$MWS\b/gi, 	"WeaponSpeed");
////	desc = desc.replace(/\$mwb\b/g, 	"MeleeWeaponMin");
////	desc = desc.replace(/\$MWB\b/g, 	"MeleeWeaponMax");
//	desc = desc.replace(/\$rwb\b/g, 	"RangedWeaponMin");
//	desc = desc.replace(/\$RWB\b/g, 	"RangedWeaponMax");
//	desc = desc.replace(/\$mw\b/g, 		"MeleeWeaponMin");
//	desc = desc.replace(/\$MW\b/g, 		"MeleeWeaponMax");
//	desc = desc.replace(/\$rw\b/g, 		"RangedWeaponMin");
//	desc = desc.replace(/\$RW\b/g, 		"RangedWeaponMax");
//}
//
//var ifRegExp = /\$if\{([^\[]+)\[([^\]]*)\]\[([^\]]*)\]\}/g;
//
//while( desc.match(ifRegExp)) {
//	desc = desc.replace( ifRegExp, function(str, p1, p2, p3) {
//		var cond;
//		if( ! auras ) {
//			cond = p1.replace(/s\d+/g, "false");
//		}
//		else {
//			cond = p1.replace(/s(\d+)/g, function(str, p1) {
//				return auras.isActive(parseInt(p1)) ? "true" : "false";
//			});
//		}
//		try {
//			if( eval('(' + cond + ')') ) {
//				return p2;
//			}
//			else {
//				return p3;
//			}
//		}
//		catch( e) {
//			return "|cFFFFFFFF" + p1.replace(/\|\|/g,"&or;").replace(/\&&/g,"&and;")  + "?" + p2 + ":" + p3 + "|r";
//		}
//	});
//}
//
//var expRegex = /\$exp\{([^\}]*)\}/g;
//
//while( desc.match(expRegex)) {			
//	desc = desc.replace( expRegex, function(str, p1) {
//		try { 
//			return eval('(' + p1 + ')');
//		}
//		catch( e) {
//			return "|cFFFFFFFF" + p1.replace(/^\((.+)\)$/g,"$1") + "|r";
//		}
//	});
//}
//
//var colorRegex = /\|c[0-9a-fA-f]{2}([0-9a-fA-f]{6})([^\|]*)(\|r|$)/gi;
//
//while( desc.match(colorRegex)) {
//	desc = desc.replace( colorRegex,"<span style=\"color: #$1\">$2</span>");
//}
//
//return desc.replace(/[^\r]\n\r[^\n]/g,"\r\n").replace(/(\r[^\n]|[^\r]\n)/g,"\r\n").replace(/\x0B/g,"\r\n").split(/\r\n/);

//// replace scaling effect variables $m and $M
//while( ( match = desc.match(/\$(s|m|M)\(-?(\d+),(-?\d+),(-?\d+),(-?\d+),(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)\)/i)) != null ) {
//	mod = parseFloat(match[8]);
//	cTime = g_calculateCastTime( parseInt(match[2], 10), parseInt(match[3], 10), parseInt(match[4], 10), this.level );
//	eValue = g_calculateScaling( cTime?cTime[1]:1, parseInt(match[5], 10), parseFloat(match[6]), parseFloat(match[7]), this.level );
//	desc = desc.replace(match[0],Math.floor(mod*(Math.abs(eValue[0])+(match[1]=='M'?Math.abs(eValue[1]):0))));
//}	
//// replace duration
//while( ( match = desc.match(/\$d\((\d+),(\d+),(\d+),(\d+(?:\.\d+)?)\)/i)) != null ) {
//	mod = parseFloat(match[4]);
//	cTime = g_calculateCastTime( parseInt(match[2], 10), parseInt(match[3], 10), parseInt(match[4], 10), this.level );
//	desc = desc.replace(match[0],cTime[0]);
//}
//// replace time inside equations with value, outside with formated string
//while( ( match = desc.match(/(\${[^}]*)\$time\((-?\d+(?:\.\d+)?)\)([^}]*})/i)) ) {
//	desc = desc.replace(match[0],match[1]+match[2]+match[3]);
//}
//while( ( match = desc.match(/\$time\((-?\d+(?:\.\d+)?)\)/i)) ) {
//	desc = desc.replace(match[0],TextIO.timeToString(match[1]));
//}
//return TextIO.parse(desc.replace(/\$pl/ig,this.level), characterScope);