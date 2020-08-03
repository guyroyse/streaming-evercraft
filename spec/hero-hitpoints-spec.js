const { Hero } = require('../evercraft')

describe("Hero", () => {

  let subject

  beforeEach(() => subject = new Hero())

  describe("#hitPoints", () => {

    it.each([
      ["defaults to 5", { level: 1, con: 10, hp: 5 }],
      ["goes up when hero is buff", { level: 1, con: 14, hp: 7 }],
      ["goes down when hero is sickly", { level: 1, con: 6, hp: 3 }],
      ["cannot go below 0 because of constitution", { level: 1, con: 1, hp: 1 }],
      ["goes up with levels", { level: 3, con: 10, hp: 15 }],
      ["goes up with levels and buffitude", { level: 3, con: 14, hp: 21 }],
      ["still goes up with levels even if sickly", { level: 3, con: 6, hp: 9 }],
      ["increases by at least 1 hp per level", { level: 3, con: 1, hp: 3 }]
    ])("%s", (_, data) => {
      makeLevel(subject, data.level)
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
