import { View, useWindowDimensions } from 'react-native'

import { Place, Post, User, Vote } from '@snacr/db'

import { timeAgo } from '../../lib/utils'
import PostVoteButtons from './VoteButtons'
import { Link } from 'expo-router'
import HTML from 'react-native-render-html'
import { Text } from 'react-native-ui-lib'

interface Props {
    post: Post & {
        place: Place
        user: User
        votes: Vote[]
    }
}

export default function PostCard({ post }: Props) {
    const { width } = useWindowDimensions()

    return (
        <View
            style={{
                borderRadius: 8,
                backgroundColor: 'white'
            }}
            className="border shadow-sm mb-3 p-3"
        >
            <View className="flex flex-row items-center gap-2">
                <Link href={`/p/${post.place.url}`} className="text-sm hover:underline">
                    p/{post.place.url}
                </Link>
                <Text>-</Text>
                <Text className="text-xs">
                    Posted by {post.user.username} {timeAgo(post.createdAt)}
                </Text>
            </View>

            <Link href={`/p/${post.place.url}/post/${post.id}`}>
                <Text className="text-2xl font-bold">{post.title}</Text>
            </Link>

            {post.body && <HTML contentWidth={width} source={{ html: post.body }} />}

            <View className="w-full">
                <PostVoteButtons post={post} />
            </View>
        </View>
    )
}
