class Attack {
  constructor(attacker, defender) {
    this._attacker = attacker
    this._defender = defender
  }

  resolve(roll) {
    let hit = roll + this._attacker.attackModifier >= this._defender.armorClass
    let crit = roll === 20

    if (crit) {
      this._defender.damage(this._attacker.criticalDamage)
    } else if (hit) {
      this._defender.damage(this._attacker.attackDamage)
    }
    
    return hit
  }
}

module.exports = Attack
