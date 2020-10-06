const RACES = ['Human', 'Orc', 'Dwarf', 'Elf', 'Halfling']
const CLASSES = ['None', 'Fighter', 'Rogue', 'Monk', 'Paladin']
const ALIGNMENTS = ['Good', 'Neutral', 'Evil']

function validateRaceClassAndAlignment(race, clazz, alignment) {
  validateInList(RACES, race, `'${race}' is not a race`)
  validateInList(CLASSES, clazz, `'${clazz}' is not a class`)
  validateInList(ALIGNMENTS, alignment, `'${alignment}' is not an alignment`)
  if (clazz === 'Rogue' && alignment === 'Good') throw "Rogues cannot be Good"
  if (clazz === 'Paladin' && alignment !== 'Good') throw "Paladins must be Good"
  if (race === 'Halfling' && alignment === 'Evil') throw "Halflings cannot be Evil"
}

function validateInList(list, value, error) {
  if (!list.includes(value)) throw error
}

module.exports = { validateRaceClassAndAlignment }
