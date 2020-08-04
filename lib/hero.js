const Ability = require("./ability")
const CLASS_FEATURES = require('./data')

const XP_PER_LEVEL = 1000
const BASE_AC = 10

class Hero {
  constructor() {
    this._name = ""
    this._alignment = "Neutral"
    this._class = "None"
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
  set alignment(alignment) { this._alignment = this.validateAlignment(alignment) }

  get class() { return this._class }
  set class(clazz) { this._class = this.validateClass(clazz) }

  get strength() { return this._str }
  get dexterity() { return this._dex }
  get constitution() { return this._con }

  get armorClass() { return BASE_AC + this.dexterity.modifier }
  get hitPoints() { 
    return Math.max(this.classFeatures().hpPerLevel + this.constitution.modifier, 1) * this.level
  }

  get currentHitPoints() { return this.hitPoints - this._damage }
  get isAlive() { return this.currentHitPoints > 0 }

  get attackModifier() {
    let modifier = this.class === 'Rogue' ? this.dexterity.modifier : this.strength.modifier
    return Math.floor(this.classFeatures().attackProgression * this.level) + modifier
  }

  get attackDamage() { return Math.max(1 + this.strength.modifier, 1) }
  get criticalDamage() { return Math.max((1 + this.strength.modifier) * this.classFeatures().critMultiplier, 1) }
  
  damage(points) {
    this._damage += points
  }

  addExperience(amount) {
    this._xp += amount
  }

  classFeatures() {
    return CLASS_FEATURES[this.class]
  }

  validateAlignment(alignment) {
    this.validateInList(['Good', 'Neutral', 'Evil'], alignment, `'${alignment}' is not an alignment`)
    this.validateClassAndAlignment(this.class, alignment)
    return alignment
  }

  validateClass(clazz) {
    this.validateInList(['None', 'Fighter', 'Rogue', 'Monk', 'Paladin'], clazz, `'${clazz}' is not a class`)
    this.validateClassAndAlignment(clazz, this.alignment)
    return clazz
  }

  validateClassAndAlignment(clazz, alignment) {
    if (clazz === 'Rogue' && alignment === 'Good') throw "Rogues cannot be 'Good'"
  }

  validateInList(list, value, error) {
    if (!list.includes(value)) throw error
  }

}

module.exports = Hero
