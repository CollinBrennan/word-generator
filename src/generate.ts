import { Inputs } from './components/Form'

export function generate(formData: Inputs): string {
  const { charGroups, pattern } = parseFormData(formData)
  let parsedPattern = pattern
  let word = ''

  // Parse pattern
  const parensRegex = new RegExp('\\(([^(]*?)\\)')
  while (parensRegex.test(parsedPattern)) {
    const charsInParens = parensRegex.exec(parsedPattern)[1]
    parsedPattern = parsedPattern.replace(
      parensRegex,
      randBool() ? charsInParens : ''
    )
  }

  // Convert pattern to characters
  for (let char of parsedPattern) {
    if (charGroups[char] && charGroups[char].length > 0) {
      word += randString(charGroups[char])
    } else {
      word += char
    }
  }

  return word
}

function parseFormData(formData: Inputs) {
  const charGroups: Record<string, string[]> = {}
  for (let charGroup of formData.characterGroups) {
    charGroups[charGroup.label] = charGroup.characters.split(/\s/)
  }

  return { charGroups, pattern: formData.pattern }
}

function randBool() {
  return Math.random() > 0.5
}

function randString(array: string[]) {
  if (array.length > 0) {
    const randIndex = Math.floor(Math.random() * array.length)
    return array[randIndex]
  }

  return ''
}
