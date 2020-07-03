const { Attack, Hero } = require('../evercraft')

describe("Attack", () => {

  let subject, defender

  beforeEach(() => {
    defender = new Hero()
    subject = new Attack(defender)
  })

  describe.each([
    ["when a roll is less than armor class", { roll: 9, hits: false, points: 0 }],
    ["hits when roll meets armor class", { roll: 10, hits: true, points: 1 }],
    ["when a roll beats armor class", { roll: 11, hits: true, points: 1 }],
    ["when a roll is a natural 20", { roll: 20, hits: true, points: 2 }]
  ])("%s", (_, data) => {

    let previousHitPoints, defenderHit

    beforeEach(() => {
      previousHitPoints = defender.hitPoints
      defenderHit = subject.resolve(data.roll)
    })

    it(data.hits ? "hits" : "misses", () => {
      expect(defenderHit).toBe(data.hits)
    })

    it(`damages the defender for ${data.points} point(s)`, () => {
      expect(defender.hitPoints).toBe(previousHitPoints - data.points)
    })
  })
})
