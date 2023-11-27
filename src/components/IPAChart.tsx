function IPAChart() {
  return (
    <div className="flex flex-col gap-4">
      {symbolGroups.map((group) => (
        <div>
          <h1>{group.name}</h1>
          <div className="grid grid-cols-4 gap-2">
            {group.symbols.split(' ').map((symbol) => (
              <button className="p-2 shadow bg-secondary rounded">
                {symbol}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default IPAChart

const symbolGroups = [
  { name: 'Plosive', symbols: 'ʈ ɖ ɟ ɢ ʔ' },
  { name: 'Nasal', symbols: 'ɱ ɳ ɲ ŋ ɴ' },
  { name: 'Trill', symbols: 'ʙ ʀ' },
  { name: 'Tap/Flap', symbols: 'ⱱ ɾ ɽ' },
  { name: 'Fricative', symbols: 'ɸ β θ ð ʃ ʒ ʂ ʐ ç ʝ ɣ χ ʁ ħ ʕ ɦ' },
  { name: 'Lateral Fricative', symbols: 'ɬ ɮ' },
  { name: 'Approximant', symbols: 'ʋ ɹ ɻ ɰ' },
  { name: 'Lateral Approximant', symbols: 'ɭ ʎ ʟ' },
  { name: 'Clicks', symbols: 'ʘ ǀ ǃ ǂ ǁ' },
  { name: 'Voiced Implosives', symbols: 'ɓ ɗ ʄ ɠ ʛ' },
  { name: 'Affricates', symbols: 't͡s t͡ʃ t͡ɕ ʈ͡ʂ d͡z d͡ʒ d͡ʑ ɖ͡ʐ' },
  { name: 'Other', symbols: 'ʍ w ʜ ʢ ʡ ɕ ʑ ɺ ɧ' },
]
