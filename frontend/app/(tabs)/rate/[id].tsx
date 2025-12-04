import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

export default function RateForm() {
    const { id } = useLocalSearchParams();
    const [rating, setRating] = useState(0);

    const submitRate = () => {
        // fetch(`https://ton-api.com/api-V1/perfumes/${id}/rate`, {
        fetch(`http://localhost:3000/api-V1/rates/perfume/${id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ note: rating }),
        })
            .then(() => Alert.alert("Merci !", "Votre vote a été enregistré."))
            .catch(() => Alert.alert("Erreur", "Impossible d’envoyer votre vote."));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Noter le parfum #{id}</Text>

            <View style={styles.stars}>
                {[1, 2, 3, 4, 5].map((s) => (
                    <TouchableOpacity key={s} onPress={() => setRating(s)}>
                        <Text style={[styles.star, rating >= s ? styles.activeStar : null]}>
                            ★
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity style={styles.btn} onPress={submitRate}>
                <Text style={styles.btnText}>Envoyer</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#1c1c1e" },
    title: { color: "#fff", fontSize: 22, fontWeight: "bold", marginBottom: 20 },
    stars: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 40,
    },
    star: { fontSize: 40, color: "#555", marginHorizontal: 10 },
    activeStar: { color: "#ffd33d" },
    btn: {
        backgroundColor: "#ffd33d",
        padding: 15,
        borderRadius: 10,
    },
    btnText: { textAlign: "center", fontWeight: "bold", fontSize: 18 },
});
