const { Hero } = require('../evercraft')

describe("Hero", () => {

  let subject

  beforeEach(() => subject = new Hero())

  describe("#armorClass", () => {

    let DEFAULTS = { attackerClass: 'None', defenderRace: 'Human', defenderClass: 'None', dex: 10, wis: 10, ac: 10 }

    describe("typical scenario", () => {
      it.each( [
        ["defaults to 10",                                     { ...DEFAULTS }],
        ["include dexterity modifier when hero is zippy",      { ...DEFAULTS, dex: 14, ac: 12 }],
        ["include dexterity modifier when hero is sluggish",   { ...DEFAULTS, dex: 6, ac: 8 }],
        ["when defender is an orc, +2 is added",               { ...DEFAULTS, defenderRace: 'Orc', ac: 12 }],
        ["when defender is a zippy orc, +2 is still added",    { ...DEFAULTS, defenderRace: 'Orc', dex: 14, ac: 14 }],
        ["when defender is a sluggish orc, +2 is still added", { ...DEFAULTS, defenderRace: 'Orc', dex: 6, ac: 10 }],
      ])("%s", (_, data) => validateArmorClass(data))
    })

    it.each([
      ["when hero is a wise old monk",                      { ...DEFAULTS, defenderClass: 'Monk', wis: 14, ac: 12 }],
      ["when hero is a wise and zippy monk",                { ...DEFAULTS, defenderClass: 'Monk', dex: 14, wis: 14, ac: 14 }],
      ["when hero is a wise and sluggish monk",             { ...DEFAULTS, defenderClass: 'Monk', dex: 6, wis: 14, ac: 10 }],
      ["when hero is a foolish old monk",                   { ...DEFAULTS, defenderClass: 'Monk', wis: 6, ac: 10 }],
      ["when hero is a foolish and zippy monk",             { ...DEFAULTS, defenderClass: 'Monk', dex: 14, wis: 6, ac: 12 }],
      ["when hero is a foolish and sluggish monk",          { ...DEFAULTS, defenderClass: 'Monk', dex: 6, wis: 6, ac: 8 }],
      ["when attacker is a rogue and the hero is zippy",    { ...DEFAULTS, attackerClass: 'Rogue', dex: 14, ac: 10 }],

      ["when attacker is a rogue and the hero is sluggish", 
        { ...DEFAULTS, attackerClass: 'Rogue', dex: 6, ac: 8 }],

      ["when attacker is a rogue and the hero is a wise old monk",
        { ...DEFAULTS, attackerClass: 'Rogue', defenderClass: 'Monk', wis: 14, ac: 10 }],

      ["when attacker is a rogue and the hero is a wise and zippy monk",
        { ...DEFAULTS, attackerClass: 'Rogue', defenderClass: 'Monk', dex: 14, wis: 14, ac: 10 }],

      ["when attacker is a rogue and the hero is a wise and sluggish monk",
        { ...DEFAULTS, attackerClass: 'Rogue', defenderClass: 'Monk', dex: 6, wis: 14, ac: 8 }],

      ["when attacker is a rogue and the hero is a foolish old monk",
        { ...DEFAULTS, attackerClass: 'Rogue', defenderClass: 'Monk', wis: 6, ac: 10 }],

      ["when attacker is a rogue and the hero is a foolish and zippy monk",
        { ...DEFAULTS, attackerClass: 'Rogue', defenderClass: 'Monk', dex: 14, wis: 6, ac: 10 }],

      ["when attacker is a rogue and the hero is a foolish and sluggish monk",
        { ...DEFAULTS, attackerClass: 'Rogue', defenderClass: 'Monk', dex: 6, wis: 6, ac: 8 }],

      ["when attacker is a rogue and the defender is an orc, +2 is still added",
        { ...DEFAULTS, attackerClass: 'Rogue', defenderRace: 'Orc', ac: 12 }],

      ["when attacker is a rogue and the defender is a zippy orc, +2 is still added",
        { ...DEFAULTS, attackerClass: 'Rogue', defenderRace: 'Orc', dex: 14, ac: 12 }],

      ["when attacker is a rogue and the defender is a sluggish orc, +2 is still added",
        { ...DEFAULTS, attackerClass: 'Rogue', defenderRace: 'Orc', dex: 6, ac: 10 }],

    ])("%s", (_, data) => validateArmorClass(data))

    function validateArmorClass(data) {
      let attacker = new Hero()
      makeClass(attacker, data.attackerClass)
      makeClass(subject, data.defenderClass)

      makeRace(subject, data.defenderRace)

      subject.dexterity.score = data.dex
      subject.wisdom.score = data.wis

      let actual = subject.armorClass(attacker)

      expect(actual).toBe(data.ac)
    }

  })
})
