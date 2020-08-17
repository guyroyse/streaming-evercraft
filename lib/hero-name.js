class Name {
  constructor(hero) {
    this._hero = hero
    this._name = ""
  }

  get value() {
    return this._name
  }

  set value(name) {
    this._name = name
  }
}

module.exports = Name
