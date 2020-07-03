class Ability {
  constructor() {
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
    return Math.floor((this._score - 10) / 2)
  }
}

module.exports = Ability
