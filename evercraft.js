class Hero {
  constructor() {
    this._name = ""
  }

  get name() {
    return this._name
  }

  set name(name) {
    this._name = name
  }
}

module.exports = { Hero }
