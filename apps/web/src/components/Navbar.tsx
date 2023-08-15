'use client'

import { Fragment } from 'react'

import Link from 'next/link'

import {
    Avatar,
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    Input,
    Separator
} from './ui'
import {
    CaretDown,
    Gear,
    IconContext,
    Moon,
    Plus,
    SignOut,
    Sun,
    UserCircle
} from '@phosphor-icons/react'
import { AvatarFallback } from '@radix-ui/react-avatar'
import { useTheme } from 'next-themes'
import { z } from 'zod'
import { useZodForm } from '~/hooks/useZodForm'
import { getInitials } from '~/lib/getInitials'
import { useAuth } from '~/providers/AuthProvider'

const searchSchema = z.object({
    term: z.string().min(3)
})
type SearchSchema = z.infer<typeof searchSchema>

export default function Navbar() {
    const { user, logout } = useAuth()
    const { theme, setTheme } = useTheme()

    const { handleSubmit, register, reset } = useZodForm({
        schema: searchSchema
    })

    const handleSearch = (data: SearchSchema) => {
        console.log(data)
    }

    return (
        <nav className="navbar-area sticky top-0 flex items-center h-20 w-full bg-secondary/75 border-b backdrop-blur z-50">
            <div className="relative flex justify-between items-center w-full px-10">
                <div>
                    <Link href="/" className="text-foreground">
                        Snacr
                    </Link>
                </div>

                <div className="absolute left-1/2 right-1/2 -translate-x-1/2 flex justify-center items-center w-center">
                    <form
                        className="flex items-center gap-2 w-full"
                        onSubmit={handleSubmit(handleSearch)}
                    >
                        <Input type="text" placeholder="Search" required {...register('term')} />
                    </form>
                </div>

                <div className="flex justify-end items-center gap-2">
                    <IconContext.Provider
                        value={{
                            size: 20,
                            weight: 'fill'
                        }}
                    >
                        <Button
                            size="icon"
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        >
                            {theme === 'dark' ? <Sun /> : <Moon />}
                        </Button>

                        <div className="h-10">
                            <Separator className="mx-2" orientation="vertical" />
                        </div>

                        {!user ? (
                            <Fragment>
                                <Link href="/login">
                                    <Button variant="outline">Login</Button>
                                </Link>
                                <Link href="/signup">
                                    <Button>Signup</Button>
                                </Link>
                            </Fragment>
                        ) : (
                            <div className="flex items-center gap-2 cursor-pointer">
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="flex items-center gap-1 outline-none">
                                        <Avatar className="border">
                                            <AvatarFallback>
                                                {getInitials(user.username)}
                                            </AvatarFallback>
                                        </Avatar>

                                        <CaretDown />
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent className="w-40">
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <Link
                                                href="/account/profile"
                                                className="flex items-center gap-1"
                                            >
                                                <UserCircle />
                                                Profile
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Link
                                                href="/account/settings"
                                                className="flex items-center gap-1"
                                            >
                                                <Gear />
                                                Settings
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            className="flex items-center gap-1"
                                            onClick={logout}
                                        >
                                            <SignOut />
                                            Logout
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        )}
                    </IconContext.Provider>
                </div>
            </div>
        </nav>
    )
}
