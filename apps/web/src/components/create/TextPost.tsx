'use client'

import { Place } from '@snacr/db'

import { Button, Input, Textarea } from '../ui'
import { z } from 'zod'
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
    const createPostMutation = api.posts.create.useMutation()

    const { handleSubmit, register } = useZodForm({
        schema: textPostSchema
    })

    const handleCreatePost = (data: TextPostSchema) => {
        if (place)
            createPostMutation.mutate({
                body: data.body,
                placeId: place?.id,
                title: data.title,
                type: 'text'
            })
    }

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleCreatePost)}>
            <Input placeholder="Title" min={3} max={300} {...register('title')} />

            <Textarea placeholder="Text" {...register('body')} />

            <div>
                <Button type="submit" loading={createPostMutation.isLoading}>
                    Post
                </Button>
            </div>
        </form>
    )
}
