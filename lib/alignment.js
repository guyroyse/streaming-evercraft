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
    validator.validateClassAndAlignment(this.class, alignment)
    this._alignment = alignment
  }

  get class() { return this._hero.class }
}

module.exports = Alignment
