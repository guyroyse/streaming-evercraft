const Ability = require("./ability")

class Hero {
  constructor() {
    this._name = ""
    this._alignment = "Neutral"
    this._str = new Ability()
    this._dex = new Ability()
    this._con = new Ability()
    this._damage = 0
    this._xp = 0
  }

  get name() { return this._name }
  set name(name) { this._name = name }

  get alignment() { return this._alignment }
  set alignment(alignment) {
    let found = ['Good', 'Neutral', 'Evil'].includes(alignment)
    if (!found) throw `'${alignment}' is not an alignment`
    this._alignment = alignment
  }

  get strength() { return this._str }
  get dexterity() { return this._dex }
  get constitution() { return this._con }

  get armorClass() { return 10 + this.dexterity.modifier }
  get hitPoints() { return Math.max(5 + this.constitution.modifier, 1) }
  get currentHitPoints() { return this.hitPoints - this._damage }
  get isAlive() { return this.currentHitPoints > 0 }
  get attackModifier() { return this.strength.modifier }
  get attackDamage() { return Math.max(1 + this.strength.modifier, 1) }
  get criticalDamage() { return Math.max(2 + this.strength.modifier * 2, 1) }
  get experiencePoints() { return this._xp }
  
  damage(points) {
    this._damage += points
  }

  addExperience(amount) {
    this._xp += amount
  }
}

module.exports = Hero
