import { Inputs } from './components/Form'

type ParsedFormData = {
  charGroups: Record<string, string[]>
  pattern: string
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

  return wordList
}

function generateWord(data: ParsedFormData): string {
  const { charGroups, pattern, syllablesMin, syllablesMax } = data
  let parsedPattern = ''
  let word = ''

  const numSyllables = randInt(syllablesMin, syllablesMax)

  // Parse pattern
  const parensRegex = /\(([^(]*?)\)/
  for (let i = 0; i < numSyllables; i++) {
    let syllablePattern = pattern
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
    if (charGroups[char]) {
      word += randString(charGroups[char])
    } else {
      word += char
    }
  }

  return word
}

function parseFormData(formData: Inputs): ParsedFormData {
  const charGroups: Record<string, string[]> = {}
  for (let charGroup of formData.characterGroups) {
    charGroups[charGroup.label] = charGroup.characters.split(/\s/)
  }

  const { numWords, syllablesMin, syllablesMax } = formData

  return {
    charGroups,
    pattern: formData.pattern,
    numWords,
    syllablesMin,
    syllablesMax,
  }
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
