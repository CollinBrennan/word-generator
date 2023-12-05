import { UseFormRegisterReturn } from 'react-hook-form'

type TextFieldProps = {
  type?: 'text' | 'number'
  placeholder?: string
  styles?: string
  onFocus?: () => void
  register: UseFormRegisterReturn
}

export default function TextField({
  type,
  placeholder,
  styles,
  onFocus,
  register,
}: TextFieldProps) {
  return (
    <input
      type={type ?? 'text'}
      placeholder={placeholder}
      onFocus={onFocus}
      className={`font-noto border w-full border-neutral-300 p-2 shadow-sm ${
        styles ?? ''
      }`}
      {...register}
    />
  )
}
