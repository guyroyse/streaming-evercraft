const XP_PER_LEVEL = 1000

class LevelAndExperience {
  constructor(hero) {
    this._hero = hero
    this._xp = 0
  }

  get level() {
    return Math.floor(this._hero.experiencePoints / XP_PER_LEVEL) + 1
  }

  get experiencePoints() {
    return this._xp
  }

  addExperience(amount) {
    this._xp += amount
  }
}

module.exports = LevelAndExperience
