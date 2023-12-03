import { UseFieldArrayRemove, UseFormRegisterReturn } from 'react-hook-form'
import { TrashIcon } from '@heroicons/react/24/outline'

type InputCharGroupProps = {
  labelRegister: UseFormRegisterReturn<`charGroups.${number}.label`>
  charactersRegister: UseFormRegisterReturn<`charGroups.${number}.characters`>
  remove: UseFieldArrayRemove
  showRemoveButton: boolean
  handleClick: () => void
}

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

function InputCharGroup({
  labelRegister,
  charactersRegister,
  remove,
  showRemoveButton,
  handleClick,
}: InputCharGroupProps) {
  return (
    <div className="flex items-center gap-2 font-noto">
      <select
        className="border border-neutral-300 p-2 shadow-sm"
        {...labelRegister}
      >
        {alphabet.split('').map((letter) => (
          <option key={letter} value={letter}>
            {letter}
          </option>
        ))}
      </select>
      <input
        onClick={handleClick}
        type="text shadow"
        placeholder="a e i o u ..."
        className="border border-neutral-300 w-0 flex-grow p-2 shadow-sm"
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

export default InputCharGroup
