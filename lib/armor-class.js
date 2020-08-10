const BASE_AC = 10

class ArmorClass {
  constructor(hero) {
    this._hero = hero
  }

  get value() {
    return BASE_AC + this._hero.dexterity.modifier
  }
}

module.exports = ArmorClass