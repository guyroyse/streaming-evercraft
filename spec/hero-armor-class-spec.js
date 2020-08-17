const { Hero } = require('../evercraft')

describe("Hero", () => {

  let subject

  beforeEach(() => subject = new Hero())

  describe("#armorClass", () => {
    it("defaults to 10", () => {
      expect(subject.armorClass).toBe(10)
    })

    it("include dexterity modifier when hero is zippy", () => {
      subject.dexterity.score = 14
      expect(subject.armorClass).toBe(12)
    })

    it("include dexterity modifier when hero is sluggish", () => {
      subject.dexterity.score = 6
      expect(subject.armorClass).toBe(8)
    })
  })
})
