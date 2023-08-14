import Link from 'next/link'

import { Button } from '~/components/ui'

export default function NotFoundPage() {
    return (
        <div className="flex flex-1 flex-col justify-center items-center gap-4">
            <h2>Page Not Found</h2>

            <Link href="/">
                <Button size="lg">Home</Button>
            </Link>
        </div>
    )
}
