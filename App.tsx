import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import Deslogado from './Deslogado';
import Logado from './Logado';
import { styles } from './styles/estilos';
import { Inter_400Regular, Inter_500Medium, Inter_700Bold, Inter_900Black } from '@expo-google-fonts/inter';
import { Poppins_900Black } from '@expo-google-fonts/poppins';
import { useFonts } from 'expo-font';


const { Navigator, Screen } = createStackNavigator();

export default function App() {
  
  const [fontsLoaded] = useFonts({
    Poppins_900Black,
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
    Inter_900Black
  });
  
  if (!fontsLoaded) {
    return null;
  }
  
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Navigator screenOptions={{ headerShown: false }}>
          <Screen name="Deslogado">
            {(navProps: any) => (
              <Deslogado {...navProps} />
            )}
          </Screen>
          <Screen name="Logado">
            {(navProps: any) => (
              <Logado {...navProps} />
            )}
          </Screen>
        </Navigator>
        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
  );
}