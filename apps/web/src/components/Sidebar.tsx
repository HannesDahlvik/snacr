'use client'

import { Fragment } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { RouterOutputs } from '@snacr/api'

import CreatePlaceModal from './modals/CreatePlace'
import { Button } from './ui'
import { House, Icon } from '@phosphor-icons/react'
import { useModals } from '~/hooks/useModals'
import { cn } from '~/lib/utils'
import { useAuth } from '~/providers/AuthProvider'

interface Props {
    subscriptions: RouterOutputs['subscriptions']['places']
}

export default function Sidebar({ subscriptions }: Props) {
    const { user } = useAuth()

    return (
        <div className="sidebar-area fixed top-20 left-0 h-[calc(100vh-80px)] w-80 bg-secondary p-10 border-r z-40">
            {user ? <AuthedSidebar subscriptions={subscriptions} /> : <NormalSidebar />}
        </div>
    )
}

function AuthedSidebar({ subscriptions }: Props) {
    const modals = useModals()

    return (
        <Fragment>
            <Button
                className="w-full"
                onClick={() =>
                    modals.openModal({
                        title: 'Create Place',
                        children: <CreatePlaceModal />
                    })
                }
            >
                Create Place
            </Button>

            <div className="flex flex-col gap-1 mt-5">
                <p className="text-muted-foreground mb-2">Joined Places</p>
                {subscriptions.length === 0 && (
                    <p className="text-center">You have not joined any places</p>
                )}

                {subscriptions.map((subscription) => (
                    <SidebarLink
                        title={subscription.place.name}
                        href={`/p/${subscription.place.url}`}
                        key={subscription.place.id}
                    />
                ))}
            </div>
        </Fragment>
    )
}

function NormalSidebar() {
    return (
        <div className="flex flex-col gap-2">
            <SidebarLink title="Home" Icon={House} href="/" />
        </div>
    )
}

interface SidebarLinkProps {
    title: string
    href: string
    Icon?: Icon
}

function SidebarLink({ Icon, href, title }: SidebarLinkProps) {
    const pathname = usePathname()

    return (
        <Link
            href={href}
            className={cn(
                'flex items-center gap-2 p-3 rounded-lg',
                pathname === href ? 'bg-primary text-primary-foreground' : 'hover:bg-primary/25'
            )}
        >
            {Icon && <Icon weight="fill" size={24} />}
            <p className="font-bold">{title}</p>
        </Link>
    )
}
