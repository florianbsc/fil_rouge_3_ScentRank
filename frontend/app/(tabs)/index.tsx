import React from 'react';
import {View, Text, SafeAreaView, ScrollView, ImageBackground, StyleSheet} from 'react-native';

export default function Index() {
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
            <ScrollView style={{padding: 20}}>
                <View style={{flexDirection: 'row', justifyContent:'space-between', marginBottom: 20}}>
                    <Text>Hello utilisateur</Text>
                    <ImageBackground
                        source={require('../../assets/images/profile.png')}
                        style={{width: 35, height: 35}}
                        imageStyle={{borderRadius: 25}}
                        />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}