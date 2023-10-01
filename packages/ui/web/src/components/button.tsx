'use client'

import * as React from 'react'

import { cn } from '@snacr/ui-utils'

import { CircleNotch } from '@phosphor-icons/react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default: 'bg-primary text-primary-foreground hover:bg-primary/90',
                destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
                outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
                secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                link: 'text-primary underline-offset-4 hover:underline'
            },
            size: {
                default: 'h-10 px-4 py-2',
                xs: 'h-7 px-2 text-sm',
                sm: 'h-9 px-3',
                lg: 'h-11 px-8 text-lg',
                icon: 'h-10 w-10'
            }
        },
        defaultVariants: {
            variant: 'default',
            size: 'default'
        }
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean
    loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, loading, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button'
        return (
            <Comp
                disabled={props.disabled || loading}
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            >
                {props.children}
                {loading && <CircleNotch weight="bold" size={20} className="ml-1 animate-spin" />}
            </Comp>
        )
    }
)
Button.displayName = 'Button'

export { Button, buttonVariants }