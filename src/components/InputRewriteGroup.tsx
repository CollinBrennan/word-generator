import { UseFieldArrayRemove, UseFormRegisterReturn } from 'react-hook-form'
import { TrashIcon } from '@heroicons/react/24/outline'

type InputRewriteGroupProps = {
  sequenceRegister: UseFormRegisterReturn<`rewrites.${number}.sequence`>
  replacementsRegister: UseFormRegisterReturn<`rewrites.${number}.replacements`>
  remove: UseFieldArrayRemove
  showRemoveButton: boolean
  handleClick: () => void
}

function InputCharGroup({
  sequenceRegister,
  replacementsRegister,
  remove,
  showRemoveButton,
  handleClick,
}: InputRewriteGroupProps) {
  return (
    <div className="flex flex-row items-center gap-2">
      <div className="flex gap-2 flex-grow">
        <input
          onClick={handleClick}
          type="text shadow"
          placeholder="a e i o u ..."
          className="w-1/4 border border-neutral-300 p-2 flex-grow shadow-sm"
          {...sequenceRegister}
        />
        <input
          onClick={handleClick}
          type="text shadow"
          placeholder="a e i o u ..."
          className="w-3/4 border border-neutral-300 p-2 flex-grow shadow-sm"
          {...replacementsRegister}
        />
      </div>

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
