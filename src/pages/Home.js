import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import SignIn from "../components/SignIn"

const Home = ({ navigation }) => {

    return (
        <View>
            <Text>Welcome Treasure Hunt Game</Text>
            <Text>to start please signIn</Text>
            <SignIn navigation={navigation} />
            <TouchableOpacity onPress={() => navigation.navigate('GameSetup')}>
                <Text>Setup New Game</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({

});

export default Home;
