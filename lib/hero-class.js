const validator = require("./validator")

class Class {
  constructor(hero) {
    this._hero = hero
    this._class = "None"
  }

  get value() {
    return this._class
  }

  set value(clazz) {
    validator.validateRaceClassAndAlignment(this.race, clazz, this.alignment)
    this._class = clazz
  }

  get race() { return this._hero.race }
  get alignment() { return this._hero.alignment }

}

module.exports = Class
