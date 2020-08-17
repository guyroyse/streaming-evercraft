const BASE_AC = 10

class ArmorClass {
  constructor(hero) {
    this._hero = hero
  }

  get value() {
    return BASE_AC + this.dexterityModifier
  }

  get minusDex() {
    return this.dexterityModifier < 0 ? this.value : BASE_AC 
  }

  get dexterityModifier() { return this._hero.dexterity.modifier }
}

module.exports = ArmorClass
