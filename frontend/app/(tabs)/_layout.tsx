import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
    return(
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#ffd33d',
                headerStyle: {
                    backgroundColor: '#25292e',
                },
                headerShadowVisible: false,
                headerTintColor: '#fff',
                tabBarStyle: {
                    backgroundColor: '#25292e',
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Accueil',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
                    ),
                }}
            />
            < Tabs.Screen
            name="found"
            options={{
                title: 'Recherche',
                tabBarIcon: ({ color, focused }) => (
                    <Ionicons name={focused ? 'search' : 'search-outline'} color={color} size={24}/>
                ),
            }}
            />
            < Tabs.Screen
                name="my-rate"
                options={{
                    title: 'Mes Votes',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'albums' : 'albums-outline'} color={color} size={24}/>
                    ),
                }}
            />
            < Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'person-circle' : 'person-circle-outline'} color={color} size={24}/>
                    ),
                }}
            />


        </Tabs>
    );
}
