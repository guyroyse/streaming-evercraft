class Attack {
  constructor(attacker, defender) {
    this._attacker = attacker
    this._defender = defender
  }

  resolve(roll) {
    let hit = this.isHit(roll)
    let crit = this.isCritical(roll)

    this.applyDamage(hit, crit)
    this.applyExperience()

    return hit
  }

  isHit(roll) {
    return roll + this._attacker.attackModifier >= this._defender.armorClass
  }

  isCritical(roll) {
    return roll === 20
  }

  applyDamage(hit, crit) {
    if (crit) {
      this._defender.damage(this._attacker.criticalDamage)
    } else if (hit) {
      this._defender.damage(this._attacker.attackDamage)
    }
  }

  applyExperience() {
    this._attacker.addExperience(10)
  }
}

module.exports = Attack
