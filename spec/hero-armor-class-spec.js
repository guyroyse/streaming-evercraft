const { Hero } = require('../evercraft')

describe("Hero", () => {

  let subject

  beforeEach(() => subject = new Hero())

  describe("#armorClass", () => {

    let DEFAULTS = { attackerClass: 'None', defenderRace: 'Human', defenderClass: 'None', dex: 10, wis: 10 }

    describe("for normies", () => {
      it.each( [
        ["defaults to 10",                                                     { ...DEFAULTS, ac: 10 }],
        ["includes DEX when hero is zippy",                                    { ...DEFAULTS, dex: 14, ac: 12 }],
        ["includes DEX when hero is sluggish",                                 { ...DEFAULTS, dex: 6, ac: 8 }],
        ["doesn't include DEX when attacker is a rogue and the hero is zippy", { ...DEFAULTS, attackerClass: 'Rogue', dex: 14, ac: 10 }],
        ["includes DEX when attacker is a rogue and the hero is sluggish",     { ...DEFAULTS, attackerClass: 'Rogue', dex: 6, ac: 8 }],
        ])("%s", (_, data) => validateArmorClass(data))
    })

    describe("for orcs", () => {
      let ORC = { ...DEFAULTS, defenderRace: 'Orc' }
      it.each( [
        ["adds +2 to default",                         { ...ORC, ac: 12 }],
        ["includes DEX when zippy",                    { ...ORC, dex: 14, ac: 14 }],
        ["includes DEX when sluggish",                 { ...ORC, dex: 6, ac: 10 }],
        ["includes +2 bonus vs. a rogue",              { ...ORC, attackerClass: 'Rogue', ac: 12 }],
        ["doesn't include DEX when zippy vs. a rogue", { ...ORC, attackerClass: 'Rogue', dex: 14, ac: 12 }],
        ["includes DEX when sluggish vs. a rogue",     { ...ORC, attackerClass: 'Rogue', dex: 6, ac: 10 }],
      ])("%s", (_, data) => validateArmorClass(data))
    })

    describe("for monks", () => {
      let MONK = { ...DEFAULTS, defenderClass: 'Monk' }
      it.each( [
        ["defaults to 10",                                                 { ...MONK, ac: 10 }],
        ["includes DEX when zippy",                                        { ...MONK, dex: 14, ac: 12 }],
        ["includes DEX when sluggish",                                     { ...MONK, dex: 6, ac: 8 }],
        ["includes WIS when wise",                                         { ...MONK, wis: 14, ac: 12 }],
        ["doesn't include WIS foolish",                                    { ...MONK, wis: 6, ac: 10 }],
        ["includes DEX and WIS when zippy and wise",                       { ...MONK, dex: 14, wis: 14, ac: 14 }],
        ["includes DEX only when zippy and foolish",                       { ...MONK, dex: 14, wis: 6, ac: 12 }],
        ["includes DEX and WIS when sluggish and wise",                    { ...MONK, dex: 6, wis: 14, ac: 10 }],
        ["includes DEX only when sluggish and foolish",                    { ...MONK, dex: 6, wis: 6, ac: 8 }],
        ["doesn't include DEX when zippy vs. a rogue",                     { ...MONK, attackerClass: 'Rogue', dex: 14, ac: 10 }],
        ["includes DEX when sluggish vs. a rogue",                         { ...MONK, attackerClass: 'Rogue', dex: 6, ac: 8 }],
        ["doesn't include WIS when wise vs. a rogue",                      { ...MONK, attackerClass: 'Rogue', wis: 14, ac: 10 }],
        ["doesn't include WIS when foolish vs. a rogue",                   { ...MONK, attackerClass: 'Rogue', wis: 6, ac: 10 }],
        ["doesn't include DEX nor WIS when zippy and wise vs. a rogue",    { ...MONK, attackerClass: 'Rogue', dex: 14, wis: 14, ac: 10 }],
        ["doesn't include DEX when zippy and foolish vs. a rogue",         { ...MONK, attackerClass: 'Rogue', dex: 14, wis: 6, ac: 10 }],
        ["doesn't include DEX and WIS when sluggish and wise vs. a rogue", { ...MONK, attackerClass: 'Rogue', dex: 6, wis: 14, ac: 8 }],
        ["includes DEX when sluggish and foolish vs. a rogue",             { ...MONK, attackerClass: 'Rogue', dex: 6, wis: 6, ac: 8 }],
      ])("%s", (_, data) => validateArmorClass(data))
    })

    describe("for orcish monks", () => {
      let ORCISH_MONK = { ...DEFAULTS, defenderRace: 'Orc', defenderClass: 'Monk' }
      it.each( [
        ["adds +2 to default",                                               { ...ORCISH_MONK, ac: 12 }],
        ["include DEX when zippy",                                           { ...ORCISH_MONK, dex: 14, ac: 14 }],
        ["include DEX when sluggish",                                        { ...ORCISH_MONK, dex: 6, ac: 10 }],
        ["include WIS-1 when wise",                                          { ...ORCISH_MONK, wis: 14, ac: 13 }],
        ["doesn't include WIS when foolish",                                 { ...ORCISH_MONK, wis: 6, ac: 12 }],
        ["include DEX and WIS-1 when zippy and wise",                        { ...ORCISH_MONK, dex: 14, wis: 14, ac: 15 }],
        ["include DEX only when zippy and foolish",                          { ...ORCISH_MONK, dex: 14, wis: 6, ac: 14 }],
        ["include DEX and WIS-1 when sluggish and wise",                     { ...ORCISH_MONK, dex: 6, wis: 14, ac: 11 }],
        ["include DEX only when sluggish and foolish",                       { ...ORCISH_MONK, dex: 6, wis: 6, ac: 10 }],
        ["doesn't include DEX when zippy vs. a rogue",                       { ...ORCISH_MONK, attackerClass: 'Rogue', dex: 14, ac: 12 }],
        ["includes DEX when sluggish vs. a rogue",                           { ...ORCISH_MONK, attackerClass: 'Rogue', dex: 6, ac: 10 }],
        ["doesn't include WIS when wise vs. a rogue",                        { ...ORCISH_MONK, attackerClass: 'Rogue', wis: 14, ac: 12 }],
        ["doesn't include WIS when foolish vs. a rogue",                     { ...ORCISH_MONK, attackerClass: 'Rogue', wis: 6, ac: 12 }],
        ["doesn't include DEX nor WIS when zippy and wise vs. a rogue",      { ...ORCISH_MONK, attackerClass: 'Rogue', dex: 14, wis: 14, ac: 12 }],
        ["doesn't include DEX when zippy and foolish vs. a rogue",           { ...ORCISH_MONK, attackerClass: 'Rogue', dex: 14, wis: 6, ac: 12 }],
        ["doesn't include DEX and WIS-1 when sluggish and wise vs. a rogue", { ...ORCISH_MONK, attackerClass: 'Rogue', dex: 6, wis: 14, ac: 10 }],
        ["includes DEX when sluggish and foolish vs. a rogue",               { ...ORCISH_MONK, attackerClass: 'Rogue', dex: 6, wis: 6, ac: 10 }],
      ])("%s", (_, data) => validateArmorClass(data))
    })

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
