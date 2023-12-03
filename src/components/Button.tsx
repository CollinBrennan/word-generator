import { PropsWithChildren } from 'react'

type ButtonProps = {
  purpose: 'primary' | 'secondary' | 'danger'
  type?: 'submit' | 'button'
  text?: string
  styles?: string
  onClick?: () => void
}

const colorMap = {
  primary: { bg: 'bg-primary', color: 'text-text' },
  secondary: { bg: 'bg-secondary', color: 'text-text' },
  danger: { bg: 'bg-danger', color: 'text-background' },
}

export default function Button({
  purpose,
  type,
  text,
  styles,
  onClick,
  children,
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      type={type ?? 'button'}
      onClick={onClick}
      className={`rounded overflow-hidden group shadow ${
        colorMap[purpose].bg
      } ${colorMap[purpose].color} ${styles ?? ''}`}
    >
      <div className="flex text-center justify-center px-2 py-2 group-hover:backdrop-brightness-90 group-active:backdrop-brightness-75">
        {text && <div className="px-2">{text}</div>}
        {children}
      </div>
    </button>
  )
}
