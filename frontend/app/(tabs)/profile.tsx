import {View, Text, StyleSheet, Button} from "react-native";

import { useAuth } from "../../contexts/AuthContext";
import { router } from "expo-router";

export default function ProfileScreen() {
    const { logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        router.replace("/(auth)/login");
    };

    return (
        <View>
            <Button title="Se déconnecter" onPress={handleLogout} />
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