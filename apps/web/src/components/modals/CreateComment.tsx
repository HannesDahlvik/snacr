'use client'

import { useRouter } from 'next/navigation'

import { Button, useModals, useToast } from '@snacr/ui-web'

import { RichTextEditor } from '../RIchTextEditor'
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
import { useZodForm } from '~/hooks/useZodForm'
import { api } from '~/lib/api'

interface Props {
    postId: string
    replyToId?: string
}

export default function CreateCommentModal({ postId, replyToId }: Props) {
    const { closeAllModals } = useModals()
    const { toast } = useToast()
    const router = useRouter()

    const editor = useEditor({
        editorProps: {
            attributes: {
                class: 'p-3 outline-none min-h-[100px]'
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

    const createCommentMutatioin = api.comments.create.useMutation()

    const {
        handleSubmit,
        formState: { errors }
    } = useZodForm()

    const handleCreateComment = () => {
        if (!editor) return

        createCommentMutatioin.mutate(
            {
                postId,
                text: editor.getHTML(),
                replyToId
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
                    closeAllModals()
                    router.refresh()
                }
            }
        )
    }

    return (
        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit(handleCreateComment)}>
            <RichTextEditor editor={editor} />

            <div className="grid grid-cols-2 gap-4 w-full">
                <Button type="button" variant="outline" onClick={closeAllModals}>
                    Cancel
                </Button>

                <Button type="submit" loading={createCommentMutatioin.isLoading}>
                    {typeof replyToId === 'undefined' ? 'Post' : 'Reply'}
                </Button>
            </div>
        </form>
    )
}
