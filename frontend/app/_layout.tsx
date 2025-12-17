import {Stack, Tabs} from "expo-router";
import { StatusBar } from "expo-status-bar";
import { LogBox } from "react-native";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {Ionicons} from "@expo/vector-icons";
import { Slot } from "expo-router";
import { AuthProvider } from "../app/contexts/AuthContext";

LogBox.ignoreAllLogs(true);

export default function RootLayout() {
    return (
        <AuthProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <StatusBar style="light" />
                <Stack>
                    <Stack.Screen
                        name="(tabs)"
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="+not-found"
                        options={{
                            headerShown: false, }}
                    />
                </Stack>
            </GestureHandlerRootView>        </AuthProvider>
    );
}
// export default function RootLayout() {
//     return(
//         <GestureHandlerRootView style={{ flex: 1 }}>
//             <StatusBar style="light" />
//             <Stack>
//                 <Stack.Screen
//                     name="(tabs)"
//                     options={{
//                         headerShown: false,
//                     }}
//                 />
//                 <Stack.Screen
//                     name="+not-found"
//                     options={{
//                         headerShown: false, }}
//                 />
//             </Stack>
//         </GestureHandlerRootView>
//
//     );
// }
