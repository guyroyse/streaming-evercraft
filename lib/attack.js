class Attack {
  constructor(defender) {
    this._defender = defender
  }

  resolve(roll) {
    let hit = roll >= this._defender.armorClass
    let crit = roll === 20

    if (hit && crit) {
      this._defender.damage(2)
    } else if (hit) {
      this._defender.damage(1)
    }
    
    return hit
  }
}

module.exports = Attack
