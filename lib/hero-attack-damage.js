const CRIT_MULTIPLIER = { None: 2, Fighter: 2, Rogue: 3, Monk: 2, Paladin: 2 }
const BASE_DAMAGE = { None: 1, Fighter: 1, Rogue: 1, Monk: 3, Paladin: 1 }

class AttackDamage {
  constructor(hero) {
    this._hero = hero
  }

  normal = defender => this.atLeastOne(this.unflooredDamage(defender))

  critical = defender => {
    let multiplier = this.isPaladinVsEvil(defender) ? 3 : this.multiplier
    return this.atLeastOne(this.unflooredDamage(defender) * multiplier)
  }

  unflooredDamage = defender => {
    let result = this.basePlusMod
    if (this.isPaladinVsEvil(defender)) result += 2
    return result
  }

  atLeastOne = (n) => Math.max(n, 1)
  isPaladinVsEvil = defender => this.class === 'Paladin' && defender.alignment === 'Evil'

  get basePlusMod() { return this.baseDamage + this.strengthModifier }
  get baseDamage() { return BASE_DAMAGE[this.class] }
  get strengthModifier() { return this._hero.strength.modifier }
  get multiplier() { return CRIT_MULTIPLIER[this.class] }
  get class() { return this._hero.class }

}

module.exports = AttackDamage
