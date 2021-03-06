const { Hero } = require('../evercraft')

describe("Hero", () => {

  let subject

  let DEFAULTS = { score: 10, modifier: 0 }

  beforeEach(() => subject = new Hero())

  describe("when a Human", () => {

    let HUMAN = { ...DEFAULTS, race: 'Human' }

    it.each([
      ["doesn't modify STR modifier",               { ...HUMAN, ability: 'strength', modifier: 0 }],
      ["doesn't modify STR modifier when strong",   { ...HUMAN, ability: 'strength', score: 14, modifier: +2 }],
      ["doesn't modify STR modifier when weak"  ,   { ...HUMAN, ability: 'strength', score: 6, modifier: -2 }],
      ["doesn't modify DEX modifier",               { ...HUMAN, ability: 'dexterity', modifier: 0 }],
      ["doesn't modify DEX modifier when zippy",    { ...HUMAN, ability: 'dexterity', score: 14, modifier: +2 }],
      ["doesn't modify DEX modifier when sluggish", { ...HUMAN, ability: 'dexterity', score: 6, modifier: -2 }],
      ["doesn't modify CON modifier",               { ...HUMAN, ability: 'constitution', modifier: 0 }],
      ["doesn't modify CON modifier when hale",     { ...HUMAN, ability: 'constitution', score: 14, modifier: +2 }],
      ["doesn't modify CON modifier when sickly",   { ...HUMAN, ability: 'constitution', score: 6, modifier: -2 }],
      ["doesn't modify INT modifier",               { ...HUMAN, ability: 'intelligence', modifier: 0 }],
      ["doesn't modify INT modifier when smart",    { ...HUMAN, ability: 'intelligence', score: 14, modifier: +2 }],
      ["doesn't modify INT modifier when dull",     { ...HUMAN, ability: 'intelligence', score: 6, modifier: -2 }],
      ["doesn't modify WIS modifier",               { ...HUMAN, ability: 'wisdom', modifier: 0 }],
      ["doesn't modify WIS modifier when smart",    { ...HUMAN, ability: 'wisdom', score: 14, modifier: +2 }],
      ["doesn't modify WIS modifier when dull",     { ...HUMAN, ability: 'wisdom', score: 6, modifier: -2 }],
      ["doesn't modify CHA modifier",               { ...HUMAN, ability: 'charisma', modifier: 0 }],
      ["doesn't modify CHA modifier when smart",    { ...HUMAN, ability: 'charisma', score: 14, modifier: +2 }],
      ["doesn't modify CHA modifier when dull",     { ...HUMAN, ability: 'charisma', score: 6, modifier: -2 }],
    ])("%s", (_, data) => validateAbilityModifier(data))
  })

  describe("when an Orc", () => {

    let ORC = { ...DEFAULTS, race: 'Orc' }

    it.each([
      ["adds +2 to STR modifier",                   { ...ORC, ability: 'strength', modifier: +2 }],
      ["adds +2 to STR modifier when strong",       { ...ORC, ability: 'strength', score: 14, modifier: +4 }],
      ["adds +2 to STR modifier when weak"  ,       { ...ORC, ability: 'strength', score: 6, modifier: 0 }],
      ["doesn't modify DEX modifier",               { ...ORC, ability: 'dexterity', modifier: 0 }],
      ["doesn't modify DEX modifier when zippy",    { ...ORC, ability: 'dexterity', score: 14, modifier: +2 }],
      ["doesn't modify DEX modifier when sluggish", { ...ORC, ability: 'dexterity', score: 6, modifier: -2 }],
      ["doesn't modify CON modifier",               { ...ORC, ability: 'constitution', modifier: 0 }],
      ["doesn't modify CON modifier when hale",     { ...ORC, ability: 'constitution', score: 14, modifier: +2 }],
      ["doesn't modify CON modifier when sickly",   { ...ORC, ability: 'constitution', score: 6, modifier: -2 }],
      ["adds -1 to INT modifier",                   { ...ORC, ability: 'intelligence', modifier: -1 }],
      ["adds -1 to INT modifier when smart",        { ...ORC, ability: 'intelligence', score: 14, modifier: +1 }],
      ["adds -1 to INT modifier when dull",         { ...ORC, ability: 'intelligence', score: 6, modifier: -3 }],
      ["adds -1 to WIS modifier",                   { ...ORC, ability: 'wisdom', modifier: -1 }],
      ["adds -1 to WIS modifier when smart",        { ...ORC, ability: 'wisdom', score: 14, modifier: +1 }],
      ["adds -1 to WIS modifier when dull",         { ...ORC, ability: 'wisdom', score: 6, modifier: -3 }],
      ["adds -1 to CHA modifier",                   { ...ORC, ability: 'charisma', modifier: -1 }],
      ["adds -1 to CHA modifier when smart",        { ...ORC, ability: 'charisma', score: 14, modifier: +1 }],
      ["adds -1 to CHA modifier when dull",         { ...ORC, ability: 'charisma', score: 6, modifier: -3 }],
    ])("%s", (_, data) => validateAbilityModifier(data))
  })

  describe("when a Dwarf", () => {

    let DWARF = { ...DEFAULTS, race: 'Dwarf' }

    it.each([
      ["doesn't modify STR modifier",               { ...DWARF, ability: 'strength', modifier: 0 }],
      ["doesn't modify STR modifier when strong",   { ...DWARF, ability: 'strength', score: 14, modifier: +2 }],
      ["doesn't modify STR modifier when weak"  ,   { ...DWARF, ability: 'strength', score: 6, modifier: -2 }],
      ["doesn't modify DEX modifier",               { ...DWARF, ability: 'dexterity', modifier: 0 }],
      ["doesn't modify DEX modifier when zippy",    { ...DWARF, ability: 'dexterity', score: 14, modifier: +2 }],
      ["doesn't modify DEX modifier when sluggish", { ...DWARF, ability: 'dexterity', score: 6, modifier: -2 }],
      ["it adds +1 CON modifier",                   { ...DWARF, ability: 'constitution', modifier: +1 }],
      ["it adds +1 CON modifier when hale",         { ...DWARF, ability: 'constitution', score: 14, modifier: +3 }],
      ["it adds +1 CON modifier when sickly",       { ...DWARF, ability: 'constitution', score: 6, modifier: -1 }],
      ["doesn't modify INT modifier",               { ...DWARF, ability: 'intelligence', modifier: 0 }],
      ["doesn't modify INT modifier when smart",    { ...DWARF, ability: 'intelligence', score: 14, modifier: +2 }],
      ["doesn't modify INT modifier when dull",     { ...DWARF, ability: 'intelligence', score: 6, modifier: -2 }],
      ["doesn't modify WIS modifier",               { ...DWARF, ability: 'wisdom', modifier: 0 }],
      ["doesn't modify WIS modifier when smart",    { ...DWARF, ability: 'wisdom', score: 14, modifier: +2 }],
      ["doesn't modify WIS modifier when dull",     { ...DWARF, ability: 'wisdom', score: 6, modifier: -2 }],
      ["adds -1 to CHA modifier",                   { ...DWARF, ability: 'charisma', modifier: -1 }],
      ["adds -1 to CHA modifier when smart",        { ...DWARF, ability: 'charisma', score: 14, modifier: +1 }],
      ["adds -1 to CHA modifier when dull",         { ...DWARF, ability: 'charisma', score: 6, modifier: -3 }],
    ])("%s", (_, data) => validateAbilityModifier(data))
  })

  describe("when an Elf", () => {

    let ELF = { ...DEFAULTS, race: 'Elf' }

    it.each([
      ["doesn't modify STR modifier",               { ...ELF, ability: 'strength', modifier: 0 }],
      ["doesn't modify STR modifier when strong",   { ...ELF, ability: 'strength', score: 14, modifier: +2 }],
      ["doesn't modify STR modifier when weak"  ,   { ...ELF, ability: 'strength', score: 6, modifier: -2 }],
      ["adds +1 to DEX modifier",                   { ...ELF, ability: 'dexterity', modifier: +1 }],
      ["adds +1 to DEX modifier when zippy",        { ...ELF, ability: 'dexterity', score: 14, modifier: +3 }],
      ["adds +1 to DEX modifier when sluggish",     { ...ELF, ability: 'dexterity', score: 6, modifier: -1 }],
      ["adds -1 to CON modifier",                   { ...ELF, ability: 'constitution', modifier: -1 }],
      ["adds -1 to CON modifier when hale",         { ...ELF, ability: 'constitution', score: 14, modifier: +1 }],
      ["adds -1 to CON modifier when sickly",       { ...ELF, ability: 'constitution', score: 6, modifier: -3 }],
      ["doesn't modify INT modifier",               { ...ELF, ability: 'intelligence', modifier: 0 }],
      ["doesn't modify INT modifier when smart",    { ...ELF, ability: 'intelligence', score: 14, modifier: +2 }],
      ["doesn't modify INT modifier when dull",     { ...ELF, ability: 'intelligence', score: 6, modifier: -2 }],
      ["doesn't modify WIS modifier",               { ...ELF, ability: 'wisdom', modifier: 0 }],
      ["doesn't modify WIS modifier when smart",    { ...ELF, ability: 'wisdom', score: 14, modifier: +2 }],
      ["doesn't modify WIS modifier when dull",     { ...ELF, ability: 'wisdom', score: 6, modifier: -2 }],
      ["doesn't modify CHA modifier",               { ...ELF, ability: 'charisma', modifier: 0 }],
      ["doesn't modify CHA modifier when smart",    { ...ELF, ability: 'charisma', score: 14, modifier: +2 }],
      ["doesn't modify CHA modifier when dull",     { ...ELF, ability: 'charisma', score: 6, modifier: -2 }],
    ])("%s", (_, data) => validateAbilityModifier(data))
  })

  describe("when a Halfling", () => {

    let HALFLING = { ...DEFAULTS, race: 'Halfling' }

    it.each([
      ["adds -1 to STR modifier",                   { ...HALFLING, ability: 'strength', modifier: -1 }],
      ["adds -1 to STR modifier when strong",       { ...HALFLING, ability: 'strength', score: 14, modifier: +1 }],
      ["adds -1 to STR modifier when weak"  ,       { ...HALFLING, ability: 'strength', score: 6, modifier: -3 }],
      ["adds +1 to DEX modifier",                   { ...HALFLING, ability: 'dexterity', modifier: +1 }],
      ["adds +1 to DEX modifier when zippy",        { ...HALFLING, ability: 'dexterity', score: 14, modifier: +3 }],
      ["adds +1 to DEX modifier when sluggish",     { ...HALFLING, ability: 'dexterity', score: 6, modifier: -1 }],
      ["doesn't modify CON modifier",               { ...HALFLING, ability: 'constitution', modifier: 0 }],
      ["doesn't modify CON modifier when hale",     { ...HALFLING, ability: 'constitution', score: 14, modifier: +2 }],
      ["doesn't modify CON modifier when sickly",   { ...HALFLING, ability: 'constitution', score: 6, modifier: -2 }],
      ["doesn't modify INT modifier",               { ...HALFLING, ability: 'intelligence', modifier: 0 }],
      ["doesn't modify INT modifier when smart",    { ...HALFLING, ability: 'intelligence', score: 14, modifier: +2 }],
      ["doesn't modify INT modifier when dull",     { ...HALFLING, ability: 'intelligence', score: 6, modifier: -2 }],
      ["doesn't modify WIS modifier",               { ...HALFLING, ability: 'wisdom', modifier: 0 }],
      ["doesn't modify WIS modifier when smart",    { ...HALFLING, ability: 'wisdom', score: 14, modifier: +2 }],
      ["doesn't modify WIS modifier when dull",     { ...HALFLING, ability: 'wisdom', score: 6, modifier: -2 }],
      ["doesn't modify CHA modifier",               { ...HALFLING, ability: 'charisma', modifier: 0 }],
      ["doesn't modify CHA modifier when smart",    { ...HALFLING, ability: 'charisma', score: 14, modifier: +2 }],
      ["doesn't modify CHA modifier when dull",     { ...HALFLING, ability: 'charisma', score: 6, modifier: -2 }],
    ])("%s", (_, data) => validateAbilityModifier(data))
  })

  function validateAbilityModifier(data) {
    makeRace(subject, data.race)

    subject[data.ability].score = data.score
    expect(subject[data.ability].modifier).toBe(data.modifier)
  }
})
