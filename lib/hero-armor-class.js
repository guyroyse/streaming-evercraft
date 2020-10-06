const BASE_AC = 10

class ArmorClass {
  constructor(hero) {
    this._hero = hero
  }

  value = attacker => {
    let ac = BASE_AC

    ac += this.dexterityModifier

    if (this.class === 'Monk') ac += this.positiveWisdomModifier
    if (this.race === 'Orc') ac += 2

    if (attacker.class === 'Rogue') {
      if (this.dexterityModifier > 0) ac -= this.dexterityModifier
      if (this.class === 'Monk') ac -= this.positiveWisdomModifier
    }

    return ac
  }

  get race() { return this._hero.race }
  get class() { return this._hero.class }
  get dexterityModifier() { return this._hero.dexterity.modifier }
  get negativeDexterityModifier() { return Math.min(0, this.dexterityModifier) }
  get positiveWisdomModifier() { return Math.max(this._hero.wisdom.modifier, 0) }
}

module.exports = ArmorClass
