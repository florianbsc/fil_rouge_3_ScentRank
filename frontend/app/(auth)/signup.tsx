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
import { router } from "expo-router";
import { useAuth } from "../../contexts/AuthContext";

const API_URL = "http://localhost:3000"; // adapter si device réel

export default function SignupScreen() {
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        if (!email || !password || !confirmPassword) {
            Alert.alert("Erreur", "Tous les champs sont obligatoires");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Erreur", "Les mots de passe ne correspondent pas");
            return;
        }

        try {
            setLoading(true);

            // 1️⃣ Création du compte
            const response = await fetch(`${API_URL}/api-V1/users/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Inscription impossible");
            }

            /**
             * OPTION A (recommandée avec ton backend actuel)
             * → login automatique après inscription
             */
            const loginResponse = await fetch(`${API_URL}/api-V1/users/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const loginData = await loginResponse.json();

            if (!loginResponse.ok) {
                throw new Error("Connexion automatique impossible");
            }

            await login(loginData.token, loginData.user);

            router.replace("/(tabs)");
        } catch (error: any) {
            Alert.alert("Erreur", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Inscription</Text>

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

                <TextInput
                    style={styles.input}
                    placeholder="Confirmer le mot de passe"
                    placeholderTextColor="#aaa"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSignup}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#000" />
                    ) : (
                        <Text style={styles.buttonText}>Créer un compte</Text>
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
