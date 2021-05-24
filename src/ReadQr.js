import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Image
} from 'react-native';
import ScanPlugin from '@hmscore/react-native-hms-scan';
import imageData from "../hint.json"


const ReadQr = () => {

    const totalScore = imageData.length;

    const [currentScore, setCurrentScore] = useState(0);

    const readClue = () => {
        let defaultViewRequest = {
            scanType: ScanPlugin.ScanType.All,
            additionalScanTypes: [],
        }
        ScanPlugin.Utils.startDefaultView(defaultViewRequest)
            .then((res) => {
                alert(res.originalValue)
                console.log(res)
                setCurrentScore(currentScore + 1)
            })
            .catch((e) => console.log(e))
    }

    const drawCircle = () => {
        let content = [];
        console.log(currentScore)
        for (let i = 1; i <= totalScore; i++) {
            content.push(
                <View style={[styles.circle, { backgroundColor: currentScore >= i ? 'red' : 'white', marginLeft: i % 2 && 150 }]} key={i}>
                    <Text>{i}</Text>
                </View>)
        }
        return content;
    }

    return (
        <View >
            <View style={styles.process}>
                {drawCircle()}
            </View>
            <TouchableOpacity onPress={readClue}>
                <Text>Read Clue</Text>
            </TouchableOpacity>
            {console.log(currentScore)}
        </View>
    );
};

const styles = StyleSheet.create({
    circle: {
        borderWidth: 1,
        borderColor: 'red',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 50,
        margin: 10,
    },
    process: {
        flexDirection: "column",
        justifyContent: "space-between",
        width: 300,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 10,
        marginLeft: 20,
        borderColor: "#bfbfbf",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.4)"
    },
});

export default ReadQr;
