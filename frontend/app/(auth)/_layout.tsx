import {Stack, Tabs} from "expo-router";
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
            < Tabs.Screen
                name="signup"
                options={{
                    title: 'S\'Enregistre',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'albums' : 'albums-outline'} color={color} size={24}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="login"
                options={{
                    title: 'Connexion',
                    headerShown: false, }}
            />
        </Tabs>
    );
}
