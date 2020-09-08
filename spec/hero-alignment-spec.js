const { Hero } = require('../evercraft')

describe("Hero", () => {

  let subject

  beforeEach(() => subject = new Hero())

  describe("#alignment", () => {
    it("defaults to Neutral", () => expect(subject.alignment).toBe("Neutral"))

    it.each([
      ['Good'],
      ['Neutral'],
      ['Evil']
    ])("can be %s", (alignment) => {
      subject.alignment = alignment
      expect(subject.alignment).toBe(alignment)
    })

    it("cannot be an invalid alignment", () => {
      expect(() => subject.alignment = "Chaotic STOOPID!")
        .toThrow("'Chaotic STOOPID!' is not an alignment")
    })

    describe("when hero is a Rogue", () => {
      beforeEach(() => subject.class = 'Rogue')

      it.each([
        ['Neutral'],
        ['Evil']
      ])("can be %s", (alignment) => {
        subject.alignment = alignment
        expect(subject.alignment).toBe(alignment)
      })

      it("cannot be 'Good'", () => {
        expect(() => subject.alignment = "Good").toThrow("Rogues cannot be Good")
      })
    })

    describe("when hero is a Paladin", () => {
      beforeEach(() => {
        subject.alignment = 'Good'
        subject.class = 'Paladin'
      })

      it.each([
        ['Neutral'],
        ['Evil']
      ])("cannot be %s", (alignment) => {
        expect(() => subject.alignment = alignment).toThrow("Paladins must be Good")
      })

      it("can be 'Good'", () => {
        subject.alignment = 'Good'
        expect(subject.alignment).toBe('Good')
      })
    })
  })
})
