// import { Tabs, router } from "expo-router";
// import { useEffect } from "react";
// import { Ionicons } from "@expo/vector-icons";
// import { useAuth } from "../contexts/AuthContext";
// import { ActivityIndicator, View } from "react-native";
//
// export default function TabsLayout() {
//     const { user, loading } = useAuth();
//
//     // ⏳ Attendre la restauration de session
//     useEffect(() => {
//         if (!loading && !user) {
//             router.replace("/(auth)/login");
//         }
//     }, [loading, user]);
//
//     if (loading) {
//         return (
//             <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//                 <ActivityIndicator size="large" />
//             </View>
//         );
//     }
//
//     if (!user) return null; // évite un flash UI
//
//     return (
//         <Tabs
//             screenOptions={{
//                 tabBarActiveTintColor: "#ffd33d",
//                 headerStyle: { backgroundColor: "#25292e" },
//                 headerTintColor: "#fff",
//                 tabBarStyle: { backgroundColor: "#25292e" },
//             }}
//         >
//             <Tabs.Screen
//                 name="index"
//                 options={{
//                     title: "Tendances",
//                     tabBarIcon: ({ color, focused }) => (
//                         <Ionicons
//                             name={focused ? "flame" : "flame-outline"}
//                             size={24}
//                             color={color}
//                         />
//                     ),
//                 }}
//             />
//
//             <Tabs.Screen
//                 name="profile"
//                 options={{
//                     title: "Profil",
//                     tabBarIcon: ({ color, focused }) => (
//                         <Ionicons
//                             name={focused ? "person" : "person-outline"}
//                             size={24}
//                             color={color}
//                         />
//                     ),
//                 }}
//             />
//         </Tabs>
//     );
// }

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LogBox } from "react-native";
import { AuthProvider } from "../contexts/AuthContext";

LogBox.ignoreAllLogs(true);

export default function RootLayout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <AuthProvider>
                <StatusBar style="light" />
                <Stack screenOptions={{ headerShown: false }} />
            </AuthProvider>
        </GestureHandlerRootView>
    );
}
