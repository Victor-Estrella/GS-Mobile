import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { styles } from './estilos';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Mapa from './Mapa';
import Dashboard from './Dashboard';
import InfoAbrigo from './InfoAbrigo';


const {Navigator, Screen} = createDrawerNavigator();

export default function Logado() {

    return (
        <View style={styles.container}>
            <Navigator initialRouteName="Dashboard" screenOptions={{
                headerShown: true,
                drawerType: 'front',
                headerBackground: () => <View style={{ flex: 1, backgroundColor: '#6b6b6b' }} />,
                drawerStyle: {
                    backgroundColor: '#ffffff',
                    width: 240,
                },
                drawerPosition: 'left',
            }}>
                <Screen name="Dashboard">
                    {(navProps: any) => (
                        <Dashboard {...navProps} />
                    )}
                </Screen>
                <Screen name="Mapa">
                    {(navProps: any) => (
                        <Mapa {...navProps} />
                    )}
                </Screen>
                <Screen name="Informações do Abrigo">
                    {(navProps: any) => (
                        <InfoAbrigo {...navProps} />
                    )}
                </Screen>

            </Navigator>
            <StatusBar style="auto" />
        </View>
    );
}