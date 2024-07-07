import { ListBulletIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { FocusedField } from '../Form'
import { FormData } from '../../types'
import Button from '../Button'

const symbolGroups = [
  {
    name: 'Vowels',
    symbols: 'ɨ ʉ ɯ ɪ ʏ ʊ ø ɘ ɵ ɤ ɛ œ ɜ ɞ ʌ ɔ æ ɐ ɶ ɑ ɒ',
  },
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

type IPAMenuProps = {
  form: UseFormReturn<FormData, any, undefined>
  focusedField: FocusedField
}

function IPAMenu({ form, focusedField }: IPAMenuProps) {
  const [isMenuShowing, setIsMenuShowing] = useState(false)

  const { setValue, getValues, setFocus, clearErrors } = form

  function handleClick(symbol: string) {
    if (focusedField) {
      setValue(focusedField, getValues(focusedField) + symbol)
      setFocus(focusedField)
      clearErrors(focusedField)
    }
  }

  return (
    <div className="flex-col shrink-0 bg-secondary/25 hidden md:flex">
      {isMenuShowing ? (
        <>
          <div className="bg-secondary p-4 flex justify-between">
            <h1>IPA</h1>
            <button onClick={() => setIsMenuShowing(false)}>
              <XMarkIcon className="w-6" />
            </button>
          </div>
          <div className="h-[calc(100vh-7rem)] overflow-auto p-4">
            <div className="flex flex-col gap-4">
              {symbolGroups.map((group) => (
                <div>
                  <h1>{group.name}</h1>
                  <div className="grid grid-cols-4 gap-2">
                    {group.symbols.split(' ').map((symbol) => (
                      <Button
                        purpose="secondary"
                        styles="font-noto"
                        onClick={() => handleClick(symbol)}
                        children={symbol}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <button
            onClick={() => setIsMenuShowing(true)}
            className="bg-secondary p-4"
          >
            <ListBulletIcon className="h-6" />
          </button>
        </>
      )}
    </div>
  )
}

export default IPAMenu
