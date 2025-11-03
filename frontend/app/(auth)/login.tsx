import {View, Text, StyleSheet} from "react-native";

export  default function LoginScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Page de connexion</Text>
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