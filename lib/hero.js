class Hero {
  constructor() {
    this._name = ""
    this._alignment = "Neutral"
    this._damage = 0
  }

  get name() {
    return this._name
  }

  set name(name) {
    this._name = name
  }

  get alignment() {
    return this._alignment
  }

  set alignment(alignment) {
    let found = ['Good', 'Neutral', 'Evil'].includes(alignment)
    if (!found) throw `'${alignment}' is not an alignment`
    this._alignment = alignment
  }

  get armorClass() {
    return 10
  }

  get hitPoints() {
    return 5 - this._damage
  }

  get isAlive() { 
    return this.hitPoints > 0
  }

  damage(points) {
    this._damage += points
  }
}

module.exports = Hero
