const validator = require("./validator")

class Race {
  constructor(hero) {
    this._hero = hero
    this._race = "Human"
  }

  get value() {
    return this._race
  }

  set value(race) {
    validator.validateRaceClassAndAlignment(race, this.class, this.alignment)
    this._race = race
  }

  get class() { return this._hero.class }
  get alignment() { return this._hero.alignment }

}

module.exports = Race
