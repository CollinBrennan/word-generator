import { TrashIcon } from '@heroicons/react/24/outline'
import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = {
  text: string
}

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-row items-center gap-2 py-2">
        <select className="border border-neutral-300 p-2 shadow">
          <option>A</option>
          <option>B</option>
          <option>C</option>
        </select>
        <input
          type="text shadow"
          placeholder="test"
          defaultValue="text"
          className="border border-neutral-300 p-2 flex-grow"
          {...register('text')}
        />
        <button className="p-2 bg-red-600">
          <TrashIcon className="w-6 text-background" />
        </button>
      </div>

      <div>
        <input
          className="bg-primary px-4 py-2 rounded cursor-pointer"
          type="submit"
        />
      </div>
    </form>
  )
}

export default Form
