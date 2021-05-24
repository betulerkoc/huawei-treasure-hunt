import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import HintCreator from "./src/HintCreator"
import WriteQr from "./src/WriteQr"
import ReadQr from "./src/ReadQr"

const App = () => {

  return (
    <View>
      {/* <HintCreator /> */}
      <ReadQr/>
    </View>
  );
};

const styles = StyleSheet.create({

});

export default App;
