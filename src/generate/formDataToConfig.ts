import { FormData, GeneratorConfig } from '../types'

export default function formDataToConfig(formData: FormData): GeneratorConfig {
  const [charGroups, weights] = parseCharGroupsAndWeights(formData.charGroups)
  const rewrites = parseRewrites(formData.rewrites)
  const exceptions = parseExceptions(formData.exceptions, charGroups)

  return {
    ...formData,
    charGroups,
    weights,
    rewrites,
    exceptions,
  }
}

function parseCharGroupsAndWeights(
  rawCharGroups: FormData['charGroups']
): [Record<string, string[]>, Record<string, number[]>] {
  const charGroups: Record<string, string[]> = {}
  const weights: Record<string, number[]> = {}

  for (let charGroup of rawCharGroups) {
    const weightRegex = /(.+)\*([0-9]*[.]?[0-9]+)/
    const charsWithWeights = charGroup.characters.split(/\s+/)

    const chars: string[] = []
    const charWeights: number[] = []
    for (let charWithWeight of charsWithWeights) {
      let result = weightRegex.exec(charWithWeight)
      chars.push(result ? result![1] : charWithWeight)
      charWeights.push(result ? parseFloat(result![2]) : 1)
    }
    charGroups[charGroup.label] = chars
    weights[charGroup.label] = charWeights
  }

  return [charGroups, weights]
}

function parseRewrites(rawRewrites: FormData['rewrites']) {
  const rewrites: Record<string, string[]> = {}
  for (let rewrite of rawRewrites) {
    rewrites[rewrite.sequence] = rewrite.replacements.split(/\s+/)
  }
  return rewrites
}

function parseExceptions(
  rawExceptions: FormData['exceptions'],
  charGroups: Record<string, string[]>
) {
  const unparsedExceptions = rawExceptions ? rawExceptions.split(/\s+/) : []
  const exceptions: string[] = []
  for (let exception of unparsedExceptions) {
    let exceptionChars: string[][] = []
    for (let char of exception) {
      if (charGroups[char]) exceptionChars.push(charGroups[char])
      else exceptionChars.push([char])
    }
    exceptions.push(...allPossibleStringCombos(exceptionChars))
  }
  return exceptions
}

function allPossibleStringCombos(stringsArray: string[][]): string[] {
  return stringsArray.reduce((combos, strings) =>
    combos.flatMap((combo) => strings.map((string) => combo + string))
  )
}
