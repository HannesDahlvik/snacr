import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, View } from 'react-native-ui-lib'
import ErrorPage from '~/components/ErrorPage'
import LoadingPage from '~/components/LoadingPage'
import PlacePageJoinButton from '~/components/place/JoinButton'
import { api } from '~/lib/api'

export default function AppPlacePage() {
    const { url } = useLocalSearchParams()

    if (!url) return <ErrorPage message="No URL defined" />

    const {
        data: place,
        error: placeError,
        isError: placeIsError,
        isFetched: placeIsFetched,
        isLoading: placeIsLoading
    } = api.place.getByUrl.useQuery({
        url: url as string
    })
    const {
        data: posts,
        error: postsError,
        isError: postsIsError,
        isLoading: postsIsLoading
    } = api.posts.getByPlaceId.useQuery(
        {
            placeId: place?.id as string
        },
        {
            enabled: !!placeIsFetched
        }
    )
    let {
        data: subscriptions,
        error: subscriptionsError,
        isError: subscriptionsIsError,
        isLoading: subscriptionsIsLoading
    } = api.subscriptions.places.useQuery()

    if (placeIsError || postsIsError || subscriptionsIsError)
        return (
            <ErrorPage
                message={placeError?.message || postsError?.message || subscriptionsError?.message}
            />
        )

    if (placeIsLoading || postsIsLoading || subscriptionsIsLoading) return <LoadingPage />

    return (
        <SafeAreaView className="flex flex-col items-center bg-white">
            <View className="flex justify-center items-center h-40 w-full bg-white border-b">
                <View className="flex flex-row justify-between items-center w-full px-4">
                    <View>
                        <Text className="text-2xl font-bold">{place.name}</Text>
                        <Text className="text-muted-foreground text-sm">p/{place.url}</Text>
                    </View>

                    <PlacePageJoinButton place={place} subscriptions={subscriptions} />
                </View>
            </View>
        </SafeAreaView>
    )
}
