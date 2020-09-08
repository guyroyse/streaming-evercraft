const { Attack, Hero } = require('../evercraft')

describe("Attack", () => {

  let subject, attacker, defender
  let previousHitPoints

  beforeEach(() => {
    attacker = new Hero()
    defender = new Hero()
    subject = new Attack(attacker, defender)
  })

  describe.each([
    ["when a roll is less than armor class", { roll: 9, hits: false, points: 0 }],
    ["hits when roll meets armor class", { roll: 10, hits: true, points: 1 }],
    ["when a roll beats armor class", { roll: 11, hits: true, points: 1 }],
    ["when a roll is a natural 20", { roll: 20, hits: true, points: 2 }]
  ])("%s", (_, data) => {

    let defenderHit

    beforeEach(() => {
      previousHitPoints = defender.currentHitPoints
      defenderHit = subject.resolve(data.roll)
    })

    it(data.hits ? "hits" : "misses", () => expect(defenderHit).toBe(data.hits))

    it(`damages the defender for ${data.points} point(s)`, () => {
      expect(defender.currentHitPoints).toBe(previousHitPoints - data.points)
    })

    it("give the attacker 10 experience", () => expect(attacker.experiencePoints).toBe(10))
  })

  describe("when attacker is beefy", () => {

    beforeEach(() => {
      attacker.strength.score = 14
      previousHitPoints = defender.currentHitPoints
    })

    it("hits more easily", () => {
      defenderHit = subject.resolve(8)
      expect(defenderHit).toBe(true)
    })

    it("misses less easily", () => {
      defenderHit = subject.resolve(7)
      expect(defenderHit).toBe(false)
    })

    it("does more damage on a hit", () => {
      subject.resolve(8)
      expect(defender.currentHitPoints).toBe(previousHitPoints - 3)
    })

    it("does even more damage on a critical", () => {
      subject.resolve(20)
      expect(defender.currentHitPoints).toBe(previousHitPoints - 6)
    })
  })
})
