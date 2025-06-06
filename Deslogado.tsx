import { createDrawerNavigator } from '@react-navigation/drawer';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { styles } from './styles/estilos';
import Abrigo from './telas/CadastroAbrigo';
import Mapa from './telas/Mapa';
import Usuario from './Usuario';
import Landing from './telas/Landing';
import { FontAwesome5, Entypo, Ionicons, FontAwesome6 } from '@expo/vector-icons';

const { Navigator, Screen } = createDrawerNavigator();

export default function Deslogado({ navigation }: any) {

    const SucessoLogin = () => {
        navigation.navigate('Logado');
    };

    return (
        <View style={styles.container}>
            <Navigator screenOptions={{
                headerShown: true,
                drawerType: 'front',
                headerBackground: () => <View style={{ flex: 1, backgroundColor: '#FFFFFF' }} />,
                drawerStyle: {
                    backgroundColor: '#ffffff',
                    width: 240,
                },
                drawerPosition: 'left',
            }}>
                <Screen name="Landing" options={{ title: 'SafeHub',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="shield" size={size} color={color} />
                    )}}>

                    {(navProps: any) => (
                        <Landing {...navProps} />
                    )}

                </Screen>
                <Screen name="Usuario" options={{ title: 'Usuário', 
                    drawerIcon: ({ color, size }) => ( 
                        <FontAwesome5 name="user" size={size} color={color} />
                    )}}>

                    {(navProps: any) => (
                        <Usuario {...navProps} SucessoLogin={SucessoLogin} />
                    )}

                </Screen>
                <Screen name="Abrigo" options={{ title: 'Abrigo',
                    drawerIcon: ({ color, size }) => (
                        <FontAwesome6 name="house-chimney" size={size} color={color} />
                    )}}>

                    {(navProps: any) => (
                        <Abrigo {...navProps} />
                    )}

                </Screen>
                <Screen name="Mapa" options={{ title: 'Mapa',
                    drawerIcon: ({ color, size }) => (
                        <Entypo name="map" size={size} color={color} />
                    )}}>

                    {(navProps: any) => (
                        <Mapa {...navProps} />
                    )}
                    
                </Screen>
            </Navigator>
            <StatusBar style="auto" />
        </View>
    );
}