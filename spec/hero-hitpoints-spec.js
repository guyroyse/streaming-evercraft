const { Hero } = require('../evercraft')

describe("Hero", () => {

  let subject

  beforeEach(() => subject = new Hero())

  describe("#hitPoints", () => {

    it.each([
      ["defaults to 5", { xp: 0, con: 10, hp: 5 }],
      ["goes up when hero is buff", { xp: 0, con: 14, hp: 7 }],
      ["goes down when hero is sickly", { xp: 0, con: 6, hp: 3 }],
      ["cannot go below 0 because of constitution", { xp: 0, con: 1, hp: 1 }],
      ["goes up with levels", { xp: 2000, con: 10, hp: 15 }],
      ["goes up with levels and buffitude", { xp: 2000, con: 14, hp: 21 }],
      ["still goes up with levels even if sickly", { xp: 2000, con: 6, hp: 9 }],
      ["increases by at least 1 hp per level", { xp: 2000, con: 1, hp: 3 }]
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

  describe.each([
    ["when undamaged", { damage: 0, hp: 5, alive: true }],
    ["when damaged", { damage: 4, hp: 1, alive: true }],
    ["when damaged to 0", { damage: 5, hp: 0, alive: false }],
    ["when damaged below 0", { damage: 6, hp: -1, alive: false }],
  ])("%s", (_, data) => {

    beforeEach(() => subject.damage(data.damage))

    it("has expected current hit points", () => expect(subject.currentHitPoints).toBe(data.hp))
    it("has expected liveliness", () => expect(subject.isAlive).toBe(data.alive))  

  })
})
