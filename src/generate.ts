import { Inputs } from './components/Form'

type ParsedFormData = {
  charGroups: Record<string, string[]>
  pattern: string
  rewrites: Record<string, string[]>
  exceptions: string[]
  numWords: number
  syllablesMin: number
  syllablesMax: number
}

export function generateWordList(formData: Inputs): string[] {
  const wordList: string[] = []
  const data = parseFormData(formData)

  for (let i = 0; i < data.numWords; i++) {
    wordList.push(generateWord(data))
  }

  return wordList.filter(
    (word) => !stringIncludesSubstring(word, data.exceptions)
  )
}

function generateWord(data: ParsedFormData): string {
  const { charGroups, pattern, syllablesMin, syllablesMax, rewrites } = data
  let parsedPattern = ''
  let word = ''

  const numSyllables = randInt(syllablesMin, syllablesMax)

  // Parse pattern
  for (let i = 0; i < numSyllables; i++) {
    let syllablePattern = pattern

    // Parse brackets
    const bracketsRegex = /\[([^[]*?)\]/
    while (bracketsRegex.test(syllablePattern)) {
      const charsInBrackets = bracketsRegex
        .exec(syllablePattern)![1]
        .split(/\s/)
      syllablePattern = syllablePattern.replace(
        bracketsRegex,
        randString(charsInBrackets)
      )
    }

    // Parse parentheses
    const parensRegex = /\(([^(]*?)\)/
    while (parensRegex.test(syllablePattern)) {
      const charsInParens = parensRegex.exec(syllablePattern)![1]
      syllablePattern = syllablePattern.replace(
        parensRegex,
        randBool() ? charsInParens : ''
      )
    }

    parsedPattern += syllablePattern
  }

  // Convert pattern to characters
  for (let char of parsedPattern) {
    if (charGroups[char]) word += randString(charGroups[char])
    else word += char
  }

  // Replace character sequences with rewrite replacements
  for (let sequence of Object.keys(rewrites)) {
    word = word.replaceAll(sequence, randString(rewrites[sequence]))
  }

  return word
}

function parseFormData(formData: Inputs): ParsedFormData {
  const { numWords, syllablesMin, syllablesMax, exceptions, pattern } = formData
  const charGroups: Record<string, string[]> = {}
  const rewrites: Record<string, string[]> = {}
  const rawExceptions = exceptions ? exceptions.split(/\s/) : []
  const parsedExceptions: string[] = []

  // Parse character groups
  for (let charGroup of formData.charGroups) {
    charGroups[charGroup.label] = charGroup.characters.split(/\s/)
  }

  // Parse rewrites
  for (let rewrite of formData.rewrites) {
    rewrites[rewrite.sequence] = rewrite.replacements.split(/\s/)
  }

  // Parse exceptions
  for (let rawException of rawExceptions) {
    let exceptionChars: string[][] = []
    for (let char of rawException) {
      if (charGroups[char]) exceptionChars.push(charGroups[char])
      else exceptionChars.push([char])
    }
    parsedExceptions.push(...allPossibleStringCombos(exceptionChars))
  }

  return {
    charGroups,
    pattern,
    rewrites,
    exceptions: parsedExceptions,
    numWords,
    syllablesMin,
    syllablesMax,
  }
}

function allPossibleStringCombos(stringsArray: string[][]): string[] {
  return stringsArray.reduce((combos, strings) =>
    combos.flatMap((combo) => strings.map((string) => combo + string))
  )
}

function stringIncludesSubstring(
  string: string,
  substrings: string[]
): boolean {
  return substrings.some((substring: string) => string.includes(substring))
}

function randBool() {
  return Math.random() > 0.5
}

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randString(array: string[]) {
  if (array.length > 0) {
    const randIndex = Math.floor(Math.random() * array.length)
    return array[randIndex]
  }

  return ''
}
