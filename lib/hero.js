const Name = require("./hero-name")
const Alignment = require("./hero-alignment")
const Class = require("./hero-class")
const Ability = require("./ability")
const LevelAndExperience = require("./hero-level-and-experience")
const ArmorClass = require("./hero-armor-class")
const HitPoints = require("./hero-hit-points")
const AttackModifier = require("./hero-attack-modifier")
const AttackDamage = require("./hero-attack-damage")

class Hero {
  constructor() {
    this._name = new Name(this)
    this._levelAndXp = new LevelAndExperience(this)
    this._alignment = new Alignment(this)
    this._class = new Class(this)
    this._str = new Ability()
    this._dex = new Ability()
    this._con = new Ability()
    this._wis = new Ability()
    this._ac = new ArmorClass(this)
    this._hp = new HitPoints(this)
    this._attackModifier = new AttackModifier(this)
    this._attackDamage = new AttackDamage(this)
  }

  get name()               { return this._name.value }
  get level()              { return this._levelAndXp.level }
  get experiencePoints()   { return this._levelAndXp.experiencePoints }
  get alignment()          { return this._alignment.value }
  get class()              { return this._class.value }
  get strength()           { return this._str }
  get dexterity()          { return this._dex }
  get constitution()       { return this._con }
  get wisdom()             { return this._wis }
  get hitPoints()          { return this._hp.maximum }
  get currentHitPoints()   { return this._hp.current }
  get isAlive()            { return this._hp.isAlive }

  set name(name)           { this._name.value = name }
  set alignment(alignment) { this._alignment.value = alignment }
  set class(clazz)         { this._class.value = clazz }

  attackModifier           = defender => this._attackModifier.value(defender)
  attackDamage             = defender => this._attackDamage.normal(defender)
  criticalDamage           = defender => this._attackDamage.critical(defender)
  armorClass               = attacker => this._ac.value(attacker)
  damage                   = points => this._hp.addDamage(points)
  addExperience            = amount => this._levelAndXp.addExperience(amount)
}

module.exports = Hero
