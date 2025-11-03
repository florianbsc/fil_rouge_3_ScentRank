import {View, Text, StyleSheet} from "react-native";

export  default function MyRatesScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Liste des votes de l'user</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2592e',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'black',
    }
})