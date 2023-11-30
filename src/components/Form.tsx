import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form'
import InputCharGroup from './InputCharGroup'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import IPAMenu from './IPAMenu'
import { useState } from 'react'

export type Inputs = {
  charGroups: { label: string; characters: string }[]
  pattern: string
  exceptions: string
  numWords: number
  syllablesMin: number
  syllablesMax: number
}

export type FocusedField =
  | undefined
  | 'pattern'
  | 'exceptions'
  | `charGroups.${number}.characters`

type FormProps = {
  onSubmit: SubmitHandler<Inputs>
}

const clearedFormValues: Inputs = {
  charGroups: [{ label: 'A', characters: '' }],
  pattern: '',
  exceptions: '',
  numWords: 50,
  syllablesMin: 1,
  syllablesMax: 3,
}

const defaultFormValues: Inputs = {
  charGroups: [
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

function Form({ onSubmit }: FormProps) {
  const [focusedField, setFocusedField] = useState<FocusedField>(undefined)

  const schema = yup.object({
    charGroups: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string().trim().required(),
          characters: yup
            .string()
            .trim()
            .label('Character group')
            .required('Character group cannot be empty'),
        })
      )
      .required(),
    pattern: yup
      .string()
      .trim()
      .label('Pattern')
      .required('Pattern cannot be empty'),
    exceptions: yup.string().trim().ensure(),
    numWords: yup
      .number()
      .typeError('Not a valid number')
      .integer('Number of words must be a whole number')
      .min(1)
      .label('Number of words')
      .required(),
    syllablesMin: yup
      .number()
      .typeError('Not a valid number')
      .integer('Number of words must be a whole number')
      .min(1)
      .label('Min syllables')
      .required(),
    syllablesMax: yup
      .number()
      .typeError('Not a valid number')
      .integer('Number of words must be a whole number')
      .min(yup.ref('syllablesMin'))
      .label('Max syllables')
      .required(),
  })

  const form = useForm<Inputs>({
    defaultValues: defaultFormValues,
    resolver: yupResolver(schema),
  })

  const { register, control, handleSubmit, reset, formState } = form

  const { errors } = formState

  const { fields, append, remove } = useFieldArray({
    name: 'charGroups',
    control,
  })

  return (
    <div className="flex w-full">
      <IPAMenu form={form} focusedField={focusedField} />
      <div className="flex flex-col bg-background flex-grow">
        <div className="bg-neutral-100 p-4">Configuration</div>
        <div className="md:h-[calc(100vh-7rem)] overflow-y-auto p-4">
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
                <label className="truncate">Min Syllables</label>
                <input
                  type="number"
                  placeholder="1"
                  className="border border-neutral-300 p-2 shadow-sm"
                  {...register('syllablesMin', { valueAsNumber: true })}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="truncate">Max Syllables</label>
                <input
                  type="number"
                  placeholder="3"
                  className="border border-neutral-300 p-2 shadow-sm"
                  {...register('syllablesMax', { valueAsNumber: true })}
                />
              </div>
              <p className="text-sm text-red-500">{errors.numWords?.message}</p>
              <p className="text-sm text-red-500">
                {errors.syllablesMin?.message}
              </p>
              <p className="text-sm text-red-500">
                {errors.syllablesMax?.message}
              </p>
            </div>

            <div className="flex flex-col gap-2 pb-4">
              <label>Characters</label>
              {fields.map((field, index) => (
                <div className="flex flex-col gap-2" key={field.id}>
                  <InputCharGroup
                    handleClick={() =>
                      setFocusedField(`charGroups.${index}.characters`)
                    }
                    labelRegister={register(`charGroups.${index}.label`)}
                    charactersRegister={register(
                      `charGroups.${index}.characters`
                    )}
                    remove={() => remove(index)}
                    showRemoveButton={fields.length > 1}
                  />
                  <p className="text-sm text-red-500">
                    {errors.charGroups &&
                      errors.charGroups[index]?.characters?.message}
                  </p>
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
                onClick={() => setFocusedField('pattern')}
                type="text"
                placeholder="(C)V(N)"
                className="border border-neutral-300 p-2 flex-grow shadow-sm"
                {...register('pattern')}
              />
              <p className="text-sm text-red-500">{errors.pattern?.message}</p>
            </div>

            <div className="flex flex-col gap-2 pb-8">
              <label>Exceptions</label>
              <input
                onClick={() => setFocusedField('exceptions')}
                type="text"
                placeholder="VV"
                className="border border-neutral-300 p-2 flex-grow shadow-sm"
                {...register('exceptions')}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Form
