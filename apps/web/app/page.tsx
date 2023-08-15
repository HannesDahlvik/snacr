import Link from 'next/link'

import PostCard from '~/components/post/Card'
import { caller } from '~/lib/caller'

export default async function Home() {
    const posts = await caller.posts.getFrontpage()

    return (
        <div className="flex flex-col justify-center items-center pt-8">
            <div className="flex flex-col gap-4 w-[640px]">
                {posts.length === 0 && (
                    <div>
                        <h2 className="text-center">No Posts Found</h2>
                    </div>
                )}

                {posts.map((post) => (
                    <Link href={`/place/${post.place?.name}/post/${post.id}`} key={post.id}>
                        <PostCard post={post} />
                    </Link>
                ))}
            </div>
        </div>
    )
}
