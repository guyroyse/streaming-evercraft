const BASE_AC = 10

class ArmorClass {
  constructor(hero) {
    this._hero = hero
  }

  get value() {
    return this.class === 'Monk' ? this.basePlusDex + this.positiveWisdomModifier : this.basePlusDex
  }

  get minusDex() {
    return this.dexterityModifier < 0 ? this.value : BASE_AC 
  }

  get basePlusDex() {
    return BASE_AC + this.dexterityModifier
  }

  get class() { return this._hero.class } 
  get dexterityModifier() { return this._hero.dexterity.modifier }
  get positiveWisdomModifier() { return Math.max(this._hero.wisdom.modifier, 0) }
}

module.exports = ArmorClass
