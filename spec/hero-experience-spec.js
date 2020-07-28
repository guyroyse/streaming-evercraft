const { Hero } = require('../evercraft')

describe("Hero", () => {

  let subject

  beforeEach(() => subject = new Hero())

  describe("#experiencePoints", () => {
    it("defaults to 0", () => expect(subject.experiencePoints).toBe(0))

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
