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
  get positiveWisdomModifier() { return Math.max(this.wisdomModifier, 0) }
  get dexterityModifier() { return this._hero.dexterity.modifier }
  get wisdomModifier() { return this._hero.wisdom.modifier }
}

module.exports = ArmorClass
