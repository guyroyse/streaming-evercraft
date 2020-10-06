const DEFAULTS = { STR: 0, DEX: 0, CON: 0, INT: 0, WIS: 0, CHA: 0 }

const ABILITY_MODIFIERS = {
  Human: { ...DEFAULTS },
  Orc: { ...DEFAULTS, STR: +2, INT: -1, WIS: -1, CHA: -1 },
  Dwarf: { ...DEFAULTS, CON: +1, CHA: -1 },
}

class Ability {
  constructor(type, hero) {
    this._type = type
    this._hero = hero
    this._score = 10
  }

  get score() {
    return this._score
  }

  set score(score) {
    if (score > 20 || score < 1) throw "Score must be between 1 and 20 inclusive"
    this._score = score
  }

  get modifier() {
    return Math.floor((this._score - 10) / 2) + ABILITY_MODIFIERS[this._hero.race][this._type]
  }
}

module.exports = Ability
