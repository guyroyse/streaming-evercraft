class Alignment {
  constructor(hero) {
    this._hero = hero
    this._alignment = "Neutral"
  }

  get value() {
    return this._alignment
  }

  set value(alignment) {
    this._alignment = this.validateAlignment(alignment)
  }

  validateAlignment(alignment) {
    this.validateInList(['Good', 'Neutral', 'Evil'], alignment, `'${alignment}' is not an alignment`)
    this.validateClassAndAlignment(this._hero.class, alignment)
    return alignment
  }

  validateClassAndAlignment(clazz, alignment) {
    if (clazz === 'Rogue' && alignment === 'Good') throw "Rogues cannot be 'Good'"
  }

  validateInList(list, value, error) {
    if (!list.includes(value)) throw error
  }
}

module.exports = Alignment
