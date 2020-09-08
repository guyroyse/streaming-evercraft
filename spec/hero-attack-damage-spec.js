const { Hero } = require('../evercraft')

describe("Hero", () => {

  let subject, defender

  beforeEach(() => {
    subject = new Hero()
    defender = new Hero()
  })

  describe("#attackDamage", () => {
    it("default to 1", () => {
      expect(subject.attackDamage(defender)).toBe(1)
    })

    it("goes up when hero is beefy", () => {
      subject.strength.score = 14
      expect(subject.attackDamage(defender)).toBe(3)
    })

    it("cannot go below 1", () => {
      subject.strength.score = 6
      expect(subject.attackDamage(defender)).toBe(1)
    })

    describe("when a monk", () => {
      beforeEach(() => subject.class = 'Monk')

      it("default to 3", () => {
        expect(subject.attackDamage(defender)).toBe(3)
      })
  
      it("goes up when hero is beefy", () => {
        subject.strength.score = 14
        expect(subject.attackDamage(defender)).toBe(5)
      })
  
      it("cannot go below 1", () => {
        subject.strength.score = 1
        expect(subject.attackDamage(defender)).toBe(1)
      })  
    })
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
