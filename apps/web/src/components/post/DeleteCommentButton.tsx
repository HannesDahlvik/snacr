'use client'

import { useRouter } from 'next/navigation'

import { Comment } from '@snacr/db'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    useToast
} from '@snacr/ui-web'

import { DotsThree, TrashSimple } from '@phosphor-icons/react'
import { api } from '~/lib/api'

interface Props {
    comment: Comment
}

export default function PostDeleteCommentButton({ comment }: Props) {
    const { toast } = useToast()
    const router = useRouter()

    const deleteCommentMutation = api.comments.delete.useMutation()

    const handleDeleteComment = () => {
        deleteCommentMutation.mutate(
            {
                commentId: comment.id
            },
            {
                onError: (err) => {
                    toast({
                        title: 'Error',
                        description: err.message,
                        variant: 'destructive'
                    })
                },
                onSuccess: () => {
                    router.refresh()
                }
            }
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <DotsThree size={20} weight="bold" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={handleDeleteComment}>
                    <TrashSimple className="mr-1" size={18} weight="fill" />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
