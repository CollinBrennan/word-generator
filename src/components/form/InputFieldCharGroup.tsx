import { UseFieldArrayRemove, UseFormRegisterReturn } from 'react-hook-form'
import { TrashIcon } from '@heroicons/react/24/outline'
import Button from '../Button'

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

type InputFieldCharGroupProps = {
  labelRegister: UseFormRegisterReturn<`charGroups.${number}.label`>
  charactersRegister: UseFormRegisterReturn<`charGroups.${number}.characters`>
  remove: UseFieldArrayRemove
  showRemoveButton: boolean
  handleClick: () => void
}

export default function InputFieldCharGroup({
  labelRegister,
  charactersRegister,
  remove,
  showRemoveButton,
  handleClick,
}: InputFieldCharGroupProps) {
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
        <Button
          purpose="danger"
          onClick={remove}
          children={<TrashIcon className="h-6" />}
        />
      )}
    </div>
  )
}
