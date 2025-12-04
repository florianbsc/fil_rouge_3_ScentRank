import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

const USER_ID = "690e2c00aed1e7f9eb4f8804"; // provisoire

export default function RateForm() {
    const { id } = useLocalSearchParams();
    const [rating, setRating] = useState(0);
    const [alreadyRated, setAlreadyRated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Vérifier si l'utilisateur a déjà voté
    useEffect(() => {
        fetch(`http://localhost:3000/api-V1/rates/perfume/${id}/user/${USER_ID}`)
            .then(res => res.json())
            .then(data => {
                if (data?.alreadyRated) {
                    setAlreadyRated(true);
                    setRating(data.note); // affiche la note déjà donnée
                }
                setLoading(false);
            })
            .catch(() => {
                console.log("Erreur récupération vote");
                setLoading(false);
            });
    }, []);

    const submitRate = () => {
        if (alreadyRated) {
            Alert.alert("Déjà voté", "Vous avez déjà évalué ce parfum.");
            return;
        }

        fetch(`http://localhost:3000/api-V1/rates/perfume/${id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                note: rating,
                userId: USER_ID,    // obligatoire pour le backend
            }),
        })
            .then(() => {
                Alert.alert("Merci !", "Votre vote a été enregistré.");
                setAlreadyRated(true);
            })
            .catch(() => Alert.alert("Erreur", "Impossible d’envoyer votre vote."));
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
            <Text style={styles.title}>Noter le parfum #{id}</Text>

            {alreadyRated && (
                <Text style={styles.info}>⭐ Vous avez déjà donné une note : {rating}/5</Text>
            )}

            <View style={styles.stars}>
                {[1, 2, 3, 4, 5].map((s) => (
                    <TouchableOpacity
                        key={s}
                        onPress={() => !alreadyRated && setRating(s)}
                        disabled={alreadyRated}
                    >
                        <Text
                            style={[
                                styles.star,
                                rating >= s ? styles.activeStar : null,
                                alreadyRated ? styles.disabledStar : null,
                            ]}
                        >
                            ★
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity
                style={[styles.btn, alreadyRated && styles.btnDisabled]}
                onPress={submitRate}
                disabled={alreadyRated}
            >
                <Text style={styles.btnText}>
                    {alreadyRated ? "Déjà voté" : "Envoyer"}
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
