import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View } from 'react-native';
import { styles } from './estilos';
import Usuario from './Usuario';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Abrigo from './Abrigo';


const {Navigator, Screen} = createDrawerNavigator();
  
export default function App() {

  const SucessoLogin = () => {
    console.log('Login com sucesso!');
  };
  
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Navigator initialRouteName="Usuario" screenOptions={{
          headerShown: true,
          drawerType: 'front',
          headerBackground: () => <View style={{ flex: 1, backgroundColor: '#6b6b6b' }} />,
          
          drawerStyle: {
            backgroundColor: '#ffffff',
            width: 240,
          },
          drawerPosition: 'left',
        }}>
            <Screen name="Usuario">
              {(navProps: any) => (
                <Usuario {...navProps} SucessoLogin={SucessoLogin} />
              )}
            </Screen>
            <Screen name="Abrigo">
              {(navProps: any) => (
                <Abrigo {...navProps}/>
              )}  
            </Screen>
        </Navigator>
        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
  );
}