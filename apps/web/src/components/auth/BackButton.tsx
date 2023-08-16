'use client'

import Link from 'next/link'

import { Button } from '../ui'
import { House } from '@phosphor-icons/react'

export default function AuthBackButton() {
    return (
        <div className="absolute top-12 left-12">
            <Link href="/">
                <Button size="icon">
                    <House size={18} weight="fill" />
                </Button>
            </Link>
        </div>
    )
}
