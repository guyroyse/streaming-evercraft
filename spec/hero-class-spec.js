const { Hero } = require('../evercraft')

describe("Hero", () => {

  let subject

  beforeEach(() => subject = new Hero())

  describe("#class", () => {
    it("defaults to 'None", () => expect(subject.class).toBe("None"))

    it("cannot be an invalid class", () => {
      expect(() => subject.class = "Buffoon")
        .toThrow("'Buffoon' is not a class")
    })

    describe("when hero is good", () => {
      beforeEach(() => subject.alignment = 'Good')

      it.each([
        ['None'],
        ['Fighter'],
        ['Monk'],
        ['Paladin'],
      ])("can be %a s", (clazz) => {
        subject.class = clazz
        expect(subject.class).toBe(clazz)
      })
  
      it("cannot be a Rogue", () => {
        expect(() => subject.class = "Rogue").toThrow("Rogues cannot be Good")
      })  
    })

    describe("when hero is neutral", () => {
      beforeEach(() => subject.alignment = 'Neutral')

      it.each([
        ['None'],
        ['Fighter'],
        ['Rogue'],
        ['Monk']
      ])("can be %a s", (clazz) => {
        subject.class = clazz
        expect(subject.class).toBe(clazz)
      })
  
      it("cannot be a Paladin", () => {
        expect(() => subject.class = "Paladin").toThrow("Paladins must be Good")
      })  
    })

    describe("when hero is evil", () => {
      beforeEach(() => subject.alignment = 'Evil')

      it.each([
        ['None'],
        ['Fighter'],
        ['Rogue'],
        ['Monk']
      ])("can be %a s", (clazz) => {
        subject.class = clazz
        expect(subject.class).toBe(clazz)
      })
  
      it("cannot be a Paladin", () => {
        expect(() => subject.class = "Paladin").toThrow("Paladins must be Good")
      })  
    })
  })
})
