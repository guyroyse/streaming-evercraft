const { Ability, Hero } = require('../evercraft')

describe("Ability", () => {

  let subject

  beforeEach(() => subject = new Ability('STR', new Hero()))

  describe("#score", () => {
    it("defaults to 10", () => expect(subject.score).toBe(10))

    it("can be changed", () => {
      subject.score = 15
      expect(subject.score).toBe(15)
    })

    it("cannot be more than 20",() => {
      expect(() => subject.score = 21)
        .toThrow("Score must be between 1 and 20 inclusive")
    })

    it("cannot be less than 1",() => {
      expect(() => subject.score = 0)
        .toThrow("Score must be between 1 and 20 inclusive")
    })
  })

  describe("#modifier", () => {
    test.each([
      [1,  -5], [2,  -4], [3,  -4], [4,  -3], [5,  -3],
      [6,  -2], [7,  -2], [8,  -1], [9,  -1], [10, +0],
      [11, +0], [12, +1], [13, +1], [14, +2], [15, +2],
      [16, +3], [17, +3], [18, +4], [19, +4], [20, +5]
    ])("score of %i has a modifier of %i", (score, modifier) => {
      subject.score = score
      expect(subject.modifier).toBe(modifier)
    })
  })
})
