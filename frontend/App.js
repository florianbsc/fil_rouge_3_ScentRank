import React from 'react';
import type {Node} from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import {MaterialCommunityIcons} from "@expo/vector-icons";

const App = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <Text style={style.text}>TEXT</Text>
            </View>
            <TouchebleOpacity>
                <Text>Commencé</Text>
                <MaterialCommunityIcons name={"arrow-forward-ios"} size={22} color={'#fff'}></MaterialCommunityIcons>
            </TouchebleOpacity>
        </SafeAreaView>
    )
}