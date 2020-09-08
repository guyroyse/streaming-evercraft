const CRITICAL_ROLL = 20
const XP_PER_ATTACK = 10

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
    return roll + this._attacker.attackModifier(this._defender) >= this._defender.armorClass(this._attacker)

  }

  isCritical(roll) {
    return roll === CRITICAL_ROLL
  }

  applyDamage(hit, crit) {
    if (crit) {
      this._defender.damage(this._attacker.criticalDamage(this._defender))
    } else if (hit) {
      this._defender.damage(this._attacker.attackDamage(this._defender))
    }
  }

  applyExperience() {
    this._attacker.addExperience(XP_PER_ATTACK)
  }
}

module.exports = Attack
