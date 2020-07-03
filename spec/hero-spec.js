const { Hero } = require('../evercraft')

describe("Hero", () => {

  let subject

  beforeEach(() => subject = new Hero())

  describe("#name", () => {
    it("defaults to empty string", () => {
      expect(subject.name).toBe("")
    })

    it("can be changed", () => {
      subject.name = "Essenbee"
      expect(subject.name).toBe("Essenbee")
    })
  })

  describe("#alignment", () => {
    it("defaults to Neutral", () => {
      expect(subject.alignment).toBe("Neutral")
    })

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

  describe("#armorClass", () => {
    it("defaults to 10", () => {
      expect(subject.armorClass).toBe(10)
    })
  })

  describe("#hitPoints", () => {
    it("defaults to 5", () => {
      expect(subject.hitPoints).toBe(5)
    })

    it("goes down when damaged", () => {
      subject.damage(3)
      expect(subject.hitPoints).toBe(2)
    })
  })

  describe("#isAlive", () => {
    it("default to true", () => {
      expect(subject.isAlive).toBe(true)
    })

    it("is still true when damaged", () => {
      subject.damage(3)
      expect(subject.isAlive).toBe(true)
    })

    it("is false when really damaged", () => {
      subject.damage(5)
      expect(subject.isAlive).toBe(false)
    })

    it("is false when really, really damaged", () => {
      subject.damage(6)
      expect(subject.isAlive).toBe(false)
    })
  })
})
