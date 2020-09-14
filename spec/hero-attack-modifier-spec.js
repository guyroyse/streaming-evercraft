const { Hero } = require('../evercraft')

describe("Hero", () => {

  let subject

  beforeEach(() => subject = new Hero())

  describe("#attackModifier", () => {

    let DEFAULTS = { class: 'None', level: 1, str: 10, dex: 10, opponentAlignment: 'Neutral' }

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
      ["defaults to 0 for monks",                     { ...DEFAULTS, class: 'Monk', attackModifier: +0 }],
      ["goes up on second level for monks",           { ...DEFAULTS, class: 'Monk', level: 2, attackModifier: +1 }],
      ["goes up on third level for monks",            { ...DEFAULTS, class: 'Monk', level: 3, attackModifier: +2 }],
      ["does not go up on fourth level for monks",    { ...DEFAULTS, class: 'Monk', level: 4, attackModifier: +2 }],
      ["goes up for strong, high-level monks",        { ...DEFAULTS, class: 'Monk', level: 10, str: 14, attackModifier: +8 }],
      ["defaults to 1 for paladins",                  { ...DEFAULTS, class: 'Paladin', attackModifier: +1 }],
      ["goes up every level for paladins",            { ...DEFAULTS, class: 'Paladin', level: 3, attackModifier: +3 }],
      ["goes up for strong, high-level paladins",     { ...DEFAULTS, class: 'Paladin', level: 4, str: 14, attackModifier: +6 }],
      ["does not go by an extra +2 when paladin is attacking good opponent", { ...DEFAULTS, class: 'Paladin', attackModifier: +1, opponentAlignment: 'Good' } ],
      ["goes up by an extra +2 when paladin is attacking evil opponent", { ...DEFAULTS, class: 'Paladin', attackModifier: +3, opponentAlignment: 'Evil' } ]
    ])("%s", (_, data) => {
      let defender = new Hero()
      defender.alignment = data.opponentAlignment

      makeLevel(subject, data.level)
      makeClass(subject, data.class)

      subject.strength.score = data.str
      subject.dexterity.score = data.dex
      expect(subject.attackModifier(defender)).toBe(data.attackModifier)
    })
  })
})
