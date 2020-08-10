const CLASS_FEATURES = require('./data')

class HitPoints {
  constructor(hero) {
    this._hero = hero
    this._damage = 0
  }

  get maximum() { 
    return Math.max(this.classFeatures().hpPerLevel + this._hero.constitution.modifier, 1) * this._hero.level
  }

  get current() {
    return this.maximum - this._damage
  }

  get isAlive() {
    return this.current > 0
  }

  addDamage(points) {
    this._damage += points
  }

  classFeatures() {
    return CLASS_FEATURES[this._hero.class]
  }
}

module.exports = HitPoints
