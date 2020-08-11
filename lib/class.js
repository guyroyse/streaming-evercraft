class Class {
  constructor(hero) {
    this._hero = hero
    this._class = "None"
  }

  get value() {
    return this._class
  }

  set value(clazz) {
    this._class = this.validateClass(clazz)
  }

  validateClass(clazz) {
    this.validateInList(['None', 'Fighter', 'Rogue', 'Monk', 'Paladin'], clazz, `'${clazz}' is not a class`)
    this.validateClassAndAlignment(clazz, this._hero.alignment)
    return clazz
  }

  validateClassAndAlignment(clazz, alignment) {
    if (clazz === 'Rogue' && alignment === 'Good') throw "Rogues cannot be 'Good'"
  }

  validateInList(list, value, error) {
    if (!list.includes(value)) throw error
  }
}

module.exports = Class
