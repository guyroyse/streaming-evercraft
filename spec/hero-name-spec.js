const { Hero } = require('../evercraft')

describe("Hero", () => {

  let subject

  beforeEach(() => subject = new Hero())

  describe("#name", () => {
    it("defaults to empty string", () => expect(subject.name).toBe(""))

    it("can be changed", () => {
      subject.name = "Essenbee"
      expect(subject.name).toBe("Essenbee")
    })
  })
})
