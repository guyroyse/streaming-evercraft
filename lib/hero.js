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
  set alignment(alignment) {
    let found = ['Good', 'Neutral', 'Evil'].includes(alignment)
    if (!found) throw `'${alignment}' is not an alignment`

    if (this.class === 'Rogue' && alignment === 'Good') throw "Rogues cannot be 'Good'"

    this._alignment = alignment
  }

  get class() { return this._class }
  set class(clazz) { 
    let found = ['None', 'Fighter', 'Rogue', 'Monk', 'Paladin'].includes(clazz)
    if (!found) throw `'${clazz}' is not a class`

    if (clazz === 'Rogue' && this.alignment === 'Good') throw "Rogues cannot be 'Good'"

    this._class = clazz
  }

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

}

module.exports = Hero
