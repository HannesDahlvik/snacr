'use client'

import { useRouter } from 'next/navigation'

import { Place } from '@snacr/db'

import { Button, Input, Textarea } from '../ui'
import { z } from 'zod'
import { useToast } from '~/hooks/useToast'
import { useZodForm } from '~/hooks/useZodForm'
import { api } from '~/lib/api'

const textPostSchema = z.object({
    title: z.string().min(3).max(300),
    body: z.string().optional()
})
type TextPostSchema = z.infer<typeof textPostSchema>

interface Props {
    place: Place | undefined
}

export default function CreateTextPost({ place }: Props) {
    const { toast } = useToast()
    const router = useRouter()

    const createPostMutation = api.posts.create.useMutation()

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useZodForm({
        schema: textPostSchema
    })

    const handleCreatePost = (data: TextPostSchema) => {
        if (!place)
            return toast({
                title: 'Select a place'
            })

        createPostMutation.mutate(
            {
                body: data.body,
                placeId: place?.id,
                title: data.title,
                type: 'text'
            },
            {
                onError: (err) => {
                    toast({
                        title: 'Error',
                        description: err.message,
                        variant: 'destructive'
                    })
                },
                onSuccess: (data) => {
                    router.push(`/p/${data?.placeId}/post/${data?.id}`)
                    router.refresh()
                }
            }
        )
    }

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleCreatePost)}>
            <Input
                label="Title"
                min={3}
                max={300}
                required
                error={errors.title?.message}
                {...register('title')}
            />

            <Textarea label="Text" error={errors.body?.message} {...register('body')} />

            <div>
                <Button type="submit" loading={createPostMutation.isLoading}>
                    Post
                </Button>
            </div>
        </form>
    )
}
