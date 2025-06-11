import React from 'react'
import clsx from 'clsx'

type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'danger'
  className?: string
  disabled?: boolean
}

const baseStyles = 'rounded px-4 py-2 font-semibold focus:outline-none focus:ring-2 transition'

const variantStyles = {
  primary: '!bg-blue-600 text-white hover:bg-white-700 focus:ring-blue-300',
  secondary: '!bg-gray-200 text-black hover:bg-gray-300 focus:ring-gray-300',
  danger: '!bg-red-600 text-white hover:bg-red-700 focus:ring-red-300',
}

export const CButton = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(baseStyles, variantStyles[variant], className)}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
