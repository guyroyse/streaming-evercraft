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
  })
})
