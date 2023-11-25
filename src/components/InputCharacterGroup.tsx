import {
  UseFieldArrayRemove,
  UseFormRegister,
  UseFormRegisterReturn,
} from 'react-hook-form'
import { Inputs } from './Form'
import { TrashIcon } from '@heroicons/react/24/outline'

type InputCharacterGroupProps = {
  labelRegister: UseFormRegisterReturn<`characterGroups.${number}.label`>
  charactersRegister: UseFormRegisterReturn<`characterGroups.${number}.characters`>
  remove: UseFieldArrayRemove
  fieldsLength: number
}

function InputCharacterGroup({
  labelRegister,
  charactersRegister,
  remove,
  fieldsLength,
}: InputCharacterGroupProps) {
  return (
    <div className="flex flex-row items-center gap-2">
      <select
        className="border border-neutral-300 p-2 shadow-sm"
        {...labelRegister}
      >
        <option>A</option>
        <option>B</option>
        <option>C</option>
      </select>
      <input
        type="text shadow"
        placeholder="test"
        defaultValue="text"
        className="border border-neutral-300 p-2 flex-grow shadow-sm"
        {...charactersRegister}
      />
      {fieldsLength > 1 && (
        <button
          type="button"
          onClick={() => remove()}
          className="p-2 bg-red-600 shadow-sm"
        >
          <TrashIcon className="w-6 text-background" />
        </button>
      )}
    </div>
  )
}

export default InputCharacterGroup
