'use client'

import CreateCommentModal from '../modals/CreateComment'
import { Button } from '../ui'
import { useModals } from '~/hooks/useModals'

interface Props {
    postId: string
    replyToId: string
}

export default function PostCreateReplyComment({ postId, replyToId }: Props) {
    const { openModal } = useModals()

    const handleCreateReply = () => {
        openModal({
            title: 'Create Reply',
            children: <CreateCommentModal postId={postId} replyToId={replyToId} />
        })
    }

    return (
        <Button size="xs" variant="ghost" onClick={handleCreateReply}>
            Reply
        </Button>
    )
}
