import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Trending() {
    const [top3, setTop3] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api-V1/rates/top")
            .then(res => res.json())
            .then(data => setTop3(data.top))
            .catch(console.log);
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Top 3 Tendances</Text>

            {/*{top3.map((p, index) => (*/}
            {/*    <View key={p.id} style={styles.card}>*/}
            {/*        <Text style={styles.rank}>#{index + 1}</Text>*/}
            {/*        <Text style={styles.name}>{p.nom}</Text>*/}
            {/*        <Text style={styles.brand}>{p.maison}</Text>*/}
            {/*        <Text style={styles.score}>Score : {p.score}/5</Text>*/}
            {/*    </View>*/}
            {/*))}*/}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#1c1c1e", padding: 20 },
    title: { color: "#fff", fontSize: 26, marginBottom: 25, fontWeight: "bold" },
    card: {
        backgroundColor: "#2c2c2e",
        padding: 20,
        borderRadius: 12,
        marginBottom: 15,
    },
    rank: { color: "#ffd33d", fontSize: 22, fontWeight: "bold" },
    name: { color: "#fff", fontSize: 20, marginTop: 10 },
    brand: { color: "#aaa", fontSize: 14, marginTop: 4 },
    score: { color: "#ffd33d", fontSize: 16, marginTop: 10 },
});
