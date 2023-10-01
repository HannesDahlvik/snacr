import { useEffect } from 'react'

import { CircleNotch } from 'phosphor-react-native'
import Animated, {
    Easing,
    cancelAnimation,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming
} from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function LoadingPage() {
    const rotation = useSharedValue(0)

    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    rotateZ: `${rotation.value}deg`
                }
            ]
        }
    }, [rotation.value])

    useEffect(() => {
        rotation.value = withRepeat(
            withTiming(360, {
                duration: 1000,
                easing: Easing.linear
            }),
            -1
        )
        return () => cancelAnimation(rotation)
    }, [])

    return (
        <SafeAreaView className="flex-1 flex-col items-center justify-center gap-3">
            <Animated.View style={[animatedStyles]}>
                <CircleNotch size={48} />
            </Animated.View>
        </SafeAreaView>
    )
}
