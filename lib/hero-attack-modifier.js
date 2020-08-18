const ATTACK_PROGRESSION = { None: 1/2, Fighter: 1, Rogue: 1/2, Monk: 2/3 }
const ATTACK_ABILITY = { None: 'strength', Fighter: 'strength', Rogue: 'dexterity', Monk: 'strength' }

class AttackModifier {
  constructor(hero) {
    this._hero = hero
  }

  get value() {
    return Math.floor(this.attackProgression * this._hero.level) + this.abilityModifier
  }

  get attackProgression() { return ATTACK_PROGRESSION[this.class] }
  get level() { return this._hero.level }  
  get abilityModifier() { return this._hero[this.attackAbility].modifier }
  get attackAbility() { return ATTACK_ABILITY[this.class] }
  get class() { return this._hero.class }

}

module.exports = AttackModifier
