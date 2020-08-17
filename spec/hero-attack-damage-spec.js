const { Hero } = require('../evercraft')

describe("Hero", () => {

  let subject

  beforeEach(() => subject = new Hero())

  describe("#attackDamage", () => {
    it("default to 1", () => {
      expect(subject.attackDamage).toBe(1)
    })

    it("goes up when hero is beefy", () => {
      subject.strength.score = 14
      expect(subject.attackDamage).toBe(3)
    })

    it("cannot go below 1", () => {
      subject.strength.score = 6
      expect(subject.attackDamage).toBe(1)
    })
  })

  describe("#criticalDamage", () => {
    it("default to 2", () => {
      expect(subject.criticalDamage).toBe(2)
    })

    it("goes up when hero is beefy", () => {
      subject.strength.score = 14
      expect(subject.criticalDamage).toBe(6)
    })

    it("cannot go below 1", () => {
      subject.strength.score = 6
      expect(subject.criticalDamage).toBe(1)
    })

    describe("when a rogue", () => {
      beforeEach(() => subject.class = 'Rogue')

      it("default to 3", () => {
        expect(subject.criticalDamage).toBe(3)
      })
  
      it("goes up when hero is beefy", () => {
        subject.strength.score = 14
        expect(subject.criticalDamage).toBe(9)
      })
  
      it("cannot go below 1", () => {
        subject.strength.score = 6
        expect(subject.criticalDamage).toBe(1)
      })  
    })
  })
})
