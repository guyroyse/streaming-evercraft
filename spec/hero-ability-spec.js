const { Hero } = require('../evercraft')

describe("Hero", () => {

  let subject

  beforeEach(() => subject = new Hero())

  describe("when an Orc", () => {

    let DEFAULTS = { race: 'Orc', score: 10, modifier: 0 }

    it.each([
      ["adds +2 to strength",                              { ...DEFAULTS, ability: 'strength', modifier: +2 }],
      ["adds +2 to it's strength modifier when strong",    { ...DEFAULTS, ability: 'strength', score: 14, modifier: +4 }],
      ["adds +2 to it's strength modifier when weak"  ,    { ...DEFAULTS, ability: 'strength', score: 6, modifier: 0 }],
      ["adds -1 to it's intelligence modifier",            { ...DEFAULTS, ability: 'intelligence', modifier: -1 }],
      ["adds -1 to it's intelligence modifier when smart", { ...DEFAULTS, ability: 'intelligence', score: 14, modifier: +1 }],
      ["adds -1 to it's intelligence modifier when dull",  { ...DEFAULTS, ability: 'intelligence', score: 6, modifier: -3 }],
      ["adds -1 to it's wisdom modifier",                  { ...DEFAULTS, ability: 'wisdom', modifier: -1 }],
      ["adds -1 to it's wisdom modifier when smart",       { ...DEFAULTS, ability: 'wisdom', score: 14, modifier: +1 }],
      ["adds -1 to it's wisdom modifier when dull",        { ...DEFAULTS, ability: 'wisdom', score: 6, modifier: -3 }],
      ["adds -1 to it's charisma modifier",                { ...DEFAULTS, ability: 'charisma', modifier: -1 }],
      ["adds -1 to it's charisma modifier when smart",     { ...DEFAULTS, ability: 'charisma', score: 14, modifier: +1 }],
      ["adds -1 to it's charisma modifier when dull",      { ...DEFAULTS, ability: 'charisma', score: 6, modifier: -3 }],
    ])("%s", (_, data) => validateAbilityModifier(data))

  })

  function validateAbilityModifier(data) {
    makeRace(subject, data.race)

    subject[data.ability].score = data.score
    expect(subject[data.ability].modifier).toBe(data.modifier)
  }
})
