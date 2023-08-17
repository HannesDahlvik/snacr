'use client'

import { useRouter } from 'next/navigation'

import { Button, Textarea } from '../ui'
import { z } from 'zod'
import { useModals } from '~/hooks/useModals'
import { useToast } from '~/hooks/useToast'
import { useZodForm } from '~/hooks/useZodForm'
import { api } from '~/lib/api'

const createCommentSchema = z.object({
    text: z.string().min(1)
})
type CreateCommentSchema = z.infer<typeof createCommentSchema>

interface Props {
    postId: string
}

export default function CreateCommentModal({ postId }: Props) {
    const { closeAllModals } = useModals()
    const { toast } = useToast()
    const router = useRouter()

    const createCommentMutatioin = api.comments.create.useMutation()

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useZodForm({
        schema: createCommentSchema
    })

    const handleCreateComment = (data: CreateCommentSchema) => {
        createCommentMutatioin.mutate(
            {
                postId,
                text: data.text
            },
            {
                onError: (err) => {
                    toast({
                        title: 'Error',
                        description: err.message
                    })
                },
                onSuccess: () => {
                    closeAllModals()
                    router.refresh()
                }
            }
        )
    }

    return (
        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit(handleCreateComment)}>
            <Textarea error={errors.text?.message} {...register('text')} />

            <div className="grid grid-cols-2 gap-4 w-full">
                <Button type="button" variant="outline" onClick={closeAllModals}>
                    Cancel
                </Button>

                <Button type="submit" loading={createCommentMutatioin.isLoading}>
                    Post
                </Button>
            </div>
        </form>
    )
}
