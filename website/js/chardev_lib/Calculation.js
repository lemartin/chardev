/**
 * @author LeMartin
 */
function CCalculation(){
	var base_regen = [0,0.020979,0.020515,0.020079,0.019516,0.018997,0.018646,0.018314,0.017997,0.017584,0.017197,0.016551,0.015729,0.015229,0.01458,0.014008,0.01365,0.013175,0.012832,0.012475,0.012073,0.01184,0.011494,0.011292,0.01099,0.010761,0.010546,0.010321,0.010151,0.009949,0.00974,0.009597,0.009425,0.009278,0.009123,0.008974,0.008847,0.008698,0.008581,0.008457,0.008338,0.008235,0.008113,0.008018,0.007906,0.007798,0.007713,0.007612,0.007524,0.00743,0.00734,0.007268,0.007184,0.007116,0.007029,0.006945,0.006884,0.006805,0.006747,0.006667,0.0066,0.006421,0.006314,0.006175,0.006072,0.005981,0.005885,0.005791,0.005732,0.005668,0.005596,0.005316,0.005049,0.004796,0.004555,0.004327,0.00411,0.003903,0.003708,0.003522,0.003345,0.003345,0.003345,0.003345];
	
										//1			//2			//4			//8			//16		//32		//64		//128		//256			//1024
	var m_diminishing_k = new Array(	0.9560,		0.9560,		0.9880,		0.9880,		0.9530,		0.9560,		0.9880,		0.9530,		0.9530,		0,		0.9720);
	var m_diminishing_cp= new Array(	47.003525,	47.003525,	145.560408,	145.560408,	0,			47.003525,	145.560408,	0,			0,			0,		0);
	var m_diminishing_cd= new Array(	88.129021,	88.129021,	145.560408,	145.560408,	150.375940,	88.129021,	145.560408,	150.375940,	150.375940,	0,		116.890707);
	
	var m_baseCoefficient = new Array(	14, 		// 0	crit
										10, 		// 1	hit
										8, 			// 2	spell hit
										13.8, 		// 3	dodge
										13.8, 		// 4	parry
										5, 			// 5	block
										1.5, 		// 6	defense
										10, 		// 7	haste
										28.75, 		// 8	resilience
										2.5, 		// 9	expertise
										4.268292514	// 10	armor penetration
										); 
	var m_coefficient = new Array(0,0,0,0,0,0,0,0,0,0,0);
	
	var m_raceStats=new Array(
				new Array(0,0,0,0,0,0),
				new Array(20,20,20,20,20),
				new Array(22,16,23,19,19),
				new Array(15,23,19,24,20),
				new Array(17,25,19,20,20),
				new Array(21,17,19,21,22),
				new Array(25,15,22,15,22),
				new Array(19,18,21,18,25),
				new Array(21,22,21,16,21),
				new Array(23,17,22,17,23),
				new Array(17,22,18,24,19));
									
	var m_statIdToRating = new Array();
	m_statIdToRating[12] = 6;
	m_statIdToRating[13] = 3;
	m_statIdToRating[14] = 4;
	m_statIdToRating[15] = 5;
	m_statIdToRating[16] = 1;
	m_statIdToRating[17] = 1;
	m_statIdToRating[18] = 2;
	m_statIdToRating[19] = 0;
	m_statIdToRating[20] = 0;
	m_statIdToRating[21] = 0;
	m_statIdToRating[28] = 7;
	m_statIdToRating[29] = 7;
	m_statIdToRating[30] = 7;
	m_statIdToRating[31] = 1;
	m_statIdToRating[32] = 0;
	m_statIdToRating[35] = 8;
	m_statIdToRating[36] = 7;
	m_statIdToRating[37] = 9;
	m_statIdToRating[44] = 10;
	
	var m_agiToDodge70 	= [	30,				25,				26.5,			20,				25,				25,				25,				25,				25,				0,	14.7 ];
	var m_agiToDodge80 	= [ 73.52941176,	52.08333333,	75.18796992,	41.49377593,	52.08333333,	73.52941176,	52.08333333,	51.28205128,	52.08333333,	0,	41.66666667 ];
	var m_agiToDodge80  = [ 84.74576271,	59.88023952,	86.20689655,	47.84688995,	59.88023952,	84.74576271,	59.88023952,	58.82352941,	59.88023952,	0,	47.84688995]
	var m_baseDodge		= [ 3.66400,		3.49430,		-4.08730,		2.09570,		3.41780,		3.66400,		2.10800,		3.65870,		2.42110,		0,	5.60970 ];
	var m_baseCrit		= [ 3.1905,			3.26921,		-1.53388,		-0.298321,		3.17927,		3.18669,		2.92234,		3.45777,		2.62233,		0,	7.47516 ];
	var m_baseSCrit		= [ 0,				3.3357,			3.5998,			0,				1.23765,		0,				2.20045,		0.907381,		1.69966,		0,	1.85298];

	var m_apPerStat		=	[[2,0,0,0,0],[2,0,0,0,0],[1,1,0,0,0],[1,1,0,0,0],[1,0,0,0,0],[2,0,0,0,0],[1,1,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[0,0,0,0,0],[[2,0,0,0,0],[2,0,0,0,0],[2,1,0,0,0],[2,0,0,0,0],[2,0,0,0,0]]];
	var m_baseAp		=	[-20,-20,-20,-20,-10,-20,-20,-10,-10,0,-20];
	var m_apPerLevel	=	[3,3,2,2,0,3,2,0,0,0,[0,0,0,0,0]];
	var m_classIndex		= -1;
	//##################################################################################################################
	//	PRIVATE METHODS
	//##################################################################################################################
	function getClassIndex(chrClass){
		return (chrClass>0 ? Math.log(chrClass) / Math.log(2):-1);
	}
	
	function getApPerStat(clIndex,shapeForm,stat)
	{
		if(clIndex == 10)
		{
			return m_apPerStat[clIndex][shapeForm][stat];
		}
		return m_apPerStat[clIndex][stat];
	}
	
	function getBaseAp(clIndex,shapeForm)
	{
		return m_baseAp[clIndex];
	}
	
	function getApPerLevel(clIndex,shapeForm)
	{
		if(clIndex == 10)
		{
			return m_apPerLevel[clIndex][shapeForm];
		}
		return m_apPerLevel[clIndex];
	}
	
	function deminishingReturnDodge(_v, chrClass){
		if (chrClass <= 0) {
			return 0;
		}
		else {
			return 1 / (m_diminishing_k[m_classIndex] / _v + (m_diminishing_cd[m_classIndex] ? 1 / m_diminishing_cd[m_classIndex] : 0));
		}
	}
	
	function deminishingReturnParry(_v, chrClass){
		if (chrClass <= 0) {
			return 0;
		}
		else {
			return 1 / (m_diminishing_k[m_classIndex] / _v + (m_diminishing_cp[m_classIndex] ? 1 / m_diminishing_cp[m_classIndex] : 0));
		}
	}
	
	this.setCoefficients = function(level){
		for(var i=0;i<11;i++)
		{
			if(level<10)
				m_coefficient[i] = m_baseCoefficient[i]/26;
			else if(level>=10 && level<=60)
				m_coefficient[i] = m_baseCoefficient[i]*(level-8)/52;
			else if(level>60 && level<=70)
				m_coefficient[i] = m_baseCoefficient[i]*82/(262-3*level);
			else if(level > 70)
				m_coefficient[i] = m_baseCoefficient[i] * (82/52)* Math.pow((131/63),(level-70)/10);
		}
	};
	
	function getBaseCrit(chrClass){
		if (chrClass <= 0) {
			return 0;
		}
		else {
			return m_baseCrit[m_classIndex];
		}
	}
	function getBaseDodge(chrClass){
		if (chrClass <= 0) {
			return 0;
		}
		else {
			return m_baseDodge[m_classIndex];
		}
	}
	function getBaseSpellCrit(chrClass){
		if (chrClass <= 0) {
			return 0;
		}
		else {
			return m_baseSCrit[m_classIndex];
		}
	}
	
	function getDodgePerAgi(agi, chrClass,level){
		if (chrClass <= 0) {
			return 0;
		}
		else {
			if (level == 80) {
				return agi / m_agiToDodge80[m_classIndex];
			}
			else {
				return agi / m_agiToDodge70[m_classIndex];
			}
		}
	}	
	
	function getSpellCritPerInt(intellect, chrClass, level){
		if(g_basestats_level[level] && getBaseRegen(chrClass,level)){
			return g_basestats_level[level] * intellect;
		}
		else{
			return 0;
		}
	}
	
	function calculateCoefficent(i){
		var level = Engine.getLevel();
		if(level<10)
			return m_baseCoefficient[i]/26;
		if(level>=10 && level<=60)
			return m_baseCoefficient[i]*(level-8)/52;
		if(level>60 && level<=70)
			return m_baseCoefficient[i]*82/(262-3*level);
		if(level > 70)
			return m_baseCoefficient[i] * (82/52)* Math.pow((131/63),(level-70)/10);
	}
	
	function getBaseRegen( chrClass,level){
		if (chrClass <= 0 || chrClass & ( 1 + 8 + 32)) {
			return 0;
		}
		else {
			return base_regen[level];
		}
	}
	//##################################################################
	//	PUBLIC METHODS
	//##################################################################
	/**
	 * Returns the coefficient to convert rating to percentual chance
	 * 
	 * If the stat is no rating -1 is returned.
	 * 
	 * @param {int} statId
	 * @return {int} coefficent
	 */
	this.getCoefficient = function(statId){
		if(!m_statIdToRating[statId] && m_statIdToRating[statId]!==0){
			return -1;
		}
		else{
			return m_coefficient[m_statIdToRating[statId]];
		}
	};
	
	this.getRatingCoefficient = function(ratingId){
		if( ratingId == 20 || ratingId == 21  || ratingId == 25)
		{
			throw "No conversion possible form unified ratings, use the pre wotlk ratingIds!";
		}
		
		if(this.getCoefficient(ratingId + 11) > 0){
			return this.getCoefficient(ratingId + 11);
		}
		else{
			return 1;
		}
	};
	
	//##################################################################
	//
	//	STAT TEMPS
	//
	//##################################################################
	//
	var stoneSkinGargoyle = false;
	//
	var rating 		= new Array(38);
	var resistance 	= new Array(7);
	var stat 		= new Array(5);
	var baseStat 	= new Array(5);
	var health;
	var mana;
	var baseHealth;
	var baseMana;
	//
	var attackPower;
	var meleeCrit;
	var meleeHit;
	var meleeHitRating;
	var meleeHaste;
	var expertise;
	//
	var mainhandMinDmg;
	var mainhandMaxDmg;
	var mainhandHit;
	var mainhandCrit;
	var mainhandSpeed;
	var mainhandExpertise;
	//
	var offhandMinDmg;
	var offhandMaxDmg;
	var offhandHit;
	var offhandCrit;
	var offhandSpeed;
	var offhandExpertise;
	//
	var rangedAttackPower;
	var rangedCrit;
	var rangedHit;
	var rangedHitRating;
	var rangedHaste;
	var rangedMinDmg;
	var rangedMaxDmg;
	//
	var healing;
	var spellHaste;
	//
	var meleeHasteRating;
	var rangedHasteRating;
	var spellHasteRating;
	//
	var spellPenetration = new Array(7);
	//
	var sp5;
	var mp5;
	var hp5;
	var armorReduce;
	var armorPenetration;
	var mainhandArmorPenetration;
	var offhandArmorPenetration;
	//
	var parry;
	var dodge;
	var dodgePerAgi;
	var block;
	var defense;
	var blockValue;
	var resilience;
	var resilienceRating;
	//
	var damage 	= new Array(7);
	var crit 	= new Array(7);
	var hit 	= new Array(7);
	//
	var gearScore;
	//
	//##################################################################
	this.stats = function(character,preview,noBuffs){
		//var time = new Date();
		var retStats = (preview?character.getPreviewStats():character.getStats());
		var level = character.getLevel();
		var chrClassId = character.getClassId();
		var chrRaceId = character.getRaceId();
		var shapeForm = character.getShapeForm();
		var inventory = character.getInventory();
		var talents = character.getTalents();
		var baseStats = (character.getBaseStats()==null?new Array(0,0,0,0,0,0,0,0):character.getBaseStats());
		var auras = character.getAuras();
		var effects = auras.getEffects(noBuffs);
		var m_effect = effects[0];
		var m_effectMainhand = effects[1];
		var m_effectOffhand = effects[2];
		var m_effectRanged = effects[3];
		
		//##################################################################
		var tmp;
		//##################################################################
		stoneSkinGargoyle = false;
	
		health = 0;
		mana = 0;
		baseHealth = 0;
		baseMana = 0;
		
		attackPower = 0;
		meleeCrit = 0;
		meleeHit = 0;
		meleeHitRating = 0;
		meleeHaste = 0;
		expertise = 0;
		
		mainhandMinDmg = 0;
		mainhandMaxDmg = 0;
		mainhandHit = 0;
		mainhandCrit = 0;
		mainhandSpeed = 0;
		mainhandExpertise = 0;
		
		offhandMinDmg = 0;
		offhandMaxDmg = 0;
		offhandHit = 0;
		offhandCrit = 0;
		offhandSpeed = 0;
		offhandExpertise = 0;
		
		rangedAttackPower = 0;
		rangedCrit = 0;
		rangedHit = 0;
		rangedHitRating = 0;
		rangedHaste = 0;
		rangedMinDmg = 0;
		rangedMaxDmg = 0;
		
		healing = 0;
		spellHaste = 0;
		
		meleeHasteRating = 0;
		rangedHasteRating = 0;
		spellHasteRating = 0;
			
		sp5 = 0;
		mp5 = 0;
		hp5 = 0;
		armorReduce = 0;
		armorPenetration = 0;
		mainhandArmorPenetration = 0;
		offhandArmorPenetration = 0;
		
		parry = 0;
		dodge = 0;
		dodgePerAgi = 0;
		block = 0;
		defense = 0;
		blockValue = 0;
		resilience = 0;
		resilienceRating = 0;

		m_classIndex = getClassIndex(chrClassId);
		for (var i = 0; i < 5; i++) {
			baseStat[i] = 0;
			stat[i] = 0;
		}
		for (var i = 0; i < rating.length; i++) {
			rating[i] = 0;
		}
		for (var i = 0; i < 7; i++) {
			damage[i] = 0;
			crit[i] = 0;
			hit[i] = 0;
			resistance[i] = 0;
			spellPenetration[i] = 0;
		}
		//##################################################################
		this.setCoefficients(level);

		//##################################################################
		//
		//	Item stats
		//
		//##################################################################
		inventory.updateGemCount();
		for(var j=0;j<20;j++){
			if( (tmp = inventory.get(j)) )
			{
				tmpStat = [0,0,0,0,0,0,0];
				
				tmp.setStats(level);
				tmp.addStats(tmpStat,rating,resistance);
				
				if (tmp.getClassId() == 4 && tmp.getSubClassId() > 0 ) 
				{
					resistance[0] += tmp.getBaseArmor() * m_effect[142][0] / 100;
				}
				
				for(var i=0;i<5;i++)
				{
					stat[i] += tmpStat[i]*(1 + m_effect[137][i]/100);
				}
				health 			+= tmpStat[5]*(1 + m_effect[133]/100);
				mana			+= tmpStat[6]*(1 + m_effect[132]/100);
				
				blockValue		+= tmp.getBlockValue();
			}
		}
		//##################################################################
		
		
		//##################################################################
		//
		//			BASE STATS
		//
		//##################################################################
		for(var i=0;i<stat.length;i++)
		{
			baseStat[i] = baseStats[i] * (1 + m_effect[137][i]/100) + m_raceStats[chrRaceId][i] * (1 + m_effect[137][i]/100);
			
			stat[i] = Math.floor( m_effect[29][i] * (1 + m_effect[137][i]/100 ) ) + Math.floor( baseStat[i] ) + Math.floor( stat[i] );
		}
		
		resistance[0] = Math.floor( m_effect[22][0] + stat[1] * 2 + stat[3] * m_effect[182]/100 ) + Math.floor( resistance[0] );
		
		health 	+= (stat[2] * 10 + baseStats[5] * ( 1 + m_effect[282] / 100 ) + m_effect[34] + m_effect[230] )* (1 + m_effect[133]/100);
		mana	+= (stat[3] * 15 + baseStats[6] + m_effect[35] )* (1 + m_effect[132]/100);
		//##################################################################
		
		
		//##################################################################
		//
		//			Resistance
		//
		//##################################################################
		for(var i=1;i<resistance.length;i++){
			resistance[i] += m_effect[22][i];
			resistance[i] += m_effect[143][i];
		}
		//##################################################################
		
		
		//##################################################################
		//
		//			RATING
		//
		//##################################################################
		
		for (var i = 0; i < 22; i++) 
		{
			rating[i] += m_effect[189][i];
		}
		rating[26] += m_effect[189][23];
		rating[33] += m_effect[189][24];
		
		rating[21]	+= m_effect[220][1792] / 100 * stat[4];
		//
		// Strength to Parry Rating
		if( chrClassId == PALADIN || chrClassId == WARRIOR || chrClassId == DEATHKNIGHT ) {
			rating[3] += Math.floor( stat[0] * 0.27 );
			echo("Parry rating from strength: "+ Math.floor( stat[0] * 0.27 ));
		}
		
		//##################################################################
		//
		//			Attack Power
		//
		//##################################################################
		attackPower = m_effect[99] + rating[27];
		
		if (chrClassId == 1024 && (shapeForm == 1 || shapeForm == 2 || shapeForm == 3) && (tmp = inventory.get(16))) 
		{
			attackPower += tmp.getFeralAp() + (tmp.getFeralAp() + tmp.getRating(27)) * Math.ceil(talents.getSpent(1,3,1) * 6.66) / 100;
		}

		attackPower+= ( m_classIndex != -1 ? getBaseAp(m_classIndex,shapeForm) : 0 );
		attackPower+= ( m_classIndex != -1 ? getApPerLevel(m_classIndex,shapeForm) * level : 0);
		
		for (var i = 0; i < 5; i++) 
		{
			m_effect[268][i] += (m_classIndex != -1 ? getApPerStat(m_classIndex,shapeForm,i) * 100 : 0);
			attackPower += stat[i] * m_effect[268][i] / 100;
		}
		
		//
		// BLADED ARMOR
		//
		if(chrClassId == 1 && talents.getSpent(1,0,0))
		{
			attackPower += Math.floor(resistance[0]/108) * talents.getSpent(1,0,0);
		}
		//
		// ARMORED TO THE TEETH
		//
		if (chrClassId == 32 && talents.getSpent(0, 1, 0)) 
		{
			attackPower += Math.floor(resistance[0] / 180) * talents.getSpent(0, 1, 0);
		}
		attackPower = attackPower * (1 + m_effect[166]/100);
		
		rangedAttackPower = m_effect[124] + rating[27];
		
		for(var i=0;i<5;i++){
			rangedAttackPower += stat[i] * m_effect[212][i]/100;
		}
		
		switch (chrClassId) {
			case 0:
				break;
			case 1:
				rangedAttackPower += level + stat[1] - 10;
				break;
			case 4:
				rangedAttackPower += level * 2 + stat[1] - 10;
				break;
			case 8:
				rangedAttackPower += level + stat[1] - 10;
				break;
			default:
				rangedAttackPower += stat[1] - 10;
				break;
		}
		rangedAttackPower = rangedAttackPower * (1 + m_effect[167]/100);
		//##################################################################
		
		
		//##################################################################
		//
		//			Defense
		//
		//##################################################################
		//
		defense =  level * 5 + m_effect[98][95] + m_effect[30][95] + rating[1] / this.getRatingCoefficient(1);
		//
		//	STONESKIN GARGOYLE FIX PART 1
		//
		if( chrClassId == 32 && auras.isActive(62157))
		{
			stoneSkinGargoyle = true;
			defense -= 25;
		}
		//
		if( chrClassId == PALADIN || chrClassId == WARRIOR || chrClassId == DEATHKNIGHT ) {
			dodge = rating[2]/this.getRatingCoefficient(2) + (defense - level * 5) * 0.04;
			dodge = deminishingReturnDodge( dodge , chrClassId ) + m_effect[49] + 5;
		}
		else {
			dodge = getDodgePerAgi(stat[1] - baseStat[1] ,chrClassId,level) + rating[2]/this.getRatingCoefficient(2) + (defense - level * 5) * 0.04;
			dodge = deminishingReturnDodge( dodge , chrClassId );
			dodge += getDodgePerAgi(baseStat[1],chrClassId,level) + m_effect[49] + getBaseDodge(chrClassId);
		}
		
		parry = rating[3]/this.getRatingCoefficient(3) + (defense - level * 5) * 0.04;
		parry = m_effect[47] + deminishingReturnParry( parry , chrClassId );
		
		block = (m_effect[51] + rating[4]/this.getRatingCoefficient(4) + (defense - level * 5) * 0.04);
		
		resilienceRating = rating[24] + Math.min(rating[14],rating[15],rating[16]);
		resilience = resilienceRating / this.getRatingCoefficient(24);
		//	block value is calculated later because of item dependances
		//
		//	STONESKIN GARGOYLE FIX PART 2
		//
		if( chrClassId == 32 && stoneSkinGargoyle)
		{
			defense += 25;
			dodge += 1;
			parry += 1;
			block += 1;
		}
		//
		if(GameInfo.canBlock(chrClassId)){
			block += 5;
		}
		else{
			block = 0;
		}
		if(GameInfo.canParry(chrClassId) || (chrClassId == 64 && talents.getSpent(1,4,1))){
			parry += 5;
		}
		else{
			parry = 0;
		}
		//
		//##################################################################
		//
		//			Spell Damage
		//
		//##################################################################
		//
		for(var i=0;i<damage.length;i++){
			for(var j=0;j<stat.length;j++){
				damage[i] += stat[j] * m_effect[174][i][j]/100;
			}
			damage[i]+= m_effect[13][i] + rating[34];
			damage[i]+= m_effect[237][i]/100*attackPower;
		}
		//
		//##################################################################
		//
		//			Healing
		//
		//##################################################################
		//
		healing = m_effect[135] + rating[34];
		for(var i=0;i<stat.length;i++){
			healing += stat[i] * m_effect[175][i] / 100;
		}
		healing += m_effect[238][1]/100*attackPower;
		//
		//##################################################################
		//
		//			Spell Penetration
		//
		//##################################################################
		//
		for(var i=0;i<spellPenetration.length;i++)
		{
			spellPenetration[i] = Math.abs(rating[36]) + Math.abs(m_effect[123][i]);
		}
		//
		//##################################################################
		//
		//			Mana Regeneration
		//
		//##################################################################
		//
		if (getBaseRegen(chrClassId,level)) {
			sp5 = 5 * (0.001 + Math.sqrt(stat[3]) * stat[4] * getBaseRegen(chrClassId,level));
			mp5 = m_effect[85] + rating[32] + sp5 * (m_effect[134] / 100) + m_effect[219][0] / 100 * stat[0] + m_effect[219][1] / 100 * stat[1] + m_effect[219][2] / 100 * stat[2] + m_effect[219][3] / 100 * stat[3] + m_effect[219][4] / 100 * stat[4];
			sp5 = sp5 * (1 - m_effect[134] / 100)
		}
		else{
			mp5 = 0;
			sp5 = 0;
		}
		//
		//##################################################################
		//
		//			Health Regeneration
		//
		//##################################################################
		//
		hp5	= m_effect[161] + rating[35];
		//
		//##################################################################
		//
		//			Haste
		//
		//##################################################################
		//
		meleeHasteRating 	= rating[17] + rating[25];
		rangedHasteRating 	= rating[18] + rating[25];
		spellHasteRating 	= rating[19] + rating[25];
		//
		meleeHaste			= meleeHasteRating / this.getRatingCoefficient(17) * ((chrClassId&(2+32+64+1024))!=0?1.3:1);
		rangedHaste			= rangedHasteRating / this.getRatingCoefficient(18);
		spellHaste 			= spellHasteRating / this.getRatingCoefficient(19);
		spellHaste			= ( 1 + spellHaste / 100  ) * (1 + m_effect[65] / 100 ) * 100 - 100;
		//
		//	item depended
		//
		//	see weapon speed
		//
		//##################################################################
		//
		//			Critical
		//
		//##################################################################
		//
		for(var i=0;i<crit.length;i++){
			crit[i] = m_effect[290] + m_effect[71][i];
		}
		//
		meleeCrit			= crit[0] + ( rating[8] + rating[21]) / this.getRatingCoefficient(8) + getBaseCrit(chrClassId) + stat[1] * baseStats[7] + m_effect[52];
		rangedCrit			= crit[0] + ( rating[9] + rating[21]) / this.getRatingCoefficient(9) + getBaseCrit(chrClassId) + stat[1] * baseStats[7] + m_effect[52];
		//
		for(var i=1;i<crit.length;i++){
			crit[i] 		+= ( rating[10] + rating[21] ) / this.getRatingCoefficient(10) + getSpellCritPerInt(stat[3],chrClassId,level) + m_effect[57] + Math.max(m_effectOffhand[57],m_effectMainhand[57]) + getBaseSpellCrit(chrClassId);
		}
		//
		//	item depended
		//
		mainhandCrit 	 	= meleeCrit + m_effectMainhand[52] + m_effectMainhand[290] + m_effectMainhand[71][0];
		offhandCrit 	 	= meleeCrit + m_effectOffhand[52] + m_effectOffhand[290] + m_effectOffhand[71][0];
		rangedCrit 			+= m_effectRanged[52] + m_effectRanged[290] + m_effectRanged[71][0];
		//
		//##################################################################
		//
		//			Hit
		//
		//##################################################################
		//
		meleeHitRating 		= rating[5] + rating[20];
		rangedHitRating		= rating[6] + rating[20];
		meleeHit			= meleeHitRating / this.getRatingCoefficient(5) + m_effect[54];
		rangedHit			= rangedHitRating / this.getRatingCoefficient(6) + m_effect[54];
		//
		for(var i=1;i<hit.length;i++){
			hit[i]			+= m_effect[55][i] + ( rating[7]  + rating[20] ) / this.getRatingCoefficient(7);
		//
		// dreanei fix part 1
		//	
			if(chrRaceId == 5)
			{
				hit[i]--;
			}
		}
		//
		// dreanai fix part 2
		//
		if(chrRaceId == 5){
			meleeHit -=1;
			rangedHit -=1;
		}
		//
		//	item depended
		//
		mainhandHit = meleeHit + m_effectMainhand[54];
		offhandHit 	= meleeHit + m_effectOffhand[54];
		rangedHit 	+= m_effectRanged[54];
		//
		//
		//##################################################################
		//
		//			Armor Penetration and Expertise
		//
		//##################################################################
		//
		armorPenetration	= rating[33] / this.getRatingCoefficient(33) + m_effect[280];
		expertise			= rating[26] / this.getRatingCoefficient(26) + m_effect[240];
		//
		//	item dependend
		//
		mainhandArmorPenetration = armorPenetration + m_effectMainhand[280];
		offhandArmorPenetration = armorPenetration + m_effectOffhand[280];
		mainhandExpertise = expertise + m_effectMainhand[240];
		offhandExpertise = expertise + m_effectOffhand[240];
		//
		//##################################################################
		//
		//			Weapon damage and speed
		//
		//##################################################################
		//
		//	mainhand
		//
		var nonPhysicalMin = 0;
		var nonPhysicalMax = 0;
		if (chrClassId == 1024 && shapeForm == 1) 
		{
			mainhandSpeed 	= 2500;
			mainhandMinDmg 	= 50.6 - 28;
			mainhandMaxDmg 	= 50.6 - 28;
		}
		else if (chrClassId == 1024 && shapeForm == 2) 
		{
			mainhandSpeed 	= 1000;
			mainhandMinDmg 	= 54.8 - 11.5;
			mainhandMaxDmg 	= 54.8 - 11.5;
		}
		else if ( (tmp = inventory.get(16)) ) 
		{
			mainhandSpeed 	= tmp.getSpeed();
			mainhandMinDmg 	= tmp.getDamageMin(0);
			mainhandMaxDmg 	= tmp.getDamageMax(0);
			for( var i = 1 ; i < 5 ; i++ )
			{
				nonPhysicalMin += tmp.getDamageMin(i);
				nonPhysicalMax += tmp.getDamageMax(i);
			}
		}
		else 
		{
			mainhandSpeed 	= 2000;
			mainhandMinDmg 	= 50.6 - 28;
			mainhandMaxDmg 	= 50.6 - 28;
		}
		//
		mainhandMinDmg += attackPower / 14 * mainhandSpeed / 1000;
		mainhandMaxDmg += attackPower / 14 * mainhandSpeed / 1000;
		//
		mainhandSpeed /= 1 + meleeHaste / 100;
		mainhandSpeed /= 1 + m_effect[138] / 100 + m_effectMainhand[138] / 100;
		mainhandSpeed /= 1 + m_effect[193] / 100 + m_effectMainhand[193] / 100;
		//
		mainhandMinDmg += m_effect[13][0] + m_effectMainhand[13][0];
		mainhandMaxDmg += m_effect[13][0] + m_effectMainhand[13][0];
		//
		mainhandMinDmg *= 1 + m_effect[79][0] / 100 + m_effectMainhand[79][0] / 100;
		mainhandMaxDmg *= 1 + m_effect[79][0] / 100 + m_effectMainhand[79][0] / 100;
		//
		mainhandMinDmg += nonPhysicalMin;
		mainhandMaxDmg += nonPhysicalMax;
		//
		//	offhand
		//
		if ( (tmp = inventory.get(17)) ) 
		{
			offhandSpeed = tmp.getSpeed();
			//
			offhandMinDmg 	= tmp.getDamageMin(0) + attackPower / 14 * offhandSpeed / 1000;
			offhandMaxDmg 	= tmp.getDamageMax(0) + attackPower / 14 * offhandSpeed / 1000;
			//
			offhandSpeed /= 1 + meleeHaste / 100;
			offhandSpeed /= 1 + m_effect[138] / 100 + m_effectOffhand[138] / 100;
			offhandSpeed /= 1 + m_effect[193] / 100 + m_effectOffhand[193] / 100;
			//
			offhandMinDmg += m_effect[13][0] + m_effectOffhand[13][0];
			offhandMaxDmg += m_effect[13][0] + m_effectOffhand[13][0];
			//
			offhandMinDmg *= 1 + m_effect[79][0] / 100 + m_effectOffhand[79][0] / 100;
			offhandMinDmg *= 1 + m_effect[122] / 100 + m_effectOffhand[122]/100;
			offhandMinDmg *= 0.5;
			//
			offhandMaxDmg *= 1 + m_effect[79][0] / 100 + m_effectOffhand[79][0] / 100;
			offhandMaxDmg *= 1 + m_effect[122] / 100 + m_effectOffhand[122]/100;
			offhandMaxDmg *= 0.5;
			//
			for( var i = 1 ; i < 5 ; i++ )
			{
				offhandMinDmg += tmp.getDamageMin(i);
				offhandMaxDmg += tmp.getDamageMax(i);
			}
		}
		else 
		{
			offhandMinDmg = 0;
			offhandMaxDmg = 0;
			offhandSpeed = 1000;
		}
		
		//
		//	shield
		//
		blockValue += rating[37] + m_effectOffhand[189][37] + m_effect[158] + m_effectOffhand[158] + stat[0] / 2;
		blockValue*= 1 + m_effect[150] / 100 + m_effectOffhand[150] / 100;
		//
		//	ranged
		//
		if ( (tmp = inventory.get(18)) ) 
		{
			var ammo = inventory.get(19);
			rangedSpeed = tmp.getSpeed();
			//
			rangedMinDmg = tmp.getDamageMin(0) + ( rangedAttackPower / 14 + (ammo?ammo.getDPS():0) ) * rangedSpeed / 1000;
			rangedMaxDmg = tmp.getDamageMax(0) + ( rangedAttackPower / 14 + (ammo?ammo.getDPS():0) ) * rangedSpeed / 1000;
			//
			rangedSpeed /= 1 + rangedHaste / 100;
			rangedSpeed /= 1 + m_effect[140] / 100 + m_effectRanged[140] / 100; 
			rangedSpeed /= 1 + m_effect[141] / 100 + m_effectRanged[141] / 100 + (chrClassId==4?0.15:0);
			rangedSpeed /= 1 + m_effect[193] / 100 + m_effectRanged[193] / 100;
			//
			rangedMinDmg += m_effect[13][0] + m_effectRanged[13][0];
			rangedMaxDmg += m_effect[13][0] + m_effectRanged[13][0];
			//
			rangedMinDmg *= 1 + m_effect[79][0] / 100  + m_effectRanged[79][0] / 100 ;
			rangedMaxDmg *= 1 + m_effect[79][0] / 100  + m_effectRanged[79][0] / 100 ;
			//
			for( var i = 1 ; i < 5 ; i++ )
			{
				rangedMinDmg += tmp.getDamageMin(i);
				rangedMaxDmg += tmp.getDamageMax(i);
			}
		}
		else 
		{
			rangedMinDmg = 0;
			rangedMaxDmg = 0;
			rangedSpeed = 1000;
		}
		//
		//##################################################################	
		//
		// def stance
		//
		//##################################################################
		//
		//
		//##################################################################
		retStats.effect = m_effect;
		
		retStats.chrClassId = chrClassId;
		retStats.level = level;
		retStats.shapeForm = shapeForm;
		
		retStats.stat = stat;
		retStats.baseStat = baseStat;
		retStats.rating = rating;
		retStats.resistance = resistance;
		
		retStats.health = health;
		retStats.mana = (GameInfo.hasMana(chrClassId,shapeForm)?mana:100);
		
		retStats.parry = parry;
		retStats.dodge = dodge;
		retStats.defense = defense;
		retStats.resilience = resilience;
		retStats.resilienceRating = resilienceRating;
		retStats.block = block;
		retStats.blockValue = blockValue;
		
		retStats.damage = damage;
		retStats.healing = healing;
		retStats.crit = crit;
		retStats.hit = hit;
		retStats.healing = healing;
			
		retStats.spellHaste = spellHaste;
		retStats.spellHasteRating = spellHasteRating;
		retStats.spellPenetration = spellPenetration;	
		
		retStats.mp5 = mp5;
		retStats.sp5 = sp5;
		retStats.hp5 = hp5;
		retStats.armorPenetration = armorPenetration;
		retStats.armorReduce = armorReduce;
		
		retStats.meleeHitRating = meleeHitRating;
		retStats.meleeHit = meleeHit;
		retStats.meleeCrit = meleeCrit;
		retStats.meleeHasteRating = meleeHasteRating;
		retStats.meleeHaste = meleeHaste;
		retStats.attackPower = attackPower;
		retStats.expertise = expertise;
		
		retStats.rangedHitRating = rangedHitRating;
		retStats.rangedHit = rangedHit;
		retStats.rangedCrit = rangedCrit;
		retStats.rangedHasteRating = rangedHasteRating;
		retStats.rangedHaste = rangedHaste;
		retStats.rangedAttackPower = rangedAttackPower;	
		retStats.rangedMinDmg = rangedMinDmg;
		retStats.rangedMaxDmg = rangedMaxDmg;
		retStats.rangedSpeed = rangedSpeed;
		
		retStats.apPerStat = m_effect[268];
		retStats.dodgeFromAgi = getDodgePerAgi(stat[1],chrClassId,level);
		retStats.critFromAgi = baseStats[7] * stat[1];
		retStats.healthPerSta = 10 * ( m_effect[133]/100 + 1);
		retStats.healthFromSta = stat[2] * 10 * (m_effect[133]/100 + 1);
		retStats.spellCritFromInt = getSpellCritPerInt(stat[3], chrClassId, level);
		retStats.baseDodge = getBaseDodge(chrClassId);
		
		retStats.mainhandMinDmg = mainhandMinDmg;
		retStats.mainhandMaxDmg = mainhandMaxDmg;
		retStats.mainhandHit = mainhandHit;
		retStats.mainhandCrit = mainhandCrit;
		retStats.mainhandSpeed = mainhandSpeed;
		retStats.mainhandExpertise = mainhandExpertise;
		retStats.mainhandArmorPenetration = mainhandArmorPenetration;
		
		retStats.offhandMinDmg = offhandMinDmg;
		retStats.offhandMaxDmg = offhandMaxDmg;
		retStats.offhandHit = offhandHit;
		retStats.offhandCrit = offhandCrit;
		retStats.offhandSpeed = offhandSpeed;
		retStats.offhandExpertise = offhandExpertise;
		retStats.offhandArmorPenetration = offhandArmorPenetration;
		retStats.setShownStats();
		//
		//g_echo((new Date()).getMilliseconds() - time.getMilliseconds());
	}
	//##################################################################################################################
	//##################################################################################################################
}
var Calculation = new CCalculation();