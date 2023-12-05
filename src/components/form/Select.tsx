import { UseFormRegisterReturn } from 'react-hook-form'

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

type SelectProps = {
  register: UseFormRegisterReturn
}

export default function Select({ register }: SelectProps) {
  return (
    <select className="border border-neutral-300 p-2 shadow-sm" {...register}>
      {alphabet.split('').map((letter) => (
        <option key={letter} value={letter}>
          {letter}
        </option>
      ))}
    </select>
  )
}
