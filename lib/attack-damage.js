const CRIT_MULTIPLIER = { None: 2, Fighter: 2, Rogue: 3 }

class AttackDamage {
  constructor(hero) {
    this._hero = hero
  }

  get normal() {
    return Math.max(1 + this._hero.strength.modifier, 1)
  }

  get critical() {
    return Math.max((1 + this.strengthModifier) * this.multiplier, 1)
  }

  get strengthModifier() { return this._hero.strength.modifier }
  get multiplier() { return CRIT_MULTIPLIER[this._hero.class] }
}

module.exports = AttackDamage
