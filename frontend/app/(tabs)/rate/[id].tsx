import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RateForm() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    const [rating, setRating] = useState(0);
    const [alreadyRated, setAlreadyRated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Vérifier l'auth
    useEffect(() => {
        const checkAuth = async () => {
            const token = await AsyncStorage.getItem("token");
            if (!token) {
                router.replace("/login");
                return;
            }

            // récupérer le vote si connecté
            try {
                const res = await fetch(
                    `http://localhost:3000/api-V1/rates/perfume/${id}/user/me`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const data = await res.json();
                if (data?.alreadyRated) {
                    setAlreadyRated(true);
                    setRating(data.sentiment);
                }
            } catch (error) {
                console.log("Erreur récupération vote", error);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [id]);

    const submitRate = async () => {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
            router.replace("/login");
            return;
        }

        if (rating === 0) {
            Alert.alert("Note requise", "Veuillez choisir une note.");
            return;
        }

        try {
            await fetch(`http://localhost:3000/api-V1/rates/perfume/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    sentiment: rating,
                }),
            });

            Alert.alert("Merci !", "Votre vote a été enregistré.");
            setAlreadyRated(true);
        } catch {
            Alert.alert("Erreur", "Impossible d’envoyer votre vote.");
        }
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={{ color: "#fff" }}>Chargement...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Noter ce parfum</Text>

            {alreadyRated && (
                <Text style={styles.info}>⭐ Votre note actuelle : {rating}/5</Text>
            )}

            <View style={styles.stars}>
                {[1, 2, 3, 4, 5].map((s) => (
                    <TouchableOpacity key={s} onPress={() => setRating(s)}>
                        <Text
                            style={[
                                styles.star,
                                rating >= s && styles.activeStar,
                            ]}
                        >
                            ★
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity style={styles.btn} onPress={submitRate}>
                <Text style={styles.btnText}>
                    {alreadyRated ? "Modifier mon vote" : "Envoyer"}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#1c1c1e" },
    title: { color: "#fff", fontSize: 22, fontWeight: "bold", marginBottom: 20 },
    info: {
        color: "#ffd33d",
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 10,
        textAlign: "center",
    },
    stars: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 40,
    },
    star: { fontSize: 40, color: "#555", marginHorizontal: 10 },
    activeStar: { color: "#ffd33d" },
    disabledStar: { opacity: 0.4 },
    btn: {
        backgroundColor: "#ffd33d",
        padding: 15,
        borderRadius: 10,
    },
    btnDisabled: {
        backgroundColor: "#6e6e6e",
    },
    btnText: { textAlign: "center", fontWeight: "bold", fontSize: 18 },
});
