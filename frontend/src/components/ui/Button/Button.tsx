import type { ButtonHTMLAttributes, ReactNode } from 'react'
import s from './button.module.css'

type ButtonVariant = 'primary' | 'secondary'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  children: ReactNode
}

export const Button = ({
  variant = 'primary',
  children,
  className = '',
  ...props
}: ButtonProps) => {
  const classes = [s.button, s[variant], className].join(' ').trim()

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
