export type FormData = {
  charGroups: { label: string; characters: string }[]
  pattern: string
  rewrites: { sequence: string; replacements: string }[]
  exceptions: string
  numWords: number
  syllablesMin: number
  syllablesMax: number
}

export type GeneratorConfig = {
  charGroups: Record<string, string[]>
  weights: Record<string, number[]>
  pattern: string
  rewrites: Record<string, string[]>
  exceptions: string[]
  numWords: number
  syllablesMin: number
  syllablesMax: number
}
