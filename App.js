import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import WriteQr from "./src/WriteQr"
import ReadQr from "./src/ReadQr"
import Game from "./src/Game"
import Login from "./src/Login"

const App = () => {

  return (
    <View>
      {/* <Login/> */}
      <Game/>
      {/* <HintCreator /> */}
      <ReadQr/>
    </View>
  );
};

const styles = StyleSheet.create({

});

export default App;
