const CLASS_FEATURES = require('./data')

class AttackModifier {
  constructor(hero) {
    this._hero = hero
  }

  get value() {
    let modifier = this._hero.class === 'Rogue' ? this._hero.dexterity.modifier : this._hero.strength.modifier
    return Math.floor(this.classFeatures().attackProgression * this._hero.level) + modifier
  }

  classFeatures() {
    return CLASS_FEATURES[this._hero.class]
  }
}

module.exports = AttackModifier
