const { Hero } = require('../evercraft')

describe("Hero", () => {

  let subject

  beforeEach(() => subject = new Hero())

  describe("#class", () => {
    it("defaults to 'None", () => expect(subject.class).toBe("None"))

    it.each([
      ['None'],
      ['Fighter'],
      ['Rogue'],
      ['Monk'],
      ['Paladin'],
    ])("can be %a s", (clazz) => {
      subject.class = clazz
      expect(subject.class).toBe(clazz)
    })

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
        expect(() => subject.class = "Rogue")
          .toThrow("Rogues cannot be 'Good'")
      })  
    })
  })
})
