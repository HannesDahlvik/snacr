import * as React from 'react'

import { Label } from './label'
import { cn } from '~/lib/utils'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string
    error?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, error, label, required, ...props }, ref) => {
        return (
            <div className="flex flex-col items-start gap-1 w-full">
                {label && (
                    <div className="flex justify-between w-full mb-1">
                        <Label htmlFor={label}>
                            {label}{' '}
                            {required && (
                                <span className="text-red-500 text-base leading-3">*</span>
                            )}
                        </Label>

                        {error && <p className="text-sm text-red-500 leading-3 !mt-0">{error}</p>}
                    </div>
                )}

                <textarea
                    className={cn(
                        'flex min-h-[80px] w-full rounded-md border border-input bg-secondary px-3 py-2 text-sm ring-offset-secondary placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                        className
                    )}
                    ref={ref}
                    {...props}
                />
            </div>
        )
    }
)
Textarea.displayName = 'Textarea'

export { Textarea }
