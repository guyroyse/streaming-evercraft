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

    describe("when hero is good", () => {
      beforeEach(() => subject.alignment = 'Good')

      it.each([
        ['Human'],
        ['Orc'],
        ['Dwarf'],
        ['Elf'],
        ['Halfling'],
      ])("can be a %s", (race) => {
        subject.race = race
        expect(subject.race).toBe(race)
      })
    })

    describe("when hero is neutral", () => {
      beforeEach(() => subject.alignment = 'Neutral')

      it.each([
        ['Human'],
        ['Orc'],
        ['Dwarf'],
        ['Elf'],
        ['Halfling'],
      ])("can be a %s", (race) => {
        subject.race = race
        expect(subject.race).toBe(race)
      })
    })

    describe("when hero is evil", () => {
      beforeEach(() => subject.alignment = 'Evil')

      it.each([
        ['Human'],
        ['Orc'],
        ['Dwarf'],
        ['Elf'],
      ])("can be a %s", (race) => {
        subject.race = race
        expect(subject.race).toBe(race)
      })

      it("cannot be a Halfling", () => {
        expect(() => subject.race = "Halfling").toThrow("Halflings cannot be Evil")
      })
    })
  })
})
