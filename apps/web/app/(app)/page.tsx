import Link from 'next/link'

import PostCard from '~/components/post/Card'
import { caller } from '~/lib/caller'

export default async function Home() {
    const posts = await caller.posts.getFrontpage()

    return (
        <div className="flex flex-col items-center py-8">
            <div className="absolute-center flex flex-col gap-4 w-center">
                {posts.length === 0 && (
                    <div>
                        <h2 className="text-center">No Posts Found</h2>
                    </div>
                )}

                {posts.map((post) => (
                    <Link
                        className="w-full"
                        href={`/p/${post.place?.name}/post/${post.id}`}
                        key={post.id}
                    >
                        <PostCard post={post} />
                    </Link>
                ))}
            </div>
        </div>
    )
}
