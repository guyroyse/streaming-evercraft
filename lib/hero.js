const Ability = require("./ability")

const XP_PER_LEVEL = 1000
const BASE_AC = 10
const BASE_HP_PER_LEVEL = 5

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

  get level() { return Math.floor(this.experiencePoints / XP_PER_LEVEL) + 1 }
  get experiencePoints() { return this._xp }

  get alignment() { return this._alignment }
  set alignment(alignment) {
    let found = ['Good', 'Neutral', 'Evil'].includes(alignment)
    if (!found) throw `'${alignment}' is not an alignment`
    this._alignment = alignment
  }

  get strength() { return this._str }
  get dexterity() { return this._dex }
  get constitution() { return this._con }

  get armorClass() { return BASE_AC + this.dexterity.modifier }
  get hitPoints() { return Math.max(BASE_HP_PER_LEVEL + this.constitution.modifier, 1) * this.level }
  get currentHitPoints() { return this.hitPoints - this._damage }
  get isAlive() { return this.currentHitPoints > 0 }
  get attackModifier() { return this.strength.modifier + Math.floor(this.level / 2) }
  get attackDamage() { return Math.max(1 + this.strength.modifier, 1) }
  get criticalDamage() { return Math.max(2 + this.strength.modifier * 2, 1) }
  
  damage(points) {
    this._damage += points
  }

  addExperience(amount) {
    this._xp += amount
  }
}

module.exports = Hero
