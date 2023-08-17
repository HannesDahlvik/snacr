'use client'

import { Chats } from '@phosphor-icons/react'

export default function PostNoComments() {
    return (
        <div className="flex flex-col items-center w-full pt-8">
            <Chats className="text-muted-foreground mb-4" size={42} weight="fill" />
            <p>There are no comments on this post</p>
        </div>
    )
}
