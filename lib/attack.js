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
    return roll + this._attacker.attackModifier >= this.defenderArmorClass
  }

  isCritical(roll) {
    return roll === CRITICAL_ROLL
  }

  applyDamage(hit, crit) {
    if (crit) {
      this._defender.damage(this._attacker.criticalDamage)
    } else if (hit) {
      this._defender.damage(this._attacker.attackDamage)
    }
  }

  applyExperience() {
    this._attacker.addExperience(XP_PER_ATTACK)
  }

  get defenderArmorClass() {
    if (this._attacker.class === 'Rogue') return this._defender.dexlessArmorClass
    return this._defender.armorClass
  }
}

module.exports = Attack
