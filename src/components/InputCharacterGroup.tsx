import { UseFieldArrayRemove, UseFormRegisterReturn } from 'react-hook-form'
import { TrashIcon } from '@heroicons/react/24/outline'
import alphabet from '../utils/alphabet'

type InputCharacterGroupProps = {
  labelRegister: UseFormRegisterReturn<`characterGroups.${number}.label`>
  charactersRegister: UseFormRegisterReturn<`characterGroups.${number}.characters`>
  remove: UseFieldArrayRemove
  showRemoveButton: boolean
}

function InputCharacterGroup({
  labelRegister,
  charactersRegister,
  remove,
  showRemoveButton,
}: InputCharacterGroupProps) {
  return (
    <div className="flex flex-row items-center gap-2">
      <select
        className="border border-neutral-300 p-2 shadow-sm"
        {...labelRegister}
      >
        {alphabet.map((letter) => (
          <option key={letter} value={letter}>
            {letter}
          </option>
        ))}
      </select>
      <input
        type="text shadow"
        placeholder="a e i o u ..."
        className="border border-neutral-300 p-2 flex-grow shadow-sm"
        {...charactersRegister}
      />
      {showRemoveButton && (
        <button
          type="button"
          onClick={() => remove()}
          className="p-2 bg-red-600 shadow-sm rounded"
        >
          <TrashIcon className="w-6 text-background" />
        </button>
      )}
    </div>
  )
}

export default InputCharacterGroup
