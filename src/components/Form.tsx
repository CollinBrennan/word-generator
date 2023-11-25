import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form'
import InputCharacterGroup from './InputCharacterGroup'

type Inputs = {
  characterGroups: { label: string; characters: string }[]
  pattern: string
}

function Form() {
  const form = useForm<Inputs>({
    defaultValues: {
      characterGroups: [
        { label: 'C', characters: 'p t k m n s w l j' },
        { label: 'V', characters: 'a e i o u' },
        { label: 'N', characters: 'm n' },
      ],
      pattern: '(C)V(N)',
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
        <label className="text-xl">Characters</label>
        {fields.map((field, index) => (
          <div key={field.id}>
            <InputCharacterGroup
              labelRegister={register(`characterGroups.${index}.label`)}
              charactersRegister={register(
                `characterGroups.${index}.characters`
              )}
              remove={() => remove(index)}
              showRemoveButton={fields.length > 1}
            />
          </div>
        ))}
        <button
          type="button"
          className="bg-secondary px-4 py-2 rounded cursor-pointer shadow"
          onClick={() => append({ label: 'A', characters: 'q z l' })}
        >
          Add Character Group
        </button>
      </div>

      <div className="flex flex-col gap-2 pb-8">
        <label className="text-xl">Pattern</label>
        <input
          type="text shadow"
          placeholder="(C)V(N)"
          className="border border-neutral-300 p-2 flex-grow shadow-sm"
          {...register('pattern')}
        />
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
