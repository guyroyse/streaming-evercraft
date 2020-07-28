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

  describe("#class", () => {
    it("defaults to 'None", () => {
      expect(subject.class).toBe("None")
    })

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

  describe("#hitPoints", () => {

    it.each([
      ["defaults to 5", { xp: 0, con: 10, hp: 5 }],
      ["goes up when hero is buff", { xp: 0, con: 14, hp: 7 }],
      ["goes down when hero is sickly", { xp: 0, con: 6, hp: 3 }],
      ["cannot go below 0 because of constitution", { xp: 0, con: 1, hp: 1 }],
      ["goes up with levels", { xp: 2000, con: 10, hp: 15 }],
      ["goes up with levels and buffitude", { xp: 2000, con: 14, hp: 21 }],
      ["still goes up level even if sickly", { xp: 2000, con: 6, hp: 9 }],
      ["has at least 1 hp per level", { xp: 2000, con: 1, hp: 3 }]
    ])("%s", (_, data) => {
      subject.addExperience(data.xp)
      subject.constitution.score = data.con
      expect(subject.hitPoints).toBe(data.hp)
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

  describe("#level", () => {
    it.each([
      [{ xp: 0, level: 1 }],
      [{ xp: 500, level: 1 }],
      [{ xp: 999, level: 1 }],
      [{ xp: 1000, level: 2 }],
      [{ xp: 1500, level: 2 }],
      [{ xp: 2000, level: 3 }],
      [{ xp: 5000, level: 6 }]
    ])("has expected value", (data) => {
      subject.addExperience(data.xp)
      expect(subject.level).toBe(data.level)
    })  
  })
})
