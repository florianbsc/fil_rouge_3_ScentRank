import { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Link } from "expo-router";

interface Perfume {
    _id: string;
    name: string;
    brand: string;
    imageUrl?: string;
}

export default function Found() {
    const [search, setSearch] = useState("");
    const [perfumes, setPerfumes] = useState<Perfume[]>([]);

    useEffect(() => {
        fetch("http://localhost:3000/api-V1/perfumes")
            .then((res) => res.json())
            .then((data) => setPerfumes(data))
            .catch((err) => console.log(err));
    }, []);

    const filteredPerfumes = perfumes.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Liste des parfums</Text>

            <TextInput
                style={styles.input}
                placeholder="Rechercher un parfum..."
                placeholderTextColor="#aaa"
                onChangeText={setSearch}
            />

            <FlatList
                data={filteredPerfumes}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <Link href={`/perfume/${item._id}`} asChild>
                        <TouchableOpacity style={styles.item}>
                            {item.imageUrl && (
                                <Image source={{ uri: item.imageUrl }} style={styles.image} resizeMode="cover" />
                            )}
                            <View style={{ flex: 1 }}>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <Text style={styles.itemBrand}>{item.brand}</Text>
                            </View>
                        </TouchableOpacity>
                    </Link>
                )}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#1c1c1e" },
    title: { fontSize: 24, color: "#fff", marginBottom: 20, fontWeight: "bold" },

    input: {
        backgroundColor: "#2c2c2e",
        padding: 10,
        borderRadius: 8,
        color: "#fff",
        marginBottom: 20,
    },

    item: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        backgroundColor: "#2c2c2e",
        borderRadius: 10,
        marginBottom: 12,
    },

    image: {
        width: 60,
        height: 90,
        borderRadius: 6,
        marginRight: 12,
        backgroundColor: "#444",
    },

    itemName: { color: "#fff", fontSize: 18, fontWeight: "600" },
    itemBrand: { color: "#aaa", fontSize: 14 },
});
