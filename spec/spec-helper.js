global.makeLevel = (hero, level) => {
  hero.addExperience((level - 1) * 1000)
}

global.makeClass = (hero, clazz) => {
  if (clazz === 'Paladin') hero.alignment = 'Good'
  if (clazz === 'Rogue') hero.alignment = 'Neutral'
  hero.class = clazz
}

global.makeRace = (hero, race) => {
  hero.race = race
}
