import { createDrawerNavigator } from '@react-navigation/drawer';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { styles } from './styles/estilos';
import Dashboard from './telas/Dashboard';
import InfoAbrigo from './telas/InfoAbrigo';
import Mapa from './telas/Mapa';
import Configuracoes from './telas/Configuracoes';
import AlertaList from './telas/AlertaList';


const { Navigator, Screen } = createDrawerNavigator();

export default function Logado() {

    return (
        <View style={styles.container}>
            <Navigator initialRouteName="Dashboard" screenOptions={{
                headerShown: true,
                drawerType: 'front',
                headerBackground: () => <View style={{ flex: 1, backgroundColor: '#FFFFFF' }} />,
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
                <Screen name="Informações do Abrigo">
                    {(navProps: any) => (
                        <InfoAbrigo {...navProps} />
                    )}
                </Screen>
                <Screen name="Mapa">
                    {(navProps: any) => (
                        <Mapa {...navProps} />
                    )}
                </Screen>
                <Screen name="TESTE">
                    {(navProps: any) => (
                        <AlertaList {...navProps} />
                    )}
                </Screen>
                <Screen name="Configurações">
                    {(navProps: any) => (
                        <Configuracoes {...navProps} />
                    )}
                </Screen>

            </Navigator>
            <StatusBar style="auto" />
        </View>
    );
}