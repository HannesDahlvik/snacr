import { FlatList } from 'react-native'

import ErrorPage from '../../src/components/ErrorPage'
import LoadingPage from '../../src/components/LoadingPage'
import PostCard from '../../src/components/post/Card'
import { api } from '../../src/lib/api'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function AppIndexPage() {
    const { data, error, isError, isLoading } = api.posts.getFrontpage.useQuery()

    if (isError) return <ErrorPage message={error.message} />

    if (isLoading) return <LoadingPage />

    return (
        <SafeAreaView>
            <FlatList
                className="px-4"
                data={data}
                renderItem={({ item }) => <PostCard post={item} />}
                keyExtractor={(item) => item.id}
            />
        </SafeAreaView>
    )
}
