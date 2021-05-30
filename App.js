import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Game from "./src/pages/Game"
import Home from "./src/pages/Home"
import GameSetup from "./src/pages/GameSetup"

const App = () => {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Treasure Hunt" component={Home} />
        <Stack.Screen name="Game" component={Game} />
        <Stack.Screen name="GameSetup" component={GameSetup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({

});

export default App;
