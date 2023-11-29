import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form'
import InputCharacterGroup from './InputCharacterGroup'

export type Inputs = {
  characterGroups: { label: string; characters: string }[]
  pattern: string
  exceptions: string
  numWords: number
  syllablesMin: number
  syllablesMax: number
}

const clearedFormValues: Inputs = {
  characterGroups: [{ label: 'A', characters: '' }],
  pattern: '',
  exceptions: '',
  numWords: 50,
  syllablesMin: 1,
  syllablesMax: 3,
}

const defaultFormValues: Inputs = {
  characterGroups: [
    { label: 'C', characters: 'p t k m n s w l j' },
    { label: 'V', characters: 'a e i o u' },
    { label: 'N', characters: 'm n' },
  ],
  pattern: '(C)V(N)',
  exceptions: 'VV',
  numWords: 50,
  syllablesMin: 1,
  syllablesMax: 3,
}

type FormProps = {
  onSubmit: SubmitHandler<Inputs>
}

function Form({ onSubmit }: FormProps) {
  const form = useForm<Inputs>({
    defaultValues: defaultFormValues,
  })

  const { register, control, handleSubmit, reset } = form

  const { fields, append, remove } = useFieldArray({
    name: 'characterGroups',
    control,
  })

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-end pb-8 gap-2">
        <button
          onClick={() => reset(defaultFormValues)}
          type="button"
          className="bg-secondary  px-4 py-2 rounded cursor-pointer shadow"
        >
          Default
        </button>
        <button
          onClick={() => reset(clearedFormValues)}
          type="button"
          className="bg-secondary  px-4 py-2 rounded cursor-pointer shadow"
        >
          Clear
        </button>
        <input
          className="bg-primary px-4 py-2 rounded cursor-pointer shadow"
          type="submit"
          value="Generate"
        />
      </div>

      <div className="grid grid-cols-3 gap-2 pb-4">
        <div className="flex flex-col gap-2">
          <label>Words</label>
          <input
            type="number"
            placeholder="50"
            className="border border-neutral-300 p-2 shadow-sm"
            {...register('numWords', { valueAsNumber: true })}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Min Syllables</label>
          <input
            type="number"
            placeholder="1"
            className="border border-neutral-300 p-2 shadow-sm"
            {...register('syllablesMin', { valueAsNumber: true })}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Max Syllables</label>
          <input
            type="number"
            placeholder="3"
            className="border border-neutral-300 p-2 shadow-sm"
            {...register('syllablesMax', { valueAsNumber: true })}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 pb-4">
        <label>Characters</label>
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
          onClick={() => append({ label: 'A', characters: '' })}
        >
          Add Character Group
        </button>
      </div>

      <div className="flex flex-col gap-2 pb-8">
        <label>Pattern</label>
        <input
          type="text"
          placeholder="(C)V(N)"
          className="border border-neutral-300 p-2 flex-grow shadow-sm"
          {...register('pattern')}
        />
      </div>

      <div className="flex flex-col gap-2 pb-8">
        <label>Exceptions</label>
        <input
          type="text"
          placeholder="VV"
          className="border border-neutral-300 p-2 flex-grow shadow-sm"
          {...register('exceptions')}
        />
      </div>
    </form>
  )
}

export default Form
