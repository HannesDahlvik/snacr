import { useEffect, useState } from 'react'

import { Pressable } from 'react-native'

import { RouterOutputs } from '@snacr/api'
import { VoteType } from '@snacr/db'
import { cn } from '@snacr/ui-utils'

import { api } from '../../lib/api'
import { useAuth } from '../../providers/AuthProvider'
import { ArrowFatDown, ArrowFatUp } from 'phosphor-react-native'
import { Text, View } from 'react-native-ui-lib'
import { z } from 'zod'

const postVoteSchema = z.object({
    postId: z.string(),
    type: z.custom<VoteType>()
})
type PostVoteSchema = z.infer<typeof postVoteSchema>

interface Props {
    post: RouterOutputs['posts']['getById']
}

export default function PostVoteButtons({ post }: Props) {
    const { user } = useAuth()
    const tc = api.useContext()

    const postVoteMutation = api.posts.vote.useMutation()

    const [votes, setVotes] = useState(0)
    const [isUpvote, setIsUpvote] = useState(false)
    const [isVoteAuthor, setIsVoteAuthor] = useState(false)

    useEffect(() => {
        const localIsVoteAuthor = post.votes.find((val) => val.userId === user?.userId)
        const localIsUpvote = post.votes.find((val) => {
            return val.type === 'UP' && val.userId === user?.userId ? true : false
        })
        let localVotes = 0
        post.votes.map((vote) => (vote.type === 'UP' ? localVotes++ : localVotes--))

        setVotes(localVotes)
        setIsUpvote(localIsUpvote ? true : false)
        setIsVoteAuthor(localIsVoteAuthor ? true : false)
    }, [post])

    const handlePostVote = (data: PostVoteSchema) => {
        const parsed = postVoteSchema.safeParse(data)
        if (!parsed.success) return

        postVoteMutation.mutate(
            {
                postId: data.postId,
                type: data.type
            },
            {
                onSuccess: () => {
                    tc.posts.invalidate()
                }
            }
        )
    }

    return (
        <View className="flex flex-row items-center gap-2 h-10 text-center">
            <Pressable
                className="cursor-pointer"
                onPress={() =>
                    handlePostVote({
                        postId: post.id,
                        type: 'UP'
                    })
                }
            >
                <ArrowFatUp
                    color={isVoteAuthor && isUpvote ? '#3b82f6' : 'black'}
                    size={20}
                    weight={isVoteAuthor && isUpvote ? 'fill' : 'regular'}
                />
            </Pressable>

            <Text className="w-4 text-center">{votes}</Text>

            <Pressable
                className="cursor-pointer"
                onPress={() =>
                    handlePostVote({
                        postId: post.id,
                        type: 'DOWN'
                    })
                }
            >
                <ArrowFatDown
                    color={isVoteAuthor && !isUpvote ? '#ef4444' : 'black'}
                    size={20}
                    weight={isVoteAuthor && !isUpvote ? 'fill' : 'regular'}
                />
            </Pressable>
        </View>
    )
}
