const XP_PER_LEVEL = 1000

class Level {
  constructor(hero) {
    this._hero = hero
  }

  get level() {
    return Math.floor(this._hero.experiencePoints / XP_PER_LEVEL) + 1
  }
}

module.exports = Level

