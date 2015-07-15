<?php

namespace chardev\backend\entities;

// (int)$joinRecord['ProcValue'],
// (int)$joinRecord['Aura'],
// (int)$joinRecord['Effect'],
// (int)$joinRecord['Period'],
// (int)$joinRecord['Value'],
// (int)$joinRecord['Targets'],
// (float)$joinRecord['Coefficient'],
// (int)$joinRecord['Dice'],
// ($joinRecord['Aura'] == 53 ? SpellItemEnchantmentData::getInstance()->fromId($joinRecord['SecondaryEffect']) : (int)$joinRecord['SecondaryEffect']),
// (int)$joinRecord['UsedStat'],
// (int)$joinRecord['ProcChance'],
// (int)$joinRecord['LevelModifier'],
// (int)$joinRecord['ProcSpellID'],
// (int)$joinRecord['ID'],
// (int)$joinRecord['SpellScalingCoefficient']

class SpellEffect {
	
	protected $data = null;
	
	public function __construct( $data ) {
		$this->data = $data;
	}
	
	public function getProcValue() {
		return $this->data[0];
	}
	
	public function getAura() {
		return $this->data[1];
	}
	
	public function getEffect() {
		return $this->data[2];
	}
	
	public function getPeriod() {
		return $this->data[3];
	}
	
	public function getValue() {
		return $this->data[4];
	}
	
	public function getTargets() {
		return $this->data[5];
	}
	
	public function getCoefficient() {
		return $this->data[6];
	}
	
	public function getDice() {
		return $this->data[7];
	}
	
	public function getSecondaryEffect() {
		return $this->data[8];
	}
	
	public function getUsedStat() {
		return $this->data[9];
	}
	
	public function getProcChance() {
		return $this->data[10];
	}
	
	public function getLevelModifier() {
		return $this->data[11];
	}
	
	public function getProcSpellId() {
		return $this->data[12];
	}
	
	public function getId() {
		return $this->data[13];
	}
	
	public function getSpellScalingCoefficient() {
		return $this->data[14];
	}
}