import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  NativeModules,
  DeviceEventEmitter,
  ImageBackground,
  Dimensions
} from 'react-native';
import HMSGameService from "@hmscore/hms-js-gameservice";
import ReadQr from '../components/ReadQr';

const WINDOW = Dimensions.get('window');

const Game = () => {

  const [player, setPlayer] = useState(null);

  useEffect(() => {
    HMSGameService.init(NativeModules, DeviceEventEmitter);
    getCurrentPlayer();
  }, []);

  const getCurrentPlayer = () => {
    HMSGameService.getCurrentPlayer()
      .then((res) => {
        setPlayer(res.data.displayName)
      })
      .catch((err) => { console.log(JSON.stringify(err)) })
  };

  const loadAchievementList = () => {
    const forceReload = true;
    HMSGameService.loadAchievementList(forceReload)
      .then((res) => { console.log(JSON.stringify(res)) })
      .catch((err) => { console.log(JSON.stringify(err)) })
  }

  return (
    <View>
      <ImageBackground source={require('../../game.png')} style={styles.image}>
        <Text style={styles.greeting}>Hello {player}</Text>
        <ReadQr />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: WINDOW.width,
    height: WINDOW.height
  },
  greeting: {
    fontSize: 20,
    alignItems: 'center',
    marginLeft: 120,
    padding: 10
  }
});

export default Game;
