import { TrashIcon } from '@heroicons/react/24/outline'
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form'

export type Inputs = {
  characterGroups: { label: string; characters: string }[]
}

function Form() {
  const form = useForm<Inputs>({
    defaultValues: {
      characterGroups: [
        { label: 'C', characters: 'b m l' },
        { label: 'B', characters: 'b m l' },
      ],
    },
  })

  const { register, control, handleSubmit, formState } = form
  const { errors } = formState

  const { fields, append, remove } = useFieldArray({
    name: 'characterGroups',
    control,
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2 pb-8">
        {fields.map((field, index) => (
          <div className="flex flex-row items-center gap-2">
            <select
              className="border border-neutral-300 p-2 shadow-sm"
              {...register(`characterGroups.${index}.label`)}
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
              {...register(`characterGroups.${index}.characters`)}
            />
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="p-2 bg-red-600 shadow-sm"
              >
                <TrashIcon className="w-6 text-background" />
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          className="bg-secondary px-4 py-2 rounded cursor-pointer shadow-sm"
          onClick={() => append({ label: 'A', characters: 'q z l' })}
        >
          Add Character Group
        </button>
      </div>

      <div>
        <input
          className="bg-primary px-4 py-2 rounded cursor-pointer shadow-sm"
          type="submit"
          value="Generate"
        />
      </div>
    </form>
  )
}

export default Form
