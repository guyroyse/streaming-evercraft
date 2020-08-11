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
    validator.validateClassAndAlignment(clazz, this.alignment)
    this._class = clazz
  }

  get alignment() { return this._hero.alignment }

}

module.exports = Class
