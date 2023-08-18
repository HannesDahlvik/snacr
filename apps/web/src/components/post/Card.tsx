import Link from 'next/link'

import { Card, CardContent, CardHeader, CardTitle } from '../ui'
import { PostWithPlaceAndUser } from '~/types'

interface Props {
    post: PostWithPlaceAndUser
}

export default function PostCard({ post }: Props) {
    return (
        <Link href={`/p/${post.place.url}/post/${post.id}`}>
            <Card className="hover:border-primary/50">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Link href={`/p/${post.place.url}`} className="text-sm hover:underline">
                            p/{post.place.url}
                        </Link>
                        <p>-</p>
                        <p className="text-muted-foreground text-xs">
                            Posted by {post.user.username}
                        </p>
                    </div>
                    <CardTitle>{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="line-clamp-6">{post.body}</p>
                </CardContent>
            </Card>
        </Link>
    )
}
