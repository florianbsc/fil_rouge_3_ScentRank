import { View, StyleSheet } from 'react-native';
import { useState} from "react";

import Button from "@/components/Button";
import IconButton from "@/components/IconButton";
import CircleButton from "@/components/CircleButton";
import { GestureHandlerRootView } from 'react-native-gesture-handler';



export default function Index() {
    const [showAppOptions, setShowAppOptions] = useState<boolean>(false);


    const onReset = () => {
        setShowAppOptions(false);
    };


    const onSaveImageAsync = async () => {
        // we will implement this later
    };

    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.container}>

                {showAppOptions ? (
                    <View style={styles.optionsContainer}>
                        <View style={styles.optionsRow}>
                            <IconButton icon="refresh" label="Reset" onPress={onReset} />
                            {/*<CircleButton  />*/}
                            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
                        </View>
                    </View>
                ) : (
                    <View style={styles.footerContainer}>
                        <Button label={"Choisir un parfum"} theme="primary" />
                        <Button label={"voter ce parfum"} onPress={() => setShowAppOptions(true)} />
                    </View>
                )}

            </View>
        </GestureHandlerRootView>

    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#25292e',
        alignItems: 'center',
    },
    imageContainer: {
        flex: 1,
    },
    footerContainer: {
        flex: 1 / 3,
        alignItems: 'center',
    },
    optionsContainer: {
        position: 'absolute',
        bottom: 80,
    },
    optionsRow: {
        alignItems: 'center',
        flexDirection: 'row',
    }
});
