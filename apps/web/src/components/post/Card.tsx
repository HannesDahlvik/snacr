import Link from 'next/link'

import { Card, CardContent, CardHeader, CardTitle } from '../ui'
import { PostWithPlace } from '~/types'

interface Props {
    post: PostWithPlace
}

export default function PostCard({ post }: Props) {
    return (
        <Card className="hover:border-primary/50">
            <CardHeader>
                <div>
                    <Link href={`/place/${post.place.name}`} className="hover:underline">
                        {post.place.name}
                    </Link>
                </div>
                <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p>{post.body}</p>
            </CardContent>
        </Card>
    )
}
