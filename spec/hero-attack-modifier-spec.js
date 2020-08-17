const { Hero } = require('../evercraft')

describe("Hero", () => {

  let subject

  beforeEach(() => subject = new Hero())

  describe("#attackModifier", () => {

    let DEFAULTS = { class: 'None', level: 1, str: 10, dex: 10 }

    it.each([
      ["defaults to 0",                               { ...DEFAULTS, attackModifier: 0 }],
      ["goes up when hero is beefy",                  { ...DEFAULTS, str: 14, attackModifier: +2 }],
      ["goes down when hero is wimpy",                { ...DEFAULTS, str: 6, attackModifier: -2 }],
      ["goes up on even levels",                      { ...DEFAULTS, level: 2, attackModifier: +1 }],
      ["does not go up with odd levels",              { ...DEFAULTS, level: 3, attackModifier: +1 }],
      ["goes up more on higher even levels",          { ...DEFAULTS, level: 4, attackModifier: +2 }],
      ["goes up with levels and beefitude",           { ...DEFAULTS, level: 4, str: 14, attackModifier: +4 }],
      ["defaults to 1 for fighters",                  { ...DEFAULTS, class: 'Fighter', attackModifier: +1 }],
      ["goes up every level for fighters",            { ...DEFAULTS, class: 'Fighter', level: 3, attackModifier: +3 }],
      ["goes up for strong, high-level fighters",     { ...DEFAULTS, class: 'Fighter', level: 4, str: 14, attackModifier: +6 }],
      ["defaults to 0 rogues",                        { ...DEFAULTS, class: 'Rogue', attackModifier: 0 }],
      ["does not go up when rogues are beefy",        { ...DEFAULTS, class: 'Rogue', str: 14, attackModifier: 0 }],
      ["does go up when rogues are fast",             { ...DEFAULTS, class: 'Rogue', str: 14, dex: 14, attackModifier: +2 }],
    ])("%s", (_, data) => {
      makeLevel(subject, data.level)
      subject.class = data.class
      subject.strength.score = data.str
      subject.dexterity.score = data.dex
      expect(subject.attackModifier).toBe(data.attackModifier)
    })
  })
})
