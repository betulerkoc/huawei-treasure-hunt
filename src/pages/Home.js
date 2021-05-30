import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Button
} from 'react-native';
import SignIn from "../components/SignIn"

const Home = ({ navigation }) => {

    return (
        <View style={[styles.container]}>
            <Image style={styles.image}
                source={require('../../find.png')} />
            <Text style={styles.title}>Welcome Treasure Hunt Game</Text>
            <SignIn navigation={navigation} />
            <View style={styles.setupButton}>
            <TouchableOpacity onPress={() => navigation.navigate('GameSetup')}>
                <Text style={styles.setupTitle}>Setup New Game</Text>
            </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        flexDirection: "column"
    },
    image: {
        height: 300,
        width: 200,
        marginLeft: 45,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    setupButton: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    setupTitle: {
        color: 'blue'
    }
});

export default Home;
