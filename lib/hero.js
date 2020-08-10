const Name = require("./name")
const Ability = require("./ability")
const LevelAndExperience = require("./level-and-experience")
const ArmorClass = require("./armor-class")
const HitPoints = require("./hit-points")

const CLASS_FEATURES = require('./data')

class Hero {
  constructor() {
    this._name = new Name(this)
    this._alignment = "Neutral"
    this._class = "None"
    this._str = new Ability()
    this._dex = new Ability()
    this._con = new Ability()
    this._levelAndXp = new LevelAndExperience(this)
    this._ac = new ArmorClass(this)
    this._hp = new HitPoints(this)
  }

  get name() { return this._name.value }
  set name(name) { this._name.value = name }

  get level() { return this._levelAndXp.level }
  get experiencePoints() { return this._levelAndXp.experiencePoints }

  get alignment() { return this._alignment }
  set alignment(alignment) { this._alignment = this.validateAlignment(alignment) }

  get class() { return this._class }
  set class(clazz) { this._class = this.validateClass(clazz) }

  get strength() { return this._str }
  get dexterity() { return this._dex }
  get constitution() { return this._con }

  get armorClass() { return this._ac.value }

  get hitPoints() { return this._hp.maximum }
  get currentHitPoints() { return this._hp.current }
  get isAlive() { return this._hp.isAlive }

  get attackModifier() {
    let modifier = this.class === 'Rogue' ? this.dexterity.modifier : this.strength.modifier
    return Math.floor(this.classFeatures().attackProgression * this.level) + modifier
  }

  get attackDamage() { return Math.max(1 + this.strength.modifier, 1) }
  get criticalDamage() { return Math.max((1 + this.strength.modifier) * this.classFeatures().critMultiplier, 1) }
  
  damage(points) { this._hp.addDamage(points) }

  addExperience(amount) {
    this._levelAndXp.addExperience(amount)
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
