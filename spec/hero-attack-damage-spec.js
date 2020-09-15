const { Hero } = require('../evercraft')

describe("Hero", () => {

  let subject, defender

  beforeEach(() => {
    subject = new Hero()
    defender = new Hero()
  })

  describe("#attackDamage", () => {

    describe.each(['None', 'Fighter', 'Rogue'])("for %s", (clazz) => {

      let DEFAULTS = { class: clazz, str: 10, opponentAlignment: 'Neutral' }

      it.each([
        ["defaults to 1",                        { ...DEFAULTS, damage: 1 }],
        ["goes up when hero is beefy",           { ...DEFAULTS, str: 14, damage: 3 }],
        ["is at least 1 regardless of strength", { ...DEFAULTS, str: 6, damage: 1 }],
      ])("%s", (_, data) => validateAttackDamage(data))
    })

    describe("for Monk", () => {
      
      let DEFAULTS = { class: 'Monk', str: 10 , opponentAlignment: 'Neutral' }

      it.each([
        ["defaults to 3",                        { ...DEFAULTS, damage: 3 }],
        ["goes up when monk is beefy",           { ...DEFAULTS, str: 14, damage: 5 }],
        ["goes down when monk is wimpy",         { ...DEFAULTS, str: 6, damage: 1 }],
        ["is at least 1 regardless of strength", { ...DEFAULTS, str: 1, damage: 1 }],
      ])("%s", (_, data) => validateAttackDamage(data))
    })

    describe("for Paladin", () => {

      let DEFAULTS = { class: 'Paladin', str: 10, opponentAlignment: 'Neutral' }

      it.each([
        ["defaults to 1",                            { ...DEFAULTS, damage: 1 }],
        ["goes up when paladin is beefy",            { ...DEFAULTS, str: 14, damage: 3 }],
        ["goes up by +2 when opponent is evil",      { ...DEFAULTS, opponentAlignment: 'Evil', damage: 3}],
        ["does not go up when opponent is good",     { ...DEFAULTS, opponentAlignment: 'Good', damage: 1}],
        ["goes down with paladin is wimpy vs. evil", { ...DEFAULTS, str: 6, opponentAlignment: 'Evil', damage: 1}],
        ["is at least 1 regardless of strength",     { ...DEFAULTS, str: 1, damage: 1}],
      ])("%s", (_, data) => validateAttackDamage(data))
    })

    function validateAttackDamage(data) {
      let defender = new Hero()
      defender.alignment = data.opponentAlignment

      makeClass(subject, data.class)

      subject.strength.score = data.str
      expect(subject.attackDamage(defender)).toBe(data.damage)
    }
  })

  describe("#criticalDamage", () => {

    describe.each(['None', 'Fighter'])("for %s", (clazz) => {

      let DEFAULTS = { class: clazz, str: 10, opponentAlignment: 'Neutral' }

      it.each([
        ["defaults to 2",                        { ...DEFAULTS, damage: 2 }],
        ["goes up when hero is beefy",           { ...DEFAULTS, str: 14, damage: 6 }],
        ["is at least 1 regardless of strength", { ...DEFAULTS, str: 6, damage: 1 }],
      ])("%s", (_, data) => validateCriticalDamage(data))
    })

    describe("for Rogue", () => {
      
      let DEFAULTS = { class: 'Rogue', str: 10 , opponentAlignment: 'Neutral' }

      it.each([
        ["defaults to 3",                        { ...DEFAULTS, damage: 3 }],
        ["goes up when rogue is beefy",          { ...DEFAULTS, str: 14, damage: 9 }],
        ["is at least 1 regardless of strength", { ...DEFAULTS, str: 1, damage: 1 }],
      ])("%s", (_, data) => validateCriticalDamage(data))
    })

    describe("for Monk", () => {
      
      let DEFAULTS = { class: 'Monk', str: 10 , opponentAlignment: 'Neutral' }

      it.each([
        ["defaults to 6",                        { ...DEFAULTS, damage: 6 }],
        ["goes up when monk is beefy",           { ...DEFAULTS, str: 14, damage: 10 }],
        ["goes down when monk is wimpy",         { ...DEFAULTS, str: 6, damage: 2 }],
        ["is at least 1 regardless of strength", { ...DEFAULTS, str: 1, damage: 1 }],
      ])("%s", (_, data) => validateCriticalDamage(data))
    })

    describe("for Paladin", () => {

      let DEFAULTS = { class: 'Paladin', str: 10, opponentAlignment: 'Neutral' }

      it.each([
        ["defaults to 2",                              { ...DEFAULTS, damage: 2 }],
        ["goes up when paladin is beefy",              { ...DEFAULTS, str: 14, damage: 6 }],
        ["goes up by +2 and x3 when opponent is evil", { ...DEFAULTS, opponentAlignment: 'Evil', damage: 9}],
        ["does not go up when opponent is good",       { ...DEFAULTS, opponentAlignment: 'Good', damage: 2}],
        ["goes down when paladin is wimpy",            { ...DEFAULTS, str: 6, opponentAlignment: 'Evil', damage: 3}],
        ["is at least 1 regardless of strength",       { ...DEFAULTS, str: 1, damage: 1}],
      ])("%s", (_, data) => validateCriticalDamage(data))
    })

    function validateCriticalDamage(data) {
      let defender = new Hero()
      defender.alignment = data.opponentAlignment

      makeClass(subject, data.class)

      subject.strength.score = data.str
      expect(subject.criticalDamage(defender)).toBe(data.damage)
    }
  })
})
