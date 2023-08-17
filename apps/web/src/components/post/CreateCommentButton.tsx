'use client'

import CreateCommentModal from '../modals/CreateComment'
import { Button } from '../ui'
import { useModals } from '~/hooks/useModals'

interface Props {
    postId: string
}

export default function CreateCommentButton({ postId }: Props) {
    const { openModal } = useModals()

    const handleCreateComment = () => {
        openModal({
            title: 'Create a Comment',
            children: <CreateCommentModal postId={postId} />
        })
    }

    return (
        <Button variant="ghost" onClick={handleCreateComment}>
            Post
        </Button>
    )
}
