var Compression = {
	__urlCharacters: {
		0:'A',
		1:'B',
		2:'C',
		3:'D',
		4:'E',
		5:'F',
		6:'G',
		7:'H',
		8:'I',
		9:'J',
		10:'K',
		11:'L',
		12:'M',
		13:'N',
		14:'O',
		15:'P',
		16:'Q',
		17:'R',
		18:'S',
		19:'T',
		20:'U',
		21:'V',
		22:'W',
		23:'X',
		24:'Y',
		25:'Z',
		26:'a',
		27:'b',
		28:'c',
		29:'d',
		30:'e',
		31:'f',
		32:'g',
		33:'h',
		34:'i',
		35:'j',
		36:'k',
		37:'l',
		38:'m',
		39:'n',
		40:'o',
		41:'p',
		42:'q',
		43:'r',
		44:'s',
		45:'t',
		46:'u',
		47:'v',
		48:'w',
		49:'x',
		50:'y',
		51:'z',
		52:'0',
		53:'1',
		54:'2',
		55:'3',
		56:'4',
		57:'5',
		58:'6',
		59:'7',
		60:'8',
		61:'9',
		62:'!',
		63:'\'',
		64:'(',
		65:')',
		66:'*',
		68:'_'
	},
	__numToBin: {
		0: '0',
		1: '1',
		2: '10',
		3: '11',
		4: '100',
		5: '101'
	},
	/**
	 * @param {Talents} talents
	 */
	densifiedDistribution: function( talents ) {
		var binary = "";
		var talent;
		var size = 0;
		for( var tree=0; tree<talents.trees; tree++ ) {
			for( var row=0; row<talents.rows; row++ ) {
				for( var col=0; col<talents.cols; col++ ) {
					talent = talents.talents[tree][row][col];
					if( talent == null ) {
						continue;
					}
					
					if( talent.ranks == 1 ) {
						size = 1;
					}
					else if( talent.ranks == 2 ) {
						size = 2;
					}
					else {
						size = 3;
					}
					
					binary += Compression.__prefixPadToSize(Compression.__numToBin[talent.spent], size);
				}
			}
		} 
		return Compression.__binaryStringToCompressed(binary);
	},
	__densifiedTreeDistribution: function( talents ) {
		
	},
	__prefixPadToSize: function( str, size ) {
		var padding = "";
		while( str.length < size ) {
			padding += "0"; 
		}
		return padding + str;
	},
	__suffixPadToSize: function( str, size ) {
		var padding = "";
		while( str.length < size ) {
			padding += "0";
		}
		return str + padding;
	},
	__binaryStringToCompressed: function( str ) {
		var compressed = "";
		var todo = str;
		while( todo.length > 0 ) {
			if( todo.length < 6 ) {
				todo = Compression.__suffixPadToSize(todo, 6);
			}
			
			compressed += Compression.__urlCharacters[ parseInt( todo.substr(0,6), 2 ) ];
			
			todo = todo.slice( 6 );
		}
		
		return compressed;
	}
};