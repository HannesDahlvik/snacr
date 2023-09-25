import Link from 'next/link'

import { Place, Post, User, Vote } from '@snacr/db'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui'
import PostVoteButtons from './VoteButtons'
import parse from 'html-react-parser'
import { timeAgo } from '~/lib/utils'

interface Props {
    post: Post & {
        place: Place
        user: User
        votes: Vote[]
    }
}

export default function PostCard({ post }: Props) {
    const body = post.body ? parse(post.body) : null

    return (
        <Card className="hover:border-primary/50">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Link href={`/p/${post.place.url}`} className="text-sm hover:underline">
                        p/{post.place.url}
                    </Link>
                    <p>-</p>
                    <p className="text-muted-foreground text-xs">
                        Posted by {post.user.username} {timeAgo(post.createdAt)}
                    </p>
                </div>

                <Link href={`/p/${post.place.url}/post/${post.id}`}>
                    <CardTitle>{post.title}</CardTitle>
                </Link>
            </CardHeader>

            {post.body && (
                <CardContent>
                    <div className="post-content line-clamp-6">{body}</div>
                </CardContent>
            )}

            <CardFooter>
                <PostVoteButtons post={post} />
            </CardFooter>
        </Card>
    )
}
