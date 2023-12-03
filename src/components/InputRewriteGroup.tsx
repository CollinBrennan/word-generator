import { UseFieldArrayRemove, UseFormRegisterReturn } from 'react-hook-form'
import { TrashIcon } from '@heroicons/react/24/outline'

type InputRewriteGroupProps = {
  sequenceRegister: UseFormRegisterReturn<`rewrites.${number}.sequence`>
  replacementsRegister: UseFormRegisterReturn<`rewrites.${number}.replacements`>
  remove: UseFieldArrayRemove
  handleSequenceClick: () => void
  handleReplacementsClick: () => void
}

function InputCharGroup({
  sequenceRegister,
  replacementsRegister,
  remove,
  handleSequenceClick,
  handleReplacementsClick,
}: InputRewriteGroupProps) {
  return (
    <div className="flex flex-row items-center gap-2">
      <div className="flex gap-2 flex-grow  font-noto">
        <input
          onClick={handleSequenceClick}
          type="text shadow"
          placeholder="m"
          className="w-24 border border-neutral-300 p-2 shadow-sm"
          {...sequenceRegister}
        />
        <input
          onClick={handleReplacementsClick}
          type="text shadow"
          placeholder="m n..."
          className="border border-neutral-300 w-0 flex-grow p-2 shadow-sm"
          {...replacementsRegister}
        />
      </div>
      <button
        type="button"
        onClick={() => remove()}
        className="p-2 bg-red-600 shadow-sm rounded"
      >
        <TrashIcon className="w-6 text-background" />
      </button>
    </div>
  )
}

export default InputCharGroup
