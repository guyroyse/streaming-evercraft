const DEFAULTS = { hpPerLevel:  5, attackProgression: 1/2, critMultiplier: 2 }

module.exports = {
  None:    { ...DEFAULTS },
  Fighter: { ...DEFAULTS, hpPerLevel: 10, attackProgression: 1 },
  Rogue:   { ...DEFAULTS, critMultiplier: 3 },
}
