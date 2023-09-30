import * as React from 'react'

import { cn } from '@snacr/ui-utils'

import { Label } from './label'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, error, label, required, ...props }, ref) => {
        return (
            <div className="flex flex-col items-start gap-1 w-full">
                {label && (
                    <div className="flex justify-between w-full mb-1">
                        <Label className="flex items-center" htmlFor={label}>
                            {label}{' '}
                            {required && (
                                <span className="text-red-500 text-base leading-3">*</span>
                            )}
                        </Label>

                        {error && (
                            <p className="text-right text-sm text-red-500 leading-3 !mt-0">
                                {error}
                            </p>
                        )}
                    </div>
                )}

                <input
                    className={cn(
                        'flex h-10 w-full rounded-md border border-input bg-secondary px-3 py-2 text-sm ring-offset-secondary file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                        className
                    )}
                    id={label}
                    ref={ref}
                    {...props}
                />
            </div>
        )
    }
)
Input.displayName = 'Input'

export { Input }
