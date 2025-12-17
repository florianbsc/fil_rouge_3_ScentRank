// import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from "react-native";
// import { useState } from "react";
// import { useAuth } from "../../contexts/AuthContext";
//
// const API_URL = "http://localhost:3000"; // adaptez si besoin
//
// export default function LoginScreen() {
//     const { login } = useAuth();
//
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [loading, setLoading] = useState(false);
//
//     const handleLogin = async () => {
//         if (!email || !password) {
//             Alert.alert("Erreur", "Veuillez renseigner l’email et le mot de passe");
//             return;
//         }
//
//         try {
//             setLoading(true);
//
//             const response = await fetch(`${API_URL}/api-V1/users/login`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ email, password }),
//             });
//
//             const data = await response.json();
//
//             if (!response.ok) {
//                 throw new Error(data.message || "Connexion impossible");
//             }
//
//             await login(data.token, data.user);
//         } catch (error: any) {
//             Alert.alert("Erreur", error.message);
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Connexion</Text>
//
//             <View style={styles.card}>
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Email"
//                     placeholderTextColor="#aaa"
//                     autoCapitalize="none"
//                     keyboardType="email-address"
//                     value={email}
//                     onChangeText={setEmail}
//                 />
//
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Mot de passe"
//                     placeholderTextColor="#aaa"
//                     secureTextEntry
//                     value={password}
//                     onChangeText={setPassword}
//                 />
//
//                 <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
//                     {loading ? (
//                         <ActivityIndicator color="#000" />
//                     ) : (
//                         <Text style={styles.buttonText}>Se connecter</Text>
//                     )}
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#1c1c1e",
//         padding: 20,
//         justifyContent: "center",
//     },
//     title: {
//         color: "#fff",
//         fontSize: 26,
//         marginBottom: 25,
//         fontWeight: "bold",
//         textAlign: "center",
//     },
//     card: {
//         backgroundColor: "#2c2c2e",
//         padding: 20,
//         borderRadius: 12,
//     },
//     input: {
//         backgroundColor: "#1c1c1e",
//         color: "#fff",
//         padding: 14,
//         borderRadius: 10,
//         marginBottom: 15,
//         fontSize: 16,
//     },
//     button: {
//         backgroundColor: "#ffd33d",
//         padding: 15,
//         borderRadius: 10,
//         alignItems: "center",
//         marginTop: 10,
//     },
//     buttonText: {
//         color: "#000",
//         fontSize: 16,
//         fontWeight: "bold",
//     },
// });

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Alert,
} from "react-native";
import { useState } from "react";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

const API_URL = "http://localhost:3000"; // ⚠️ IP locale sur device réel

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Erreur", "Veuillez renseigner l’email et le mot de passe");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(`${API_URL}/api-V1/users/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Connexion impossible");
            }

            // 🔐 Stockage local
            await SecureStore.setItemAsync("token", data.token);
            await SecureStore.setItemAsync("user", JSON.stringify(data.user));

            // 🚀 Redirection
            router.replace("/(tabs)");
        } catch (error: any) {
            Alert.alert("Erreur", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Connexion</Text>

            <View style={styles.card}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#aaa"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Mot de passe"
                    placeholderTextColor="#aaa"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#000" />
                    ) : (
                        <Text style={styles.buttonText}>Se connecter</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1c1c1e",
        padding: 20,
        justifyContent: "center",
    },
    title: {
        color: "#fff",
        fontSize: 26,
        marginBottom: 25,
        fontWeight: "bold",
        textAlign: "center",
    },
    card: {
        backgroundColor: "#2c2c2e",
        padding: 20,
        borderRadius: 12,
    },
    input: {
        backgroundColor: "#1c1c1e",
        color: "#fff",
        padding: 14,
        borderRadius: 10,
        marginBottom: 15,
        fontSize: 16,
    },
    button: {
        backgroundColor: "#ffd33d",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#000",
        fontSize: 16,
        fontWeight: "bold",
    },
});

