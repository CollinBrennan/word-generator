import { FormData, GeneratorConfig } from '../types'
import formDataToConfig from './formDataToConfig'

export default function formDataToWords(formData: FormData): string[] {
  const config = formDataToConfig(formData)
  return generateWords(config)
}

function generateWords(config: GeneratorConfig): string[] {
  const wordList: string[] = []
  for (let i = 0; i < config.numWords; i++) {
    wordList.push(generateWord(config))
  }

  return wordList.filter(
    (word) => !stringIncludesSubstring(word, config.exceptions)
  )
}

function generateWord(config: GeneratorConfig): string {
  const { charGroups, weights, pattern, syllablesMin, syllablesMax, rewrites } =
    config
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
    if (charGroups[char])
      word += weightedRandString(charGroups[char], weights[char])
    else word += char
  }

  // Replace character sequences with rewrite replacements
  for (let sequence of Object.keys(rewrites)) {
    word = word.replaceAll(sequence, randString(rewrites[sequence]))
  }

  return word
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

function weightedRandString(array: string[], weights: number[]) {
  if (array.length > 0) {
    const cumulativeWeights: number[] = []
    for (let i = 0; i < weights.length; i += 1) {
      cumulativeWeights[i] = weights[i] + (cumulativeWeights[i - 1] || 0)
    }
    const random =
      cumulativeWeights[cumulativeWeights.length - 1] * Math.random()
    for (let i = 0; i < array.length; i += 1) {
      if (random <= cumulativeWeights[i]) return array[i]
    }
  }

  return ''
}
