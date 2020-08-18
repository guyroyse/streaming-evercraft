const { Hero } = require('../evercraft')

describe("Hero", () => {

  let subject

  beforeEach(() => subject = new Hero())

  describe("#hitPoints", () => {

    it.each( [
      ["defaults to 5",                              { class: 'None',    level: 1, con: 10, hp:  5 }],
      ["goes up when hero is buff",                  { class: 'None',    level: 1, con: 14, hp:  7 }],
      ["goes down when hero is sickly",              { class: 'None',    level: 1, con:  6, hp:  3 }],
      ["cannot go below 0 because of constitution",  { class: 'None',    level: 1, con:  1, hp:  1 }],
      ["goes up with levels",                        { class: 'None',    level: 3, con: 10, hp: 15 }],
      ["goes up with levels and buffitude",          { class: 'None',    level: 3, con: 14, hp: 21 }],
      ["still goes up with levels even if sickly",   { class: 'None',    level: 3, con:  6, hp:  9 }],
      ["increases by at least 1 hp per level",       { class: 'None',    level: 3, con:  1, hp:  3 }],
      ["defaults to 10 for fighters",                { class: 'Fighter', level: 1, con: 10, hp: 10 }],
      ["goes up by 10 for each fighter level",       { class: 'Fighter', level: 3, con: 10, hp: 30 }],
      ["goes up more for buff, high-level fighters", { class: 'Fighter', level: 3, con: 14, hp: 36 }],
      ["defaults to 6 for monk",                     { class: 'Monk',    level: 1, con: 10, hp:  6 }],
      ["goes up by 6 for each monk level",           { class: 'Monk',    level: 3, con: 10, hp: 18 }],
      ["goes up more for buff, high-level monk",     { class: 'Monk',    level: 3, con: 14, hp: 24 }]
    ])("%s", (_, data) => {
      makeLevel(subject, data.level)
      subject.class = data.class
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
