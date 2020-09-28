const validator = require("./validator")

class Alignment {
  constructor(hero) {
    this._hero = hero
    this._alignment = "Neutral"
  }

  get value() {
    return this._alignment
  }

  set value(alignment) {
    validator.validateRaceClassAndAlignment(this.race, this.class, alignment)
    this._alignment = alignment
  }

  get race() { return this._hero.race }
  get class() { return this._hero.class }
}

module.exports = Alignment
