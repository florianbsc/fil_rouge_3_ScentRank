import { useLocalSearchParams, Link } from "expo-router";
import { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";

interface Perfume {
    _id: { $oid: string };
    name: string;
    brand: string;
    description?: string;
    genre?: string;
    imageUrl?: string;
    releaseYear?: number;
    price?: { $numberDecimal: string };

    olfactoryNotes?: {
        top?: string[];
        heart?: string[];
        base?: string[];
    };
}

export default function PerfumeDetails() {
    const { id } = useLocalSearchParams();
    const [perfume, setPerfume] = useState<Perfume | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:3000/api-V1/perfumes/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setPerfume(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (!perfume) {
        return (
            <View style={styles.center}>
                <Text>Parfum introuvable.</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>

            {/* IMAGE */}
            {perfume.imageUrl && (
                <Image source={{ uri: perfume.imageUrl }} style={styles.image} />
            )}

            {/* NOM */}
            <Text style={styles.name}>{perfume.name}</Text>
            <Text style={styles.brand}>{perfume.brand}</Text>

            {perfume.releaseYear && (
                <Text style={styles.info}>Sortie : {perfume.releaseYear}</Text>
            )}

            {perfume.price?.$numberDecimal && (
                <Text style={styles.info}>Prix : {perfume.price.$numberDecimal} €</Text>
            )}

            {perfume.description && (
                <Text style={styles.description}>{perfume.description}</Text>
            )}

            {/* PYRAMIDE OLFACTIVE */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Pyramide olfactive</Text>

                {perfume.olfactoryNotes?.top && (
                    <View style={styles.noteBlock}>
                        <Text style={styles.noteTitle}>Notes de tête</Text>
                        <Text style={styles.noteText}>
                            {perfume.olfactoryNotes.top.join(", ")}
                        </Text>
                    </View>
                )}

                {perfume.olfactoryNotes?.heart && (
                    <View style={styles.noteBlock}>
                        <Text style={styles.noteTitle}>Notes de cœur</Text>
                        <Text style={styles.noteText}>
                            {perfume.olfactoryNotes.heart.join(", ")}
                        </Text>
                    </View>
                )}

                {perfume.olfactoryNotes?.base && (
                    <View style={styles.noteBlock}>
                        <Text style={styles.noteTitle}>Notes de fond</Text>
                        <Text style={styles.noteText}>
                            {perfume.olfactoryNotes.base.join(", ")}
                        </Text>
                    </View>
                )}
            </View>

            {/* BOUTON VOTER */}
            <Link href={`/rate/${perfume._id.$oid}`} asChild>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Noter ce parfum</Text>
                </TouchableOpacity>
            </Link>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#F7F7F7",
    },

    center: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    image: {
        width: "100%",
        height: 330,
        borderRadius: 16,
        marginBottom: 20,
    },

    name: {
        fontSize: 28,
        fontWeight: "700",
        marginBottom: 4,
        textAlign: "center",
    },

    brand: {
        fontSize: 20,
        color: "#777",
        textAlign: "center",
        marginBottom: 20,
    },

    info: {
        fontSize: 16,
        color: "#444",
        textAlign: "center",
        marginBottom: 4,
    },

    description: {
        marginTop: 10,
        fontSize: 16,
        color: "#333",
        textAlign: "center",
    },

    section: {
        marginTop: 20,
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 16,
        elevation: 2,
    },

    sectionTitle: {
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 16,
    },

    noteBlock: {
        marginBottom: 15,
    },

    noteTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 4,
    },

    noteText: {
        color: "#555",
    },

    button: {
        backgroundColor: "#2424FF",
        padding: 16,
        borderRadius: 14,
        marginTop: 25,
        marginBottom: 50,
    },

    buttonText: {
        textAlign: "center",
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
});
