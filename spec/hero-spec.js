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

  describe("#attackModifier", () => {

    it.each([
      ["defaults to 0", { xp: 0, str: 10, attackModifier: 0 }],
      ["goes up when hero is beefy", { xp: 0, str: 14, attackModifier: +2 }],
      ["goes down when hero is wimpy", { xp: 0, str: 6, attackModifier: -2 }],
      ["goes up on even levels", { xp: 1000, str: 10, attackModifier: +1 }],
      ["does not go up with odd levels", { xp: 2000, str: 10, attackModifier: +1 }],
      ["goes up more on higher even levels", { xp: 3000, str: 10, attackModifier: +2 }],
      ["goes up with levels and beefitude", { xp: 3000, str: 14, attackModifier: +4 }],
      ["goes up with levels and down with wimpiness", { xp: 3000, str: 6, attackModifier: 0 }]
    ])("%s", (_, data) => {
      subject.addExperience(data.xp)
      subject.strength.score = data.str
      expect(subject.attackModifier).toBe(data.attackModifier)
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
})
