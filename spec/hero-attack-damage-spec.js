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
        ["defaults to 1",                        { ...DEFAULTS, attackDamage: 1 }],
        ["goes up when hero is beefy",           { ...DEFAULTS, str: 14, attackDamage: 3 }],
        ["is at least 1 regardless of strength", { ...DEFAULTS, str: 6, attackDamage: 1 }],
      ])("%s", (_, data) => validateAttackDamage(data))
    })

    describe("for Monk", () => {
      
      let DEFAULTS = { class: 'Monk', str: 10 , opponentAlignment: 'Neutral' }

      it.each([
        ["defaults to 3",                        { ...DEFAULTS, attackDamage: 3 }],
        ["goes up when monk is beefy",           { ...DEFAULTS, str: 14, attackDamage: 5 }],
        ["goes down when monk is wimpy",         { ...DEFAULTS, str: 6, attackDamage: 1 }],
        ["is at least 1 regardless of strength", { ...DEFAULTS, str: 1, attackDamage: 1 }],
      ])("%s", (_, data) => validateAttackDamage(data))
    })

    describe("for Paladin", () => {

      let DEFAULTS = { class: 'Paladin', str: 10, opponentAlignment: 'Neutral' }

      it.each([
        ["defaults to 1",                            { ...DEFAULTS, attackDamage: 1 }],
        ["goes up when paladin is beefy",            { ...DEFAULTS, str: 14, attackDamage: 3 }],
        ["goes up by +2 when opponent is evil",      { ...DEFAULTS, opponentAlignment: 'Evil', attackDamage: 3}],
        ["does not go up when opponent is good",     { ...DEFAULTS, opponentAlignment: 'Good', attackDamage: 1}],
        ["goes down with paladin is wimpy vs. evil", { ...DEFAULTS, str: 6, opponentAlignment: 'Evil', attackDamage: 1}],
        ["is at least 1 regardless of strength",     { ...DEFAULTS, str: 1, opponentAlignment: 'Evil', attackDamage: 1}],
      ])("%s", (_, data) => validateAttackDamage(data))
    })

    function validateAttackDamage(data) {
      let defender = new Hero()
      defender.alignment = data.opponentAlignment

      makeClass(subject, data.class)

      subject.strength.score = data.str
      expect(subject.attackDamage(defender)).toBe(data.attackDamage)
    }
  })


  describe("#criticalDamage", () => {
    it("default to 2", () => {
      expect(subject.criticalDamage(defender)).toBe(2)
    })

    it("goes up when hero is beefy", () => {
      subject.strength.score = 14
      expect(subject.criticalDamage(defender)).toBe(6)
    })

    it("cannot go below 1", () => {
      subject.strength.score = 6
      expect(subject.criticalDamage(defender)).toBe(1)
    })

    describe("when a rogue", () => {
      beforeEach(() => subject.class = 'Rogue')

      it("default to 3", () => {
        expect(subject.criticalDamage(defender)).toBe(3)
      })
  
      it("goes up when hero is beefy", () => {
        subject.strength.score = 14
        expect(subject.criticalDamage(defender)).toBe(9)
      })
  
      it("cannot go below 1", () => {
        subject.strength.score = 6
        expect(subject.criticalDamage(defender)).toBe(1)
      })  
    })

    describe("when a monk", () => {
      beforeEach(() => subject.class = 'Monk')

      it("default to 6", () => {
        expect(subject.criticalDamage(defender)).toBe(6)
      })
  
      it("goes up when hero is beefy", () => {
        subject.strength.score = 14
        expect(subject.criticalDamage(defender)).toBe(10)
      })
  
      it("cannot go below 1", () => {
        subject.strength.score = 1
        expect(subject.criticalDamage(defender)).toBe(1)
      })  
    })
  })
})
