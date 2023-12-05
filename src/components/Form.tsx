import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import IPAMenu from './form/IPAMenu'
import { useState } from 'react'
import Button from './Button'
import TextField from './form/TextField'
import { TrashIcon } from '@heroicons/react/24/outline'
import Select from './form/Select'

export type Inputs = {
  charGroups: { label: string; characters: string }[]
  pattern: string
  rewrites: { sequence: string; replacements: string }[]
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
  | `rewrites.${number}.sequence`
  | `rewrites.${number}.replacements`

type FormProps = {
  onSubmit: SubmitHandler<Inputs>
}

const clearedFormValues: Inputs = {
  charGroups: [{ label: 'A', characters: '' }],
  pattern: '',
  rewrites: [{ sequence: '', replacements: '' }],
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
  rewrites: [{ sequence: 'si', replacements: 'shi' }],
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
    rewrites: yup
      .array()
      .of(
        yup.object().shape({
          sequence: yup
            .string()
            .trim()
            .label('Sequence cannot be empty')
            .required('Sequence cannot be empty'),
          replacements: yup
            .string()
            .trim()
            .label('Replacement sequence')
            .required('Replacement sequences cannot be empty'),
        })
      )
      .required(),
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
      .integer('Min must be a whole number')
      .min(1)
      .label('Min')
      .required(),
    syllablesMax: yup
      .number()
      .typeError('Not a valid number')
      .integer('Max must be a whole number')
      .min(yup.ref('syllablesMin'), 'Max must be greater than or equal to min')
      .label('Max')
      .required(),
  })

  const form = useForm<Inputs>({
    defaultValues: defaultFormValues,
    resolver: yupResolver(schema),
  })

  const { register, control, handleSubmit, reset, formState } = form
  const { errors } = formState

  const {
    fields: charGroupFields,
    append: appendCharGroup,
    remove: removeCharGroup,
  } = useFieldArray({
    name: 'charGroups',
    control,
  })

  const {
    fields: rewriteFields,
    append: appendRewrite,
    remove: removeRewrite,
  } = useFieldArray({
    name: 'rewrites',
    control,
  })

  return (
    <div className="flex w-full">
      <IPAMenu form={form} focusedField={focusedField} />
      <div className="flex flex-col bg-background flex-grow">
        <h1 className="bg-neutral-100 p-4">Configuration</h1>
        <div className="md:h-[calc(100vh-7rem)] overflow-y-auto p-4">
          <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex pb-8 gap-2">
              <Button type="submit" purpose="primary" text="Generate" />
              <Button
                purpose="secondary"
                text="Clear"
                onClick={() => reset(clearedFormValues)}
              />
              <Button
                purpose="secondary"
                text="Default"
                onClick={() => reset(defaultFormValues)}
              />
            </div>

            <div className="grid grid-cols-3 gap-2 pb-4">
              <label className="flex flex-col gap-2">
                Words
                <TextField
                  type="number"
                  placeholder="50"
                  register={register('numWords', { valueAsNumber: true })}
                />
              </label>

              <label className="truncate flex flex-col gap-2">
                Min Syllables
                <TextField
                  type="number"
                  placeholder="1"
                  register={register('syllablesMin', { valueAsNumber: true })}
                />
              </label>

              <label className="truncate flex flex-col gap-2">
                Max Syllables
                <TextField
                  type="number"
                  placeholder="3"
                  register={register('syllablesMax', { valueAsNumber: true })}
                />
              </label>

              <p className="text-sm text-danger">{errors.numWords?.message}</p>
              <p className="text-sm text-danger">
                {errors.syllablesMin?.message}
              </p>
              <p className="text-sm text-danger">
                {errors.syllablesMax?.message}
              </p>
            </div>

            <fieldset className="flex flex-col gap-2 pb-4">
              <legend>Characters</legend>
              {charGroupFields.map((field, index) => (
                <div className="flex flex-col gap-2" key={field.id}>
                  <div className="flex items-center gap-2">
                    <Select register={register(`charGroups.${index}.label`)} />
                    <TextField
                      onFocus={() =>
                        setFocusedField(`charGroups.${index}.characters`)
                      }
                      placeholder="a e i o u ..."
                      register={register(`charGroups.${index}.characters`)}
                    />
                    {charGroupFields.length > 1 && (
                      <Button
                        purpose="danger"
                        onClick={() => removeCharGroup(index)}
                        children={<TrashIcon className="h-6" />}
                      />
                    )}
                  </div>

                  {errors.charGroups &&
                    errors?.charGroups[index]?.characters?.message && (
                      <p className="text-sm text-danger">
                        {errors.charGroups[index]?.characters?.message}
                      </p>
                    )}
                </div>
              ))}
              <Button
                purpose="secondary"
                text="Add character group"
                onClick={() => appendCharGroup(clearedFormValues.charGroups[0])}
              />
            </fieldset>

            <label className="flex flex-col gap-2 pb-8">
              Pattern
              <TextField
                onFocus={() => setFocusedField('pattern')}
                placeholder="(C)V(N)"
                register={register('pattern')}
              />
              <p className="text-sm text-danger">{errors.pattern?.message}</p>
            </label>

            <fieldset className="flex flex-col gap-2 pb-8">
              <legend>Rewrites</legend>
              {rewriteFields.map((field, index) => (
                <div className="flex flex-col gap-2" key={field.id}>
                  <div className="flex items-center gap-2">
                    <TextField
                      onFocus={() =>
                        setFocusedField(`rewrites.${index}.sequence`)
                      }
                      placeholder="si"
                      register={register(`rewrites.${index}.sequence`)}
                      styles="[&&]:w-24"
                    />
                    <TextField
                      onFocus={() =>
                        setFocusedField(`rewrites.${index}.replacements`)
                      }
                      placeholder="shi"
                      register={register(`rewrites.${index}.replacements`)}
                    />
                    <Button
                      purpose="danger"
                      onClick={() => removeRewrite(index)}
                      children={<TrashIcon className="h-6" />}
                    />
                  </div>

                  {errors.rewrites &&
                    errors?.rewrites[index]?.sequence?.message && (
                      <p className="text-sm text-danger">
                        {errors.rewrites[index]?.sequence?.message}
                      </p>
                    )}
                  {errors.rewrites &&
                    errors?.rewrites[index]?.replacements?.message && (
                      <p className="text-sm text-danger">
                        {errors.rewrites[index]?.replacements?.message}
                      </p>
                    )}
                </div>
              ))}
              <Button
                purpose="secondary"
                text="Add sequence to rewrite"
                onClick={() => appendRewrite(clearedFormValues.rewrites[0])}
              />
            </fieldset>

            <label className="flex flex-col gap-2 pb-8">
              Exceptions
              <TextField
                onFocus={() => setFocusedField('exceptions')}
                placeholder="VV"
                register={register('exceptions')}
              />
            </label>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Form
