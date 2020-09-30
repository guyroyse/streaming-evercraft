const BASE_AC = 10

class ArmorClass {
  constructor(hero) {
    this._hero = hero
  }

  value = attacker => {
    let total = BASE_AC;
    
    if (attacker.class === 'Rogue') {
      total += this.negativeDexterityModifier
    } else {
      total += this.dexterityModifier
    }
    
    if (this.class === 'Monk') total += this.positiveWisdomModifier
    
    if (this.race === 'Orc') total += 2

    return total
  }

  get race() { return this._hero.race }
  get class() { return this._hero.class }
  get dexterityModifier() { return this._hero.dexterity.modifier }
  get negativeDexterityModifier() { return Math.min(0, this.dexterityModifier) }
  get positiveWisdomModifier() { return Math.max(this._hero.wisdom.modifier, 0) }
}

module.exports = ArmorClass
