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

    describe("when hero is a monk", () => {
      beforeEach(() => subject.class = 'Monk') 

      describe("and is very wise", () => {
        beforeEach(() => subject.wisdom.score = 14) 

        it("add wisdom modifier to armor class", () => {
          expect(subject.armorClass).toBe(12)
        })

        it("include dexterity modifier when hero is zippy", () => {
          subject.dexterity.score = 14
          expect(subject.armorClass).toBe(14)
        })
    
        it("include dexterity modifier when hero is sluggish", () => {
          subject.dexterity.score = 6
          expect(subject.armorClass).toBe(10)
        })
      })

      describe("and is a bit foolish", () => {
        beforeEach(() => subject.wisdom.score = 6)

        it("add does not apply wisdom penalty to armor class", () => {
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
  })
})
