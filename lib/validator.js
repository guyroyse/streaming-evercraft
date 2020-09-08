const CLASSES = ['None', 'Fighter', 'Rogue', 'Monk', 'Paladin']
const ALIGNMENTS = ['Good', 'Neutral', 'Evil']

function validateClassAndAlignment(clazz, alignment) {
  validateInList(CLASSES, clazz, `'${clazz}' is not a class`)
  validateInList(ALIGNMENTS, alignment, `'${alignment}' is not an alignment`)
  if (clazz === 'Rogue' && alignment === 'Good') throw "Rogues cannot be Good"
  if (clazz === 'Paladin' && alignment !== 'Good') throw "Paladins must be Good"
}

function validateInList(list, value, error) {
  if (!list.includes(value)) throw error
}

module.exports = { validateClassAndAlignment }
