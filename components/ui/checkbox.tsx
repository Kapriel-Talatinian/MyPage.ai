import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, type = 'checkbox', ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Checkbox.displayName = 'Checkbox'

export { Checkbox } 