const HP_PER_LEVEL = { None: 5, Fighter: 10, Rogue: 5, Monk: 6 }

class HitPoints {
  constructor(hero) {
    this._hero = hero
    this._damage = 0
  }

  get maximum() { 
    return Math.max(this.hpPerLevel + this.constitutionModifier, 1) * this.level
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

  get hpPerLevel() { return HP_PER_LEVEL[this.class] }
  get constitutionModifier() { return this._hero.constitution.modifier }
  get level() { return this._hero.level }
  get class() { return this._hero.class }

}

module.exports = HitPoints
