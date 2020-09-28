const { Hero } = require('../evercraft')

describe("Hero", () => {

  let subject

  beforeEach(() => subject = new Hero())

  describe("#race", () => {
    it("defaults to 'Human", () => expect(subject.race).toBe("Human"))

    it("cannot be an invalid race", () => {
      expect(() => subject.race = "Fluffer Nutter")
        .toThrow("'Fluffer Nutter' is not a race")
    })

    it.each([
      ['Human'],
      ['Orc'],
    ])("can be a %s", (race) => {
      subject.race = race
      expect(subject.race).toBe(race)
    })

  })
})
