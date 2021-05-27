import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  NativeModules,
  DeviceEventEmitter,
  ImageBackground,
  Image,
  Dimensions
} from 'react-native';
import HMSGameService from "@hmscore/hms-js-gameservice";

const WINDOW = Dimensions.get('window');

const Game = () => {

  useEffect(() => {
    HMSGameService.init(NativeModules, DeviceEventEmitter);
  }, []);

  const getCurrentPlayer = () => {
    HMSGameService.getCurrentPlayer()
      .then((res) => { console.log(JSON.stringify(res)) })
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
      <ImageBackground source={require('../game.png')} style={styles.image}>
        <TouchableOpacity onPress={getCurrentPlayer}>
          <Text>getCurrentPlayer</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={loadAchievementList}>
          <Text>loadAchievementList</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  image: {
    width: WINDOW.width,
    height: WINDOW.height

  },
  text: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000a0"
  }
});

export default Game;
