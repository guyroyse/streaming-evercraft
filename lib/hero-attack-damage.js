const CRIT_MULTIPLIER = { None: 2, Fighter: 2, Rogue: 3, Monk: 2 }
const BASE_DAMAGE = { None: 1, Fighter: 1, Rogue: 1, Monk: 3 }

class AttackDamage {
  constructor(hero) {
    this._hero = hero
  }

  get normal() {
    return this.atLeastOne(this.basePlusMod)
  }

  get critical() {
    return this.atLeastOne(this.basePlusMod * this.multiplier)
  }

  atLeastOne = (n) => Math.max(n, 1)

  get basePlusMod() { return this.baseDamage + this.strengthModifier }
  get baseDamage() { return BASE_DAMAGE[this.class] }
  get strengthModifier() { return this._hero.strength.modifier }
  get multiplier() { return CRIT_MULTIPLIER[this.class] }
  get class() { return this._hero.class }
}

module.exports = AttackDamage
