'use client'

import { useState } from 'react'

import { Button } from './button'
import { Input } from './input'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { Separator } from './separator'
import {
    Code,
    CodeBlock,
    Link,
    ListBullets,
    ListNumbers,
    Quotes,
    TextB,
    TextH,
    TextItalic,
    TextStrikethrough
} from '@phosphor-icons/react'
import { EditorContent, Editor } from '@tiptap/react'

interface Props {
    editor: Editor | null
}

export default function RichTextEditor({ editor }: Props) {
    const [link, setLink] = useState('')

    const handleAddLink = () => {
        editor
            ?.chain()
            .focus()
            .toggleLink({
                href: link
            })
            .run()
        setLink('')
    }

    if (!editor) {
        return null
    }

    return (
        <div className="flex flex-col items-start gap-1 w-full border rounded-md">
            <div className="flex items-center gap-1 bg-popover p-2 rounded-md w-full">
                <Button
                    size="xs"
                    variant={editor.isActive('bold') ? 'default' : 'ghost'}
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                >
                    <TextB />
                </Button>

                <Button
                    size="xs"
                    variant={editor.isActive('italic') ? 'default' : 'ghost'}
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                    <TextItalic />
                </Button>

                <Popover>
                    <PopoverTrigger>
                        <Button
                            size="xs"
                            variant={editor.isActive('link') ? 'default' : 'ghost'}
                            type="button"
                        >
                            <Link />
                        </Button>
                    </PopoverTrigger>

                    <PopoverContent>
                        <Input
                            placeholder="https://"
                            label="Link"
                            value={link}
                            onChange={(ev) => setLink(ev.target.value)}
                        />

                        <Button className="mt-2" type="button" onClick={handleAddLink}>
                            Insert
                        </Button>
                    </PopoverContent>
                </Popover>

                <Button
                    size="xs"
                    variant={editor.isActive('strike') ? 'default' : 'ghost'}
                    type="button"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                >
                    <TextStrikethrough />
                </Button>

                <Button
                    size="xs"
                    variant={editor.isActive('code') ? 'default' : 'ghost'}
                    type="button"
                    onClick={() => editor.chain().focus().toggleCode().run()}
                >
                    <Code />
                </Button>

                <Separator orientation="vertical" className="h-4" />

                <Button
                    size="xs"
                    variant={editor.isActive('heading') ? 'default' : 'ghost'}
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                >
                    <TextH />
                </Button>

                <Button
                    size="xs"
                    variant={editor.isActive('bulletList') ? 'default' : 'ghost'}
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                >
                    <ListBullets />
                </Button>

                <Button
                    size="xs"
                    variant={editor.isActive('orderedList') ? 'default' : 'ghost'}
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                >
                    <ListNumbers />
                </Button>

                <Button
                    size="xs"
                    variant={editor.isActive('blockquote') ? 'default' : 'ghost'}
                    type="button"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                >
                    <Quotes />
                </Button>

                <Button
                    size="xs"
                    variant={editor.isActive('codeBlock') ? 'default' : 'ghost'}
                    type="button"
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                >
                    <CodeBlock />
                </Button>
            </div>

            <EditorContent className="min-h-[100px] w-full" editor={editor} />
        </div>
    )
}
