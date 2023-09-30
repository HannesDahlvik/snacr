import { useAuth } from '../../src/providers/AuthProvider'
import { Redirect, Tabs } from 'expo-router'
import { Gear, Globe, House, PlusCircle, UserCircle } from 'phosphor-react-native'

export default function AppLayout() {
    const { user } = useAuth()

    if (!user) {
        return <Redirect href="/" />
    }

    return (
        <Tabs
            initialRouteName="index"
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    href: '/app',
                    tabBarIcon(props) {
                        return <House weight={props.focused ? 'fill' : 'regular'} />
                    }
                }}
            />

            <Tabs.Screen
                name="places"
                options={{
                    href: '/app/places',
                    tabBarIcon(props) {
                        return <Globe weight={props.focused ? 'fill' : 'regular'} />
                    }
                }}
            />

            <Tabs.Screen
                name="create"
                options={{
                    href: '/app/create',
                    tabBarIcon(props) {
                        return <PlusCircle weight={props.focused ? 'fill' : 'regular'} />
                    }
                }}
            />

            <Tabs.Screen
                name="settings"
                options={{
                    href: '/app/settings',
                    tabBarIcon(props) {
                        return <Gear weight={props.focused ? 'fill' : 'regular'} />
                    }
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    href: '/app/profile',
                    tabBarIcon(props) {
                        return <UserCircle weight={props.focused ? 'fill' : 'regular'} />
                    }
                }}
            />
        </Tabs>
    )
}
