const CLASS_FEATURES = require('./data')

class AttackDamage {
  constructor(hero) {
    this._hero = hero
  }

  get normal() {
    return Math.max(1 + this._hero.strength.modifier, 1)
  }

  get critical() {
    return Math.max((1 + this._hero.strength.modifier) * this.classFeatures().critMultiplier, 1)
  }

  classFeatures() {
    return CLASS_FEATURES[this._hero.class]
  }
}

module.exports = AttackDamage
