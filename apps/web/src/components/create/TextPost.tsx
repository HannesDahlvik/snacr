'use client'

import { useRouter } from 'next/navigation'

import { Place } from '@snacr/db'

import { Button, Input, Label } from '../ui'
import RichTextEditor from '../ui/rich-text-editor'
import Blockquote from '@tiptap/extension-blockquote'
import Bold from '@tiptap/extension-bold'
import BulletList from '@tiptap/extension-bullet-list'
import CodeInline from '@tiptap/extension-code'
import CodeBlockExt from '@tiptap/extension-code-block'
import Document from '@tiptap/extension-document'
import Heading from '@tiptap/extension-heading'
import Italic from '@tiptap/extension-italic'
import LinkExt from '@tiptap/extension-link'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import Paragraph from '@tiptap/extension-paragraph'
import Strikethrough from '@tiptap/extension-strike'
import Text from '@tiptap/extension-text'
import { useEditor } from '@tiptap/react'
import { z } from 'zod'
import { useToast } from '~/hooks/useToast'
import { useZodForm } from '~/hooks/useZodForm'
import { api } from '~/lib/api'

const textPostSchema = z.object({
    title: z.string().min(3).max(300)
})
type TextPostSchema = z.infer<typeof textPostSchema>

interface Props {
    place: Place | undefined
}

export default function CreateTextPost({ place }: Props) {
    const { toast } = useToast()
    const router = useRouter()

    const editor = useEditor({
        editorProps: {
            attributes: {
                class: 'p-3 outline-none'
            }
        },
        extensions: [
            Blockquote,
            Bold,
            BulletList,
            CodeInline,
            CodeBlockExt,
            Document,
            Heading,
            Italic,
            LinkExt,
            ListItem,
            OrderedList,
            Paragraph,
            Strikethrough,
            Text
        ]
    })

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

        if (!editor) return

        createPostMutation.mutate(
            {
                body: editor.getHTML(),
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

            <Label className="flex items-center">Text (optional)</Label>
            <RichTextEditor editor={editor} />

            <div>
                <Button type="submit" loading={createPostMutation.isLoading}>
                    Post
                </Button>
            </div>
        </form>
    )
}
