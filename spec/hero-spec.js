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

    it("include dexterity modifier when hero is zippy", () => {
      subject.dexterity.score = 14
      expect(subject.armorClass).toBe(12)
    })

    it("include dexterity modifier when hero is sluggish", () => {
      subject.dexterity.score = 6
      expect(subject.armorClass).toBe(8)
    })
  })

  describe("#hitPoints", () => {
    it("defaults to 5", () => {
      expect(subject.hitPoints).toBe(5)
    })

    it("goes up when hero is buff", () => {
      subject.constitution.score = 14
      expect(subject.hitPoints).toBe(7)
    })

    it("goes down when hero is sickly", () => {
      subject.constitution.score = 6
      expect(subject.hitPoints).toBe(3)
    })

    it("cannot goes below 0 because of constitution", () => {
      subject.constitution.score = 1
      expect(subject.hitPoints).toBe(1)
    })

    it("doesn't goes down when damaged", () => {
      subject.damage(3)
      expect(subject.hitPoints).toBe(5)
    })
  })

  describe("#currentHitPoints", () => {
    it("defaults to 5", () => {
      expect(subject.currentHitPoints).toBe(5)
    })

    it("goes down when damaged", () => {
      subject.damage(3)
      expect(subject.currentHitPoints).toBe(2)
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

  describe("#attackModifier", () => {
    it("default to 0", () => {
      expect(subject.attackModifier).toBe(0)
    })

    it("goes up when hero is beefy", () => {
      subject.strength.score = 14
      expect(subject.attackModifier).toBe(+2)
    })

    it("goes down when here is wimpy", () => {
      subject.strength.score = 6
      expect(subject.attackModifier).toBe(-2)
    })
  })

  describe("#attackDamage", () => {
    it("default to 1", () => {
      expect(subject.attackDamage).toBe(1)
    })

    it("goes up when hero is beefy", () => {
      subject.strength.score = 14
      expect(subject.attackDamage).toBe(3)
    })

    it("cannot go below 1", () => {
      subject.strength.score = 6
      expect(subject.attackDamage).toBe(1)
    })
  })

  describe("#criticalDamage", () => {
    it("default to 2", () => {
      expect(subject.criticalDamage).toBe(2)
    })

    it("goes up when hero is beefy", () => {
      subject.strength.score = 14
      expect(subject.criticalDamage).toBe(6)
    })

    it("cannot go below 1", () => {
      subject.strength.score = 6
      expect(subject.criticalDamage).toBe(1)
    })
  })

  describe("#experiencePoints", () => {
    it("defaults to 0", () => {
      expect(subject.experiencePoints).toBe(0)
    })

    it("goes up when experience is added", () => {
      subject.addExperience(50)
      expect(subject.experiencePoints).toBe(50)
    })

    it("goes up when experience is added more than once", () => {
      subject.addExperience(50)
      subject.addExperience(150)
      expect(subject.experiencePoints).toBe(200)
    })
  })

})
