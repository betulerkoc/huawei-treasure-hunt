import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
} from 'react-native';
import ScanPlugin from '@hmscore/react-native-hms-scan';
import HMSGameService from "@hmscore/hms-js-gameservice";

const ReadQr = () => {

    const totalScore = 6;
    const [currentScore, setCurrentScore] = useState(0);
    const [start, setStartTime] = useState(null)

    useEffect(() => {
        checkScore()
    }, [currentScore]);

    const unlockAchievement = () => {
        const achievementId = "8B8BEB6E177C6A7029C090FCA2390ADC9B55EFAD5E63D9801A2917978275C669"
        HMSGameService.unlockAchievement(achievementId)
            .then((res) => { console.log(JSON.stringify(res)) })
            .catch((err) => { console.log(JSON.stringify(err)) })
    }

    const submitScore = (totalTime) => {
        const rankingId = "C97C9CF73E88D9F329342A80C9C24FF98BA9A12AAC5B3D8FAB8AB68EA8785BE0";
        HMSGameService.submitScoreImmediate(rankingId, totalTime)
            .then((res) => { console.log(JSON.stringify(res)) })
            .catch((err) => { console.log(JSON.stringify(err)) })
    }

    const checkScore = () => {
        console.log("yes cheking")

        if (currentScore === 1) {
            setStartTime(new Date())
        }

        if (currentScore === totalScore) {
            let end = new Date();
            let totalTime = end - start;

            unlockAchievement()
            console.log("CurrentScore::::" + currentScore)
            console.log("totalTime::::" + totalTime)
            console.log("end::::" + end)
            console.log("start::::" + start)
            submitScore(totalTime)
        }
    }

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
        for (let i = 1; i <= totalScore; i++) {
            content.push(
                <View style={[styles.circle, { backgroundColor: currentScore >= i ? 'red' : 'white', marginTop: i % 2 && 20 }]} key={i}>
                    <Text>{i}</Text>
                </View>)
        }
        return content;
    }

    return (
        <View style={styles.container}>
            <View style={styles.game}>
                {drawCircle()}
            </View>
            <TouchableOpacity onPress={readClue} style={styles.button}>
                <Text style={styles.text}>Read Clue</Text>
            </TouchableOpacity>
            {console.log(currentScore)}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: "flex-end",
        marginBottom: 30
    },
    circle: {
        borderWidth: 1,
        borderColor: 'transparent',
        width: 35,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 50,
        margin: 10,
    },
    game: {
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
    },
    button: {
        alignItems: "center",
        backgroundColor: "green",
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 50,
    },
    text: {
        color: 'white'
    }
});

export default ReadQr;
