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

    let DEFAULTS = { class: 'None', level: 1, str: 10, dex: 10 }

    it.each([
      ["defaults to 0",                               { ...DEFAULTS, attackModifier: 0 }],
      ["goes up when hero is beefy",                  { ...DEFAULTS, str: 14, attackModifier: +2 }],
      ["goes down when hero is wimpy",                { ...DEFAULTS, str: 6, attackModifier: -2 }],
      ["goes up on even levels",                      { ...DEFAULTS, level: 2, attackModifier: +1 }],
      ["does not go up with odd levels",              { ...DEFAULTS, level: 3, attackModifier: +1 }],
      ["goes up more on higher even levels",          { ...DEFAULTS, level: 4, attackModifier: +2 }],
      ["goes up with levels and beefitude",           { ...DEFAULTS, level: 4, str: 14, attackModifier: +4 }],
      ["defaults to 1 for fighters",                  { ...DEFAULTS, class: 'Fighter', attackModifier: +1 }],
      ["goes up every level for fighters",            { ...DEFAULTS, class: 'Fighter', level: 3, attackModifier: +3 }],
      ["goes up for strong, high-level fighters",     { ...DEFAULTS, class: 'Fighter', level: 4, str: 14, attackModifier: +6 }],
      ["defaults to 0 rogues",                        { ...DEFAULTS, class: 'Rogue', attackModifier: 0 }],
      ["does not go up when rogues are beefy",        { ...DEFAULTS, class: 'Rogue', str: 14, attackModifier: 0 }],
      ["does go up when rogues are fast",             { ...DEFAULTS, class: 'Rogue', str: 14, dex: 14, attackModifier: +2 }],
    ])("%s", (_, data) => {
      makeLevel(subject, data.level)
      subject.class = data.class
      subject.strength.score = data.str
      subject.dexterity.score = data.dex
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

    describe("when a rogue", () => {
      beforeEach(() => subject.class = 'Rogue')

      it("default to 3", () => {
        expect(subject.criticalDamage).toBe(3)
      })
  
      it("goes up when hero is beefy", () => {
        subject.strength.score = 14
        expect(subject.criticalDamage).toBe(9)
      })
  
      it("cannot go below 1", () => {
        subject.strength.score = 6
        expect(subject.criticalDamage).toBe(1)
      })  
    })
  })
})
