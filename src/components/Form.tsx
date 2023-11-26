import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form'
import InputCharacterGroup from './InputCharacterGroup'

export type Inputs = {
  characterGroups: { label: string; characters: string }[]
  pattern: string
  numWords: number
  syllablesMin: number
  syllablesMax: number
}

function Form({ setOutput }: any) {
  const form = useForm<Inputs>({
    defaultValues: {
      characterGroups: [
        { label: 'C', characters: 'p t k m n s w l j' },
        { label: 'V', characters: 'a e i o u' },
        { label: 'N', characters: 'm n' },
      ],
      pattern: '(C)V(N)',
      numWords: 50,
      syllablesMin: 1,
      syllablesMax: 3,
    },
  })

  const { register, control, handleSubmit, formState } = form
  const { errors } = formState

  const { fields, append, remove } = useFieldArray({
    name: 'characterGroups',
    control,
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => setOutput(data)

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2 pb-8">
        <label className="text-xl">Words</label>
        <input
          type="number"
          placeholder="50"
          className="border border-neutral-300 p-2 flex-grow shadow-sm"
          {...register('numWords')}
        />
      </div>

      <div className="flex flex-col gap-2 pb-8">
        <label className="text-xl">Minimum Syllables</label>
        <input
          type="number"
          placeholder="1"
          className="border border-neutral-300 p-2 flex-grow shadow-sm"
          {...register('syllablesMin')}
        />
      </div>

      <div className="flex flex-col gap-2 pb-8">
        <label className="text-xl">Maximum Syllables</label>
        <input
          type="number"
          placeholder="3"
          className="border border-neutral-300 p-2 flex-grow shadow-sm"
          {...register('syllablesMax')}
        />
      </div>

      <div className="flex flex-col gap-2 pb-4">
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
          className="bg-secondary/50 px-4 py-2 rounded cursor-pointer shadow"
          onClick={() => append({ label: 'A', characters: '' })}
        >
          Add Character Group
        </button>
      </div>

      <div className="flex flex-col gap-2 pb-8">
        <label className="text-xl">Pattern</label>
        <input
          type="text"
          placeholder="(C)V(N)"
          className="border border-neutral-300 p-2 flex-grow shadow-sm"
          {...register('pattern')}
        />
      </div>

      <div>
        <input
          className="bg-primary text-text px-4 py-2 rounded cursor-pointer shadow-sm"
          type="submit"
          value="Generate"
        />
      </div>
    </form>
  )
}

export default Form
