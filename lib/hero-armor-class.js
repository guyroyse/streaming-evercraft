const BASE_AC = 10

class ArmorClass {
  constructor(hero) {
    this._hero = hero
  }

  value = attacker => {
    if (attacker.class === 'Rogue') return BASE_AC + this.negativeDexterityModifier
    if (this.class === 'Monk') return BASE_AC + this.positiveWisdomModifier + this.dexterityModifier
    return BASE_AC + this.dexterityModifier
  }

  get class() { return this._hero.class } 
  get dexterityModifier() { return this._hero.dexterity.modifier }
  get negativeDexterityModifier() { return Math.min(0, this.dexterityModifier) }
  get positiveWisdomModifier() { return Math.max(this._hero.wisdom.modifier, 0) }
}

module.exports = ArmorClass
