import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View } from 'react-native';
import { styles } from './estilos';
import { createStackNavigator } from '@react-navigation/stack';
import Deslogado from './Deslogado';
import Logado from './Logado';


const {Navigator, Screen} = createStackNavigator();
  
export default function App() {
  
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Navigator screenOptions={{ headerShown: false }}>
          <Screen name="Deslogado">
            {(navProps: any) => (
              <Deslogado {...navProps}/>
            )}
          </Screen>
          <Screen name="Logado">
            {(navProps: any) => (
              <Logado {...navProps}/>
            )}
          </Screen>
        </Navigator>
        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
  );
}